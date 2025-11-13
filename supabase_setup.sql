-- =========================================
-- Techverse 2026 Database Setup
-- Supabase SQL Setup Script
-- =========================================

-- =========================================
-- 2. Create Admin Credentials Table
-- =========================================

CREATE TABLE IF NOT EXISTS public.admin_credentials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    cnic TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    university TEXT NOT NULL,
    roll_no TEXT NOT NULL,
    module TEXT NOT NULL,
    hostel TEXT DEFAULT 'none' CHECK (hostel IN ('none', 'one_day', 'three_days')),
    ambassador_code TEXT, -- Ambassador code for discount (optional)
    team_members JSONB DEFAULT '[]'::jsonb,
    payment_receipt_url TEXT,
    access_code TEXT UNIQUE, -- Unique access code for portal login
    unique_id TEXT UNIQUE, -- Unique certificate ID for certificate generation
    -- Business Innovation specific fields
    business_idea JSONB, -- {title, description, problem, solution, market_size, target_audience}
    current_phase TEXT DEFAULT 'idea_selection' CHECK (current_phase IN ('idea_selection', 'design', 'development', 'submission')),
    github_repo TEXT, -- GitHub repository link for final submission
    submission_status TEXT DEFAULT 'not_started' CHECK (submission_status IN ('not_started', 'in_progress', 'submitted')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- 9. Create Business Innovation Evaluations Table
-- =========================================

CREATE TABLE IF NOT EXISTS public.business_innovation_evaluations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    registration_id UUID REFERENCES public.registrations(id) ON DELETE CASCADE,
    phase TEXT NOT NULL CHECK (phase IN ('idea_selection', 'design', 'development', 'final_submission')),
    evaluator_name TEXT NOT NULL,
    evaluator_email TEXT NOT NULL,
    -- Evaluation Criteria (0-10 scale)
    innovation_score INTEGER CHECK (innovation_score >= 0 AND innovation_score <= 10),
    feasibility_score INTEGER CHECK (feasibility_score >= 0 AND feasibility_score <= 10),
    market_potential_score INTEGER CHECK (market_potential_score >= 0 AND market_potential_score <= 10),
    presentation_score INTEGER CHECK (presentation_score >= 0 AND presentation_score <= 10),
    technical_score INTEGER CHECK (technical_score >= 0 AND technical_score <= 10),
    business_model_score INTEGER CHECK (business_model_score >= 0 AND business_model_score <= 10),
    total_score INTEGER GENERATED ALWAYS AS (
        COALESCE(innovation_score, 0) + 
        COALESCE(feasibility_score, 0) + 
        COALESCE(market_potential_score, 0) + 
        COALESCE(presentation_score, 0) + 
        COALESCE(technical_score, 0) + 
        COALESCE(business_model_score, 0)
    ) STORED,
    comments TEXT,
    evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(registration_id, phase, evaluator_email)
);

-- =========================================
-- 11. Additional Safety Checks
-- =========================================

-- Ensure all necessary indexes exist (safe to run multiple times)
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

-- =========================================
-- 3. Create Updated At Trigger Function
-- =========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =========================================
-- 4. Create Trigger for Admin Credentials Updated At
-- =========================================

CREATE TRIGGER update_admin_credentials_updated_at
    BEFORE UPDATE ON public.admin_credentials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =========================================
-- 5. Row Level Security (RLS) Policies
-- =========================================

-- Enable RLS on registrations table
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (for registration form)
CREATE POLICY "Allow public registration" ON public.registrations
    FOR INSERT
    WITH CHECK (true);

-- Policy: Allow anyone to select their own registration (for status checking)
CREATE POLICY "Allow users to view own registration" ON public.registrations
    FOR SELECT
    USING (true); -- In production, you might want to restrict this

-- Policy: Allow authenticated users to update (for admin panel)
-- Note: Modified to allow updates for admin operations
CREATE POLICY "Allow authenticated updates" ON public.registrations
    FOR UPDATE
    USING (true);

-- Policy: Allow authenticated admins to read own credentials (for profile)
CREATE POLICY "Allow authenticated admins to read own credentials" ON public.admin_credentials
    FOR SELECT
    USING (auth.role() = 'authenticated' AND email = auth.jwt() ->> 'email');

-- Policy: Allow login attempts (for authentication)
CREATE POLICY "Allow login access" ON public.admin_credentials
    FOR SELECT
    USING (true);

-- Policy: Allow authenticated super admins to manage all admin credentials
CREATE POLICY "Allow super admins to manage admin credentials" ON public.admin_credentials
    FOR ALL
    USING (auth.role() = 'authenticated' AND EXISTS (
        SELECT 1 FROM public.admin_credentials 
        WHERE email = auth.jwt() ->> 'email' AND role = 'super_admin'
    ));

-- =========================================
-- 6. Create Storage Bucket for Receipts
-- =========================================

-- Create receipts bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('receipts', 'receipts', true)
ON CONFLICT (id) DO NOTHING;

-- =========================================
-- 7. Storage Policies for Receipts Bucket
-- =========================================

-- Allow public uploads to receipts bucket (for registration form)
CREATE POLICY "Allow public uploads to receipts" ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'receipts');

-- Allow public reads from receipts bucket (for viewing uploaded receipts)
CREATE POLICY "Allow public reads from receipts" ON storage.objects
    FOR SELECT
    USING (bucket_id = 'receipts');

-- Policy: Allow authenticated users to delete receipts (for admin cleanup)
CREATE POLICY "Allow authenticated deletes from receipts" ON storage.objects
    FOR DELETE
    USING (bucket_id = 'receipts' AND auth.role() = 'authenticated');

-- =========================================
-- 8. RLS Policies for Business Innovation Evaluations
-- =========================================

-- Enable RLS on evaluations table
ALTER TABLE public.business_innovation_evaluations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated evaluators to insert evaluations
CREATE POLICY "Allow authenticated evaluators to insert evaluations" ON public.business_innovation_evaluations
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Policy: Allow authenticated evaluators to update their evaluations
CREATE POLICY "Allow authenticated evaluators to update evaluations" ON public.business_innovation_evaluations
    FOR UPDATE
    USING (auth.role() = 'authenticated' AND evaluator_email = auth.jwt() ->> 'email');

-- Policy: Allow authenticated users to read evaluations
CREATE POLICY "Allow authenticated reads evaluations" ON public.business_innovation_evaluations
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- =========================================
-- 8. Fix RLS Policies (Safety Updates)
-- =========================================

-- Drop and recreate policies to ensure they're correct (safe to run multiple times)
DROP POLICY IF EXISTS "Allow authenticated updates" ON public.registrations;
CREATE POLICY "Allow authenticated updates" ON public.registrations
    FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow login access" ON public.admin_credentials;
CREATE POLICY "Allow login access" ON public.admin_credentials
    FOR SELECT USING (true);

-- =========================================
-- 9. Create Views for Analytics
-- =========================================

-- View for registration statistics
CREATE OR REPLACE VIEW registration_stats AS
SELECT
    COUNT(*) as total_registrations,
    COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_registrations,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_registrations,
    COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected_registrations,
    COUNT(DISTINCT university) as unique_universities,
    COUNT(DISTINCT module) as unique_modules
FROM public.registrations;

-- View for module-wise statistics
CREATE OR REPLACE VIEW module_stats AS
SELECT
    module,
    COUNT(*) as total_registrations,
    COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_count,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
    COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected_count,
    ROUND(AVG(jsonb_array_length(team_members)), 2) as avg_team_size
FROM public.registrations
GROUP BY module
ORDER BY total_registrations DESC;

-- View for university-wise statistics
CREATE OR REPLACE VIEW university_stats AS
SELECT
    university,
    COUNT(*) as total_registrations,
    COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_count,
    COUNT(DISTINCT module) as unique_modules
FROM public.registrations
GROUP BY university
ORDER BY total_registrations DESC;

-- View for business innovation leaderboard
CREATE OR REPLACE VIEW business_innovation_leaderboard AS
SELECT
    r.id,
    r.name,
    r.university,
    r.current_phase,
    r.submission_status,
    COALESCE(AVG(e.total_score), 0) as average_score,
    COUNT(e.id) as evaluation_count,
    MAX(e.evaluated_at) as last_evaluation
FROM public.registrations r
LEFT JOIN public.business_innovation_evaluations e ON r.id = e.registration_id
WHERE r.module = 'Business Innovation' AND r.status = 'approved'
GROUP BY r.id, r.name, r.university, r.current_phase, r.submission_status
ORDER BY average_score DESC, evaluation_count DESC;

-- =========================================
-- 12. Views Refresh Note
-- =========================================

-- Note: Regular views (not materialized) are automatically updated when underlying data changes
-- No manual refresh needed for: registration_stats, module_stats, university_stats, business_innovation_leaderboard

-- =========================================
-- 9. Create Functions for Common Operations
-- =========================================

-- Function to get registration by email
CREATE OR REPLACE FUNCTION get_registration_by_email(user_email TEXT)
RETURNS TABLE (
    id UUID,
    name TEXT,
    email TEXT,
    cnic TEXT,
    phone TEXT,
    university TEXT,
    roll_no TEXT,
    module TEXT,
    team_members JSONB,
    payment_receipt_url TEXT,
    access_code TEXT,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT r.id, r.name, r.email, r.cnic, r.phone, r.university, r.roll_no,
           r.module, r.team_members, r.payment_receipt_url, r.access_code, r.status,
           r.created_at, r.updated_at
    FROM public.registrations r
    WHERE r.email = user_email;
END;
$$;

-- Function to get registration by access code
CREATE OR REPLACE FUNCTION get_registration_by_access_code(user_access_code TEXT)
RETURNS TABLE (
    id UUID,
    name TEXT,
    email TEXT,
    cnic TEXT,
    phone TEXT,
    university TEXT,
    roll_no TEXT,
    module TEXT,
    team_members JSONB,
    payment_receipt_url TEXT,
    access_code TEXT,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT r.id, r.name, r.email, r.cnic, r.phone, r.university, r.roll_no,
           r.module, r.team_members, r.payment_receipt_url, r.access_code, r.status,
           r.created_at, r.updated_at
    FROM public.registrations r
    WHERE r.access_code = user_access_code AND r.status = 'approved';
END;
$$;

-- Function to generate unique access code
CREATE OR REPLACE FUNCTION generate_unique_access_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    new_code TEXT;
    code_exists BOOLEAN := TRUE;
BEGIN
    WHILE code_exists LOOP
        -- Generate a 8-character alphanumeric code
        new_code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
        
        -- Check if code already exists
        SELECT EXISTS(
            SELECT 1 FROM public.registrations 
            WHERE access_code = new_code
        ) INTO code_exists;
    END LOOP;
    
    RETURN new_code;
END;
$$;

-- Function to update registration status
CREATE OR REPLACE FUNCTION update_registration_status(registration_id UUID, new_status TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF new_status NOT IN ('pending', 'approved', 'rejected') THEN
        RETURN FALSE;
    END IF;

    UPDATE public.registrations
    SET status = new_status, updated_at = NOW()
    WHERE id = registration_id;

    RETURN FOUND;
END;
$$;

-- =========================================
-- 10. Sample Data (Optional - for testing)
-- =========================================

-- Insert default admin credentials
-- Password: Admin@2026 (hashed with bcrypt)
-- Note: In production, change this password immediately
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

-- Insert additional admin user
INSERT INTO public.admin_credentials (email, password_hash, role, is_active)
VALUES (
    'moderator@techverse.com',
    '$2b$10$IAiw0siA4OZP0IO/QW6tEehf8AE/4ewnmVH1CQOZsiMpmQaitLcfa',
    'admin',
    true
)
ON CONFLICT (email) DO NOTHING;

-- Uncomment the following lines to insert sample data for testing

INSERT INTO public.registrations (
    name, email, cnic, phone, university, roll_no, module, team_members, access_code, current_phase, status, unique_id
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
-- 11. Add Business Innovation Sample Data
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

-- Sample evaluation data
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
-- Setup Complete!
-- =========================================

-- Verify setup by running these queries:
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

-- Final verification queries:
SELECT 'Setup Status:' as status;
SELECT
    (SELECT COUNT(*) FROM public.admin_credentials) as admin_users,
    (SELECT COUNT(*) FROM public.registrations) as total_registrations,
    (SELECT COUNT(*) FROM public.registrations WHERE status = 'approved') as approved_registrations,
    (SELECT COUNT(*) FROM public.business_innovation_evaluations) as total_evaluations;