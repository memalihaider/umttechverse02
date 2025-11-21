-- =========================================
-- Techverse 2026 Final Submission Setup
-- Only Final Submission Related Changes
-- Safe to run on existing Supabase database
-- =========================================

-- =========================================
-- 1. Add Final Submission Support to Business Idea
-- =========================================

-- Note: The business_idea JSONB column already exists and supports final_submission
-- This section ensures the structure is properly documented and any missing constraints are added

-- Verify the business_idea column exists and can store final_submission data
DO $$
BEGIN
    -- Check if business_idea column exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'registrations'
        AND column_name = 'business_idea'
        AND table_schema = 'public'
    ) THEN
        RAISE EXCEPTION 'business_idea column does not exist. Please run the full setup first.';
    END IF;

    RAISE NOTICE 'business_idea column exists and supports final_submission data';
END $$;

-- =========================================
-- 2. Update Sample Data with Final Submission
-- =========================================

-- Add final submission data to existing business innovation participant
UPDATE public.registrations
SET
    current_phase = 'submission',
    submission_status = 'submitted',
    business_idea = jsonb_set(
        COALESCE(business_idea, '{}'::jsonb),
        '{final_submission}',
        '{
            "docsLink": "https://docs.google.com/presentation/d/example-presentation-link",
            "videoLink": "https://youtube.com/watch?v=example-demo-video",
            "description": "Our final submission includes a comprehensive business plan, technical architecture, market analysis, and a working prototype demonstration. The platform features real-time monitoring, predictive analytics, and mobile-responsive design optimized for Pakistani farmers."
        }'::jsonb
    )
WHERE email = 'jane.smith@lums.edu.pk';

-- =========================================
-- 3. Add Final Submission Evaluation Phase
-- =========================================

-- Insert final submission evaluation for Jane Smith
INSERT INTO public.business_innovation_evaluations (
    registration_id, phase, evaluator_name, evaluator_email,
    innovation_score, feasibility_score, market_potential_score,
    presentation_score, technical_score, business_model_score, comments
) VALUES
(
    (SELECT id FROM public.registrations WHERE email = 'jane.smith@lums.edu.pk'),
    'final_submission',
    'Dr. Ahmed Khan',
    'ahmed.khan@techverse.com',
    9, 9, 8, 9, 8, 9,
    'Outstanding final submission with excellent technical implementation and strong business case. The demo video clearly shows a working prototype with real market potential.'
),
(
    (SELECT id FROM public.registrations WHERE email = 'jane.smith@lums.edu.pk'),
    'final_submission',
    'Prof. Sarah Ahmed',
    'sarah.ahmed@techverse.com',
    8, 9, 9, 8, 9, 8,
    'Impressive final product with scalable architecture. Strong focus on local market needs and sustainable business model.'
)
ON CONFLICT (registration_id, phase, evaluator_email) DO UPDATE SET
    innovation_score = EXCLUDED.innovation_score,
    feasibility_score = EXCLUDED.feasibility_score,
    market_potential_score = EXCLUDED.market_potential_score,
    presentation_score = EXCLUDED.presentation_score,
    technical_score = EXCLUDED.technical_score,
    business_model_score = EXCLUDED.business_model_score,
    comments = EXCLUDED.comments,
    evaluated_at = NOW();

-- =========================================
-- 4. Create/Update Views for Final Submissions
-- =========================================

-- Update business innovation leaderboard to include final submission data
CREATE OR REPLACE VIEW business_innovation_leaderboard AS
SELECT
    r.id,
    r.name,
    r.university,
    r.current_phase,
    r.submission_status,
    COALESCE(AVG(e.total_score), 0) as average_score,
    COUNT(e.id) as evaluation_count,
    MAX(e.evaluated_at) as last_evaluation,
    -- Final submission data
    r.business_idea->'final_submission'->>'docsLink' as docs_link,
    r.business_idea->'final_submission'->>'videoLink' as video_link,
    r.business_idea->'final_submission'->>'description' as final_description,
    CASE WHEN r.business_idea->'final_submission' IS NOT NULL THEN true ELSE false END as has_final_submission
FROM public.registrations r
LEFT JOIN public.business_innovation_evaluations e ON r.id = e.registration_id
WHERE r.module = 'Business Innovation' AND r.status = 'approved'
GROUP BY r.id, r.name, r.university, r.current_phase, r.submission_status, r.business_idea
ORDER BY average_score DESC, evaluation_count DESC;

-- =========================================
-- 5. Create Function for Final Submission Management
-- =========================================

-- Function to submit final project
CREATE OR REPLACE FUNCTION submit_final_project(
    registration_id UUID,
    docs_link TEXT DEFAULT NULL,
    video_link TEXT DEFAULT NULL,
    description TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    current_business_idea JSONB;
BEGIN
    -- Check if registration exists and is approved for business innovation
    IF NOT EXISTS (
        SELECT 1 FROM public.registrations
        WHERE id = registration_id
        AND module = 'Business Innovation'
        AND status = 'approved'
    ) THEN
        RETURN FALSE;
    END IF;

    -- Get current business_idea
    SELECT business_idea INTO current_business_idea
    FROM public.registrations
    WHERE id = registration_id;

    -- Initialize business_idea if null
    IF current_business_idea IS NULL THEN
        current_business_idea := '{}'::jsonb;
    END IF;

    -- Create final_submission object
    current_business_idea := jsonb_set(
        current_business_idea,
        '{final_submission}',
        jsonb_build_object(
            'docsLink', docs_link,
            'videoLink', video_link,
            'description', description
        )
    );

    -- Update registration
    UPDATE public.registrations
    SET
        business_idea = current_business_idea,
        current_phase = 'submission',
        submission_status = 'submitted',
        updated_at = NOW()
    WHERE id = registration_id;

    RETURN FOUND;
END;
$$;

-- =========================================
-- 6. Verification Queries for Final Submission
-- =========================================

-- Check final submissions
SELECT 'Final Submissions:' as info, COUNT(*) as count
FROM public.registrations
WHERE business_idea->'final_submission' IS NOT NULL;

-- Check participants with final submission evaluations
SELECT 'Final Submission Evaluations:' as info, COUNT(*) as count
FROM public.business_innovation_evaluations
WHERE phase = 'final_submission';

-- Show final submission details
SELECT
    r.name,
    r.university,
    r.business_idea->'final_submission'->>'docsLink' as docs_link,
    r.business_idea->'final_submission'->>'videoLink' as video_link,
    LEFT(r.business_idea->'final_submission'->>'description', 100) || '...' as description_preview,
    AVG(e.total_score) as final_score,
    COUNT(e.id) as evaluation_count
FROM public.registrations r
LEFT JOIN public.business_innovation_evaluations e ON r.id = e.registration_id AND e.phase = 'final_submission'
WHERE r.business_idea->'final_submission' IS NOT NULL
GROUP BY r.id, r.name, r.university, r.business_idea;

-- =========================================
-- Final Submission Setup Complete!
-- =========================================