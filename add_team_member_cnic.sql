
BEGIN;

-- You can also run a SQL backfill directly in Supabase's SQL Editor using the script below.
-- The JS script in /scripts/add_team_member_cnic.js provides a safer approach with dry-run and apply modes.

UPDATE registrations
SET team_members = (
  SELECT jsonb_agg(
    CASE
      WHEN (member ? 'cnic') THEN member
      ELSE member || '{"cnic":""}'::jsonb
    END
  )
  FROM jsonb_array_elements(registrations.team_members) AS member
)
WHERE team_members IS NOT NULL;

COMMIT;

