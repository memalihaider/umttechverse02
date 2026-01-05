-- =========================================
-- SECURITY EMERGENCY: Clear All Database Data
-- Execute this script to remove all data due to security breach
-- =========================================

-- WARNING: This will permanently delete ALL data from the database
-- Make sure you have backups if needed

-- Clear business innovation evaluations first (due to foreign key constraints)
DELETE FROM public.business_innovation_evaluations;

-- Clear all registrations
DELETE FROM public.registrations;

-- Clear admin credentials (optional - you may want to keep admin accounts)
-- DELETE FROM public.admin_credentials;

-- Reset any sequences if needed
-- ALTER SEQUENCE IF EXISTS registrations_id_seq RESTART WITH 1;
-- ALTER SEQUENCE IF EXISTS admin_credentials_id_seq RESTART WITH 1;
-- ALTER SEQUENCE IF EXISTS business_innovation_evaluations_id_seq RESTART WITH 1;

-- Verification queries
SELECT 'Data cleared successfully!' as status;
SELECT
    (SELECT COUNT(*) FROM public.admin_credentials) as admin_users_remaining,
    (SELECT COUNT(*) FROM public.registrations) as registrations_remaining,
    (SELECT COUNT(*) FROM public.business_innovation_evaluations) as evaluations_remaining;