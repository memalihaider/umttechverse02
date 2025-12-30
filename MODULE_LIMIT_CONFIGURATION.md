# Module Registration Limit Configuration Guide

## Overview
The Valorant module registration limit system is now implemented and configured to hide the module when it reaches 15 approved registrations.

## Current Configuration

**Valorant Module:**
- Registration Limit: **15 teams**
- Status: **Active and Monitored**
- Display: Shows registration count in dropdown (e.g., "Valorant (12/15)")

## How to Apply This Logic to Other Modules

### Step 1: Update the RegistrationForm Component

Find the useEffect hook that fetches Valorant count:

```typescript
// Current code - only fetches Valorant
useEffect(() => {
  const fetchRegistrationCounts = async () => {
    setLoadingCounts(true)
    try {
      const response = await fetch('/api/module-registration-count?module=Valorant')
      // ... rest of code
    }
  }
  // ...
}, [])
```

To add another module (e.g., "FIFA 26" with limit of 20):

```typescript
useEffect(() => {
  const fetchRegistrationCounts = async () => {
    setLoadingCounts(true)
    try {
      // Fetch multiple modules
      const modules = ['Valorant', 'FIFA 26']
      for (const moduleName of modules) {
        const response = await fetch(`/api/module-registration-count?module=${moduleName}`)
        if (response.ok) {
          const data = await response.json()
          setModuleRegistrationCounts(prev => ({
            ...prev,
            [data.module]: data.count
          }))
        }
      }
    } catch (error) {
      console.error('Error fetching registration counts:', error)
    } finally {
      setLoadingCounts(false)
    }
  }

  fetchRegistrationCounts()
  const interval = setInterval(fetchRegistrationCounts, 30000)
  return () => clearInterval(interval)
}, [])
```

### Step 2: Update the Module Filtering Logic

In the module dropdown, update the filter logic:

```typescript
// Define limits per module (add this near the modules array)
const MODULE_REGISTRATION_LIMITS: { [key: string]: number } = {
  'Valorant': 15,
  'FIFA 26': 20,
  'Tekken 8': 25,
  // Add more as needed
}

// Then in the dropdown mapping:
{modules.map((module) => {
  const limit = MODULE_REGISTRATION_LIMITS[module.name]
  const currentCount = moduleRegistrationCounts[module.name] || 0
  const isLimitReached = limit && currentCount >= limit
  
  // Hide module if limit is reached
  if (isLimitReached) {
    return null
  }
  
  // Show count if limit is defined
  const displayName = limit 
    ? `${module.name} - PKR ${module.fee.toLocaleString()} (${currentCount}/${limit}) (${module.teamSize})`
    : `${module.name} - PKR ${module.fee.toLocaleString()} (${module.teamSize})`
  
  return (
    <option key={module.name} value={module.name} className="bg-black text-white">
      {displayName}
    </option>
  )
})}
```

### Step 3: Update Submit Validation

Expand the validation to check all limited modules:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  // Check all module limits
  const limit = MODULE_REGISTRATION_LIMITS[formData.module]
  const currentCount = moduleRegistrationCounts[formData.module] || 0
  
  if (limit && currentCount >= limit) {
    alert(`${formData.module} registration is currently full (${currentCount}/${limit}). Please choose another module.`)
    return
  }
  
  // ... rest of validation
}
```

## API Endpoint Details

**Endpoint:** `/api/module-registration-count`

**Parameters:**
- `module` (query parameter): Name of the module

**Response:**
```json
{
  "module": "Valorant",
  "count": 12,
  "isLimitReached": false
}
```

**Implementation:**
```typescript
// app/api/module-registration-count/route.ts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const moduleName = searchParams.get('module')

  if (!moduleName) {
    return NextResponse.json(
      { error: 'Module name is required' },
      { status: 400 }
    )
  }

  const { count, error } = await supabase
    .from('registrations')
    .select('*', { count: 'exact', head: true })
    .eq('module', moduleName)
    .eq('status', 'approved')

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch registration count' },
      { status: 500 }
    )
  }

  return NextResponse.json({
    module: moduleName,
    count: count || 0,
    isLimitReached: (count || 0) >= 15 // Hardcoded for now
  })
}
```

## To Make Limits Configurable

For a more flexible approach, store limits in the database:

### 1. Create a Module Settings Table

```sql
CREATE TABLE module_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_name TEXT UNIQUE NOT NULL,
  registration_limit INT DEFAULT NULL,
  is_registration_open BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert module settings
INSERT INTO module_settings (module_name, registration_limit) VALUES
('Valorant', 15),
('FIFA 26', 20),
('Tekken 8', 25);
```

### 2. Update API to Query Settings

```typescript
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const moduleName = searchParams.get('module')

  if (!moduleName) {
    return NextResponse.json({ error: 'Module name is required' }, { status: 400 })
  }

  // Get module settings
  const { data: settings, error: settingsError } = await supabase
    .from('module_settings')
    .select('registration_limit')
    .eq('module_name', moduleName)
    .single()

  if (settingsError) {
    return NextResponse.json({ error: 'Failed to fetch module settings' }, { status: 500 })
  }

  // Get registration count
  const { count, error: countError } = await supabase
    .from('registrations')
    .select('*', { count: 'exact', head: true })
    .eq('module', moduleName)
    .eq('status', 'approved')

  if (countError) {
    return NextResponse.json({ error: 'Failed to fetch registration count' }, { status: 500 })
  }

  const limit = settings?.registration_limit
  const currentCount = count || 0

  return NextResponse.json({
    module: moduleName,
    count: currentCount,
    limit: limit,
    isLimitReached: limit ? currentCount >= limit : false
  })
}
```

### 3. Create Admin Panel to Manage Limits

Add to admin panel to update module limits dynamically:

```typescript
// Admin endpoint to update module settings
export async function PUT(request: NextRequest) {
  try {
    const { moduleName, registrationLimit, isRegistrationOpen } = await request.json()

    const { error } = await supabase
      .from('module_settings')
      .update({
        registration_limit: registrationLimit,
        is_registration_open: isRegistrationOpen,
        updated_at: new Date().toISOString()
      })
      .eq('module_name', moduleName)

    if (error) {
      return NextResponse.json({ error: 'Failed to update module settings' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

## Database Query Reference

### Count Approved Registrations by Module

```sql
SELECT module, COUNT(*) as registration_count
FROM registrations
WHERE status = 'approved'
GROUP BY module
ORDER BY registration_count DESC;
```

### Monitor Specific Module

```sql
SELECT module, COUNT(*) as approved_count
FROM registrations
WHERE module = 'Valorant' AND status = 'approved'
GROUP BY module;
```

### Get All Registrations Status

```sql
SELECT 
  module,
  status,
  COUNT(*) as count
FROM registrations
GROUP BY module, status
ORDER BY module, status;
```

## Testing the Implementation

### Test Case 1: Module Not Full
- Module count: 5/15
- Expected: Module appears in dropdown, count shown

### Test Case 2: Module at Capacity
- Module count: 15/15
- Expected: Module hidden from dropdown, warning message shown

### Test Case 3: Auto-Refresh
- Start with count 14/15
- Register new team → count becomes 15/15
- Wait 30 seconds
- Expected: Module disappears from dropdown on refresh

### Test Case 4: Prevent Submission
- Manually select Valorant in browser console (bypass UI)
- Try to submit
- Expected: Form validation prevents submission with error message

## Monitoring and Troubleshooting

### Check API Response
```bash
curl "http://localhost:3000/api/module-registration-count?module=Valorant"
```

### Monitor Registration Counts in Database
```sql
-- Real-time count
SELECT COUNT(*) as valorant_approved
FROM registrations
WHERE module = 'Valorant' AND status = 'approved';
```

### Check for Errors
- Open browser DevTools → Console
- Look for any fetch errors in "Error fetching registration counts"
- Check server logs for API errors

## Summary

- ✅ Valorant registration limit is **15 teams**
- ✅ Automatically hides from form when full
- ✅ Shows current count in dropdown
- ✅ Prevents submission when limit reached
- ✅ Auto-refreshes count every 30 seconds
- ✅ Can be easily extended to other modules
- ✅ Ready for admin dashboard integration
