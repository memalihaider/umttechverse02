-- =========================================
-- Techverse 2026 Database Corrections & Additions
-- Safe to run multiple times - no conflicts
-- =========================================

-- =========================================
-- 1. Ensure Admin Credentials Exist
-- =========================================

-- Insert/update admin credentials (safe to run multiple times)
INSERT INTO public.admin_credentials (email, password_hash, role, is_active)
VALUES (
    'admin@techverse.com',
    '$2b$10$IAiw0siA4OZP0IO/QW6tEehf8AE/4ewnmVH1CQOZsiMpmQaitLcfa',
    'super_admin',
    true
)
ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    role = EXCLUDED.role,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();

-- Insert additional admin user if needed
INSERT INTO public.admin_credentials (email, password_hash, role, is_active)
VALUES (
    'moderator@techverse.com',
    '$2b$10$IAiw0siA4OZP0IO/QW6tEehf8AE/4ewnmVH1CQOZsiMpmQaitLcfa',
    'admin',
    true
)
ON CONFLICT (email) DO NOTHING;

-- =========================================
-- 2. Fix RLS Policies (if needed)
-- =========================================

-- Drop and recreate policies to ensure they're correct
DROP POLICY IF EXISTS "Allow authenticated updates" ON public.registrations;
CREATE POLICY "Allow authenticated updates" ON public.registrations
    FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow login access" ON public.admin_credentials;
CREATE POLICY "Allow login access" ON public.admin_credentials
    FOR SELECT USING (true);

-- =========================================
-- 3. Ensure Sample Data Exists
-- =========================================

-- Insert sample registrations (safe to run multiple times)
INSERT INTO public.registrations (
    name, email, cnic, phone, university, roll_no, module, team_members,
    access_code, current_phase, status, unique_id
) VALUES
(
    'John Doe',
    'john.doe@umt.edu.pk',
    '12345-1234567-1',
    '+923001234567',
    'University of Management and Technology',
    '2021-CS-001',
    'AI Programming Challenge',
    '[{"name": "John Doe", "email": "john.doe@umt.edu.pk", "university": "University of Management and Technology", "rollNo": "2021-CS-001"}]'::jsonb,
    'ABC12345',
    'idea_selection',
    'pending',
    'TV2025-ABC12345'
),
(
    'Jane Smith',
    'jane.smith@lums.edu.pk',
    '23456-2345678-2',
    '+923007654321',
    'Lahore University of Management Sciences',
    '2021-CS-045',
    'Business Innovation',
    '[{"name": "Jane Smith", "email": "jane.smith@lums.edu.pk", "university": "Lahore University of Management Sciences", "rollNo": "2021-CS-045"}, {"name": "Bob Wilson", "email": "bob.wilson@lums.edu.pk", "university": "Lahore University of Management Sciences", "rollNo": "2021-CS-046"}]'::jsonb,
    'XYZ67890',
    'idea_selection',
    'approved',
    'TV2025-XYZ67890'
),
(
    'Alice Johnson',
    'alice.johnson@nu.edu.pk',
    '34567-3456789-3',
    '+923009876543',
    'National University of Sciences and Technology',
    '2021-EE-078',
    'Robotics Competition',
    '[{"name": "Alice Johnson", "email": "alice.johnson@nu.edu.pk", "university": "National University of Sciences and Technology", "rollNo": "2021-EE-078"}]'::jsonb,
    'DEF56789',
    'idea_selection',
    'pending',
    'TV2025-DEF56789'
)
ON CONFLICT (email) DO NOTHING;

-- =========================================
-- 4. Add Sample Business Innovation Data
-- =========================================

-- Insert business idea for Jane Smith
UPDATE public.registrations
SET business_idea = '{
    "title": "Smart Agriculture IoT Platform",
    "description": "An IoT platform that helps farmers monitor crop health, soil moisture, and weather conditions in real-time.",
    "problem": "Farmers in Pakistan lack access to affordable technology for precision farming, leading to inefficient resource usage and lower yields.",
    "solution": "Our platform provides affordable sensors and a mobile app that gives farmers actionable insights to optimize irrigation and pest control.",
    "marketSize": "Pakistan agricultural market: $70B, Global precision agriculture: $10B growing at 15% CAGR",
    "targetAudience": "Small to medium farmers in Pakistan, agricultural cooperatives, and farming communities",
    "competitiveAdvantage": "Localized for Pakistani farming conditions, affordable pricing, multilingual support",
    "revenueModel": "Subscription-based SaaS model with hardware sales, partnerships with agricultural cooperatives"
}'::jsonb
WHERE email = 'jane.smith@lums.edu.pk';

-- Insert sample evaluations for Jane Smith
INSERT INTO public.business_innovation_evaluations (
    registration_id, phase, evaluator_name, evaluator_email,
    innovation_score, feasibility_score, market_potential_score,
    presentation_score, technical_score, business_model_score, comments
) VALUES
(
    (SELECT id FROM public.registrations WHERE email = 'jane.smith@lums.edu.pk'),
    'idea_selection',
    'Dr. Ahmed Khan',
    'ahmed.khan@techverse.com',
    8, 9, 7, 8, 6, 8,
    'Excellent innovative approach with strong market potential. Good understanding of local market needs.'
),
(
    (SELECT id FROM public.registrations WHERE email = 'jane.smith@lums.edu.pk'),
    'design',
    'Prof. Sarah Ahmed',
    'sarah.ahmed@techverse.com',
    9, 8, 8, 9, 7, 9,
    'Strong design phase execution. Technical architecture is sound and scalable.'
)
ON CONFLICT (registration_id, phase, evaluator_email) DO NOTHING;

-- =========================================
-- 5. Verify Setup
-- =========================================

-- Check admin credentials
SELECT 'Admin Credentials:' as info, COUNT(*) as count FROM public.admin_credentials;

-- Check registrations
SELECT 'Total Registrations:' as info, COUNT(*) as count FROM public.registrations;

-- Check business innovation participants
SELECT 'Business Innovation Participants:' as info, COUNT(*) as count
FROM public.registrations
WHERE module = 'Business Innovation' AND status = 'approved';

-- Check evaluations
SELECT 'Total Evaluations:' as info, COUNT(*) as count FROM public.business_innovation_evaluations;

-- =========================================
-- 6. Additional Indexes (if missing)
-- =========================================

-- Ensure all necessary indexes exist
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_module ON public.registrations(module);
CREATE INDEX IF NOT EXISTS idx_registrations_university ON public.registrations(university);
CREATE INDEX IF NOT EXISTS idx_registrations_access_code ON public.registrations(access_code);
CREATE INDEX IF NOT EXISTS idx_registrations_unique_id ON public.registrations(unique_id);
CREATE INDEX IF NOT EXISTS idx_registrations_current_phase ON public.registrations(current_phase);
CREATE INDEX IF NOT EXISTS idx_evaluations_registration_id ON public.business_innovation_evaluations(registration_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_phase ON public.business_innovation_evaluations(phase);
CREATE INDEX IF NOT EXISTS idx_evaluations_total_score ON public.business_innovation_evaluations(total_score DESC);
-- Add team_name column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'registrations' AND column_name = 'team_name'
    ) THEN
        ALTER TABLE public.registrations ADD COLUMN team_name TEXT;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_registrations_team_name ON public.registrations(team_name);

-- =========================================
-- 7. Update Statistics Views (refresh)
-- =========================================

-- Force refresh of views
DO $$
BEGIN
    -- Check and refresh each materialized view if it exists
    IF EXISTS (SELECT 1 FROM pg_matviews WHERE matviewname = 'registration_stats') THEN
        REFRESH MATERIALIZED VIEW registration_stats;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_matviews WHERE matviewname = 'module_stats') THEN
        REFRESH MATERIALIZED VIEW module_stats;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_matviews WHERE matviewname = 'university_stats') THEN
        REFRESH MATERIALIZED VIEW university_stats;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_matviews WHERE matviewname = 'business_innovation_leaderboard') THEN
        REFRESH MATERIALIZED VIEW business_innovation_leaderboard;
    END IF;
END $$;

-- =========================================
-- Setup Corrections Complete!
-- =========================================

-- Final verification queries:
SELECT 'Setup Status:' as status;
SELECT
    (SELECT COUNT(*) FROM public.admin_credentials) as admin_users,
    (SELECT COUNT(*) FROM public.registrations) as total_registrations,
    (SELECT COUNT(*) FROM public.registrations WHERE status = 'approved') as approved_registrations,
    (SELECT COUNT(*) FROM public.business_innovation_evaluations) as total_evaluations;
<parameter name="filePath">/Users/macbookpro/Desktop/reg/database_corrections.sql