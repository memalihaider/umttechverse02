# Valorant Registration Limit - Quick Test Guide

## Implementation Summary

✅ **Valorant Module** - Registration limit of **15 approved teams**
- Automatically hides from registration form when limit reached
- Shows current count (e.g., "Valorant (12/15)")
- Prevents form submission when full
- Auto-refreshes count every 30 seconds

## Test Cases

### Test 1: Verify Module Appears in Dropdown
**Steps:**
1. Navigate to `/register` page
2. Scroll to "Module Selection" section
3. Click module dropdown

**Expected:**
- ✅ "Valorant" option visible if count < 15
- ✅ Shows count and team size: "Valorant - PKR 2500 (12/15) (5 members + 1 sub)"

### Test 2: Verify Module Hides When Full
**Prerequisites:** Valorant must have 15+ approved registrations

**Steps:**
1. Check database: `SELECT COUNT(*) FROM registrations WHERE module='Valorant' AND status='approved'`
2. Navigate to `/register` page
3. Click module dropdown

**Expected:**
- ✅ "Valorant" option NOT visible in dropdown
- ✅ Warning message shows: "Valorant registration is currently full (15/15). Please choose another module."

### Test 3: Verify Auto-Refresh
**Steps:**
1. Note current Valorant count in dropdown
2. Wait 30 seconds
3. Refresh page OR check dropdown again

**Expected:**
- ✅ Count updates automatically
- ✅ No page refresh required

### Test 4: Prevent Submission When Full
**Prerequisites:** Valorant must have 15+ approved registrations

**Steps:**
1. Using browser console, manually set form data:
   ```javascript
   document.querySelector('[name="module"]').value = 'Valorant'
   ```
2. Fill out all required form fields
3. Click "Submit Registration" button

**Expected:**
- ✅ Form submission prevented
- ✅ Alert shows: "Valorant registration is currently full (15/15). Please choose another module."
- ✅ Form NOT submitted

### Test 5: Verify API Endpoint
**Steps:**
1. Open browser DevTools → Network tab
2. Navigate to `/register` page
3. Look for request to `/api/module-registration-count?module=Valorant`

**Expected:**
- ✅ Request returns 200 status
- ✅ Response contains:
  ```json
  {
    "module": "Valorant",
    "count": 12,
    "isLimitReached": false
  }
  ```

## Manual Testing - Simulating Different Scenarios

### Scenario A: Less than 15 registrations
**Current Setup:**
- Valorant count: 5-14
- Expected: Module visible, can register

**Action:**
1. Go to `/register`
2. Select "Valorant" from dropdown
3. Complete and submit registration
4. Should succeed

### Scenario B: Exactly 15 registrations
**Current Setup:**
- Valorant count: 15
- Expected: Module hidden, cannot register

**Action:**
1. Go to `/register`
2. Module dropdown should NOT show Valorant
3. Warning message should appear
4. Try to manually select Valorant via console → submission blocked

### Scenario C: More than 15 registrations
**Current Setup:**
- Valorant count: 16+
- Expected: Same as Scenario B

**Action:**
- Same as Scenario B

## Database Verification

### Check Current Count
```sql
SELECT COUNT(*) as valorant_approved_count
FROM registrations
WHERE module = 'Valorant' AND status = 'approved';
```

### Check All Modules
```sql
SELECT module, status, COUNT(*) as count
FROM registrations
GROUP BY module, status
ORDER BY module, status;
```

### Count by Status
```sql
SELECT 
  module,
  COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
  COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected
FROM registrations
GROUP BY module
ORDER BY module;
```

## Browser Console Debugging

### Check Fetch Errors
```javascript
// Monitor console for errors
console.log('Module Registration Counts:', moduleRegistrationCounts)
```

### Manually Trigger API Call
```javascript
fetch('/api/module-registration-count?module=Valorant')
  .then(r => r.json())
  .then(data => console.log('API Response:', data))
```

### Simulate Limit Reached
```javascript
// Force the component to think Valorant is full
localStorage.setItem('valorant_count_override', '15')
```

## Checklist Before Production

- [ ] API endpoint `/api/module-registration-count` is deployed
- [ ] RegistrationForm component has latest code with limit logic
- [ ] Database `registrations` table has `module` and `status` columns
- [ ] Admin can view registration counts in dashboard
- [ ] Auto-refresh (every 30 seconds) is working
- [ ] Error handling works when API fails
- [ ] Form prevents submission when limit reached
- [ ] Warning message displays when module is full
- [ ] Module is correctly hidden from dropdown when full

## Rollback Instructions

If issues occur:

1. **Disable auto-hiding:**
   - Comment out the filter logic in module dropdown
   - Keep count display but allow selection

2. **Disable auto-refresh:**
   - Comment out the `useEffect` with `setInterval`
   - Call fetch only once on mount

3. **Remove limit entirely:**
   - Remove the `if (isLimitReached)` check
   - Remove the useEffect hook
   - Remove submit validation

## Performance Notes

- API calls every 30 seconds (configurable)
- Only fetches Valorant count (minimal bandwidth)
- Graceful error handling if API fails
- No blocking operations

## Files Modified

1. ✅ `/app/api/module-registration-count/route.ts` - NEW
2. ✅ `/app/components/RegistrationForm.tsx` - UPDATED
3. ✅ `/VALORANT_REGISTRATION_LIMIT.md` - NEW (documentation)
4. ✅ `/MODULE_LIMIT_CONFIGURATION.md` - NEW (configuration guide)

## Support

For issues:
1. Check browser console for errors
2. Verify API endpoint response
3. Check database count manually
4. Review error handling in useEffect
5. Test with different count values
