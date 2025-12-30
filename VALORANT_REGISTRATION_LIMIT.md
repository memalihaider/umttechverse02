# Valorant Module Registration Limit Implementation

## Summary
Implemented logic to hide Valorant module from the registration form when it reaches 15 approved registrations. The system fetches registration counts from the backend and updates every 30 seconds.

## Changes Made

### 1. **New API Endpoint** 
**File:** `app/api/module-registration-count/route.ts`

Created a new endpoint that:
- Accepts a module name via query parameter
- Returns the count of approved registrations for that module
- Returns whether the limit (15) has been reached
- Called when the registration form loads and every 30 seconds

**API Response Example:**
```json
{
  "module": "Valorant",
  "count": 12,
  "isLimitReached": false
}
```

### 2. **RegistrationForm Component Updates**
**File:** `app/components/RegistrationForm.tsx`

#### Added State Management:
- `moduleRegistrationCounts`: Tracks registration counts for each module (currently Valorant)
- `loadingCounts`: Indicates if the count data is being fetched

#### Added useEffect Hook:
```typescript
useEffect(() => {
  const fetchRegistrationCounts = async () => {
    setLoadingCounts(true)
    try {
      const response = await fetch('/api/module-registration-count?module=Valorant')
      if (response.ok) {
        const data = await response.json()
        setModuleRegistrationCounts(prev => ({
          ...prev,
          [data.module]: data.count
        }))
      }
    } catch (error) {
      console.error('Error fetching registration counts:', error)
    } finally {
      setLoadingCounts(false)
    }
  }

  fetchRegistrationCounts()
  // Refresh counts every 30 seconds
  const interval = setInterval(fetchRegistrationCounts, 30000)
  return () => clearInterval(interval)
}, [])
```

#### Updated Module Dropdown:
- Filters out Valorant when count >= 15
- Shows current registration count for Valorant: "Valorant (12/15)"
- Displays a warning message when Valorant is full
- Color-coded message with red background

#### Added Submit Validation:
- Prevents form submission if Valorant is selected and limit is reached
- Shows user-friendly alert: "Valorant registration is currently full (15/15). Please choose another module."

### 3. **Module List Update**
**File:** `app/components/RegistrationForm.tsx`

The Valorant module is already included:
```typescript
{
  name: 'Valorant',
  fee: 2500,
  contactPerson: 'Muhammad Moeed - +92 324 4932912',
  teamSize: '5 members + 1 sub',
  winnerPrize: 25000,
  runnerUpPrize: 10000
}
```

## How It Works

### User Experience Flow:

1. **When form loads:**
   - System fetches Valorant registration count from `/api/module-registration-count?module=Valorant`
   - Count is stored in state and updates every 30 seconds

2. **When count < 15:**
   - Valorant appears in the module dropdown
   - Displays current count: "Valorant - PKR 2500 (12/15) (5 members + 1 sub)"
   - User can select and register for Valorant

3. **When count reaches 15:**
   - Valorant is automatically hidden from the dropdown
   - A warning message appears: "Valorant registration is currently full (15/15). Please choose another module."
   - User cannot submit a registration if they somehow select Valorant

### Admin Oversight:

The registration count comes from the database query in `/api/module-registration-count`:
- Counts only "approved" registrations
- Gets data from the `registrations` table
- Filters by module name = 'Valorant'

## Database Requirement

The implementation queries the `registrations` table with:
```sql
SELECT COUNT(*) FROM registrations 
WHERE module = 'Valorant' AND status = 'approved'
```

Ensure your `registrations` table has:
- `module` column (string)
- `status` column (string - 'pending', 'approved', 'rejected')

## Refresh Mechanism

- Initial fetch when component mounts
- Automatic refresh every 30 seconds
- Prevents unnecessary API calls with cleanup function
- Error handling if API fails

## Future Enhancements

1. **Apply to other modules:**
   - Easily extend to other modules with registration limits
   - Modify the API endpoint to accept module names as parameters

2. **Admin Dashboard:**
   - Add a section to display all module registration counts
   - Allow admins to update module limits from the admin panel

3. **Real-time Updates:**
   - Use WebSocket or real-time database subscriptions for instant updates
   - Show real-time registration status to users

4. **Notifications:**
   - Notify admins when a module reaches the limit
   - Notify users when a module becomes available again

## Testing Checklist

- [x] Valorant appears in dropdown when count < 15
- [x] Valorant hides from dropdown when count >= 15
- [x] Count displays correctly in dropdown (e.g., "12/15")
- [x] Warning message shows when Valorant is full
- [x] Form cannot be submitted with Valorant when limit is reached
- [x] Auto-refresh works every 30 seconds
- [x] Error handling if API fails gracefully

## Files Modified

1. `app/api/module-registration-count/route.ts` - NEW
2. `app/components/RegistrationForm.tsx` - UPDATED
   - Added state for module counts
   - Added useEffect for fetching counts
   - Updated module dropdown filter logic
   - Added submit validation
   - Added warning message UI
