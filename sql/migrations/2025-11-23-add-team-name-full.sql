-- Minimal migration to add team_name to public.registrations
-- Safe to re-run, idempotent
-- Created: 2025-11-23
-- Purpose: Add `team_name` column, create index, and backfill sensible default team names

-- 1) Add team_name column (if not present)
ALTER TABLE public.registrations
ADD COLUMN IF NOT EXISTS team_name TEXT;

-- 2) Create index on team_name if it doesn't exist
DO $$
BEGIN
	IF NOT EXISTS (
		SELECT 1 
		FROM pg_class c 
		JOIN pg_namespace n ON n.oid = c.relnamespace 
		WHERE c.relkind = 'i'
		  AND c.relname = 'idx_registrations_team_name'
		  AND n.nspname = 'public'
	) THEN
		EXECUTE 'CREATE INDEX idx_registrations_team_name ON public.registrations(team_name)';
	END IF;
END $$;

-- 3) Backfill team_name where it is probably the registrant name
--    Heuristic: If team_members is a JSON array of length 1, set team_name = name
UPDATE public.registrations
SET team_name = name
WHERE team_name IS NULL
  AND jsonb_array_length(coalesce(team_members, '[]'::jsonb)) = 1;

