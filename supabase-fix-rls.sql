-- ============================================
-- AVORAHUB - FIX RLS POLICIES FOR PUBLIC READ
-- Run this in Supabase SQL Editor IMMEDIATELY
-- ============================================

-- ============================================
-- STEP 1: DROP ALL EXISTING POLICIES
-- ============================================

-- Startups
DROP POLICY IF EXISTS "Public read access" ON startups;
DROP POLICY IF EXISTS "startups_select_policy" ON startups;
DROP POLICY IF EXISTS "Authenticated insert" ON startups;
DROP POLICY IF EXISTS "startups_insert_policy" ON startups;
DROP POLICY IF EXISTS "Users update own" ON startups;
DROP POLICY IF EXISTS "startups_update_policy" ON startups;
DROP POLICY IF EXISTS "startups_delete_policy" ON startups;

-- Problems
DROP POLICY IF EXISTS "Public read access" ON problems;
DROP POLICY IF EXISTS "problems_select_policy" ON problems;
DROP POLICY IF EXISTS "Authenticated insert" ON problems;
DROP POLICY IF EXISTS "problems_insert_policy" ON problems;
DROP POLICY IF EXISTS "Users update own" ON problems;
DROP POLICY IF EXISTS "problems_update_policy" ON problems;
DROP POLICY IF EXISTS "problems_delete_policy" ON problems;

-- Jobs
DROP POLICY IF EXISTS "Public read access" ON jobs;
DROP POLICY IF EXISTS "jobs_select_policy" ON jobs;
DROP POLICY IF EXISTS "Authenticated insert" ON jobs;
DROP POLICY IF EXISTS "jobs_insert_policy" ON jobs;
DROP POLICY IF EXISTS "Users update own" ON jobs;
DROP POLICY IF EXISTS "jobs_update_policy" ON jobs;
DROP POLICY IF EXISTS "jobs_delete_policy" ON jobs;

-- Investors (Mentors)
DROP POLICY IF EXISTS "Public read access" ON investors;
DROP POLICY IF EXISTS "investors_select_policy" ON investors;

-- Events
DROP POLICY IF EXISTS "Public read access" ON events;
DROP POLICY IF EXISTS "events_select_policy" ON events;
DROP POLICY IF EXISTS "Authenticated insert" ON events;
DROP POLICY IF EXISTS "events_insert_policy" ON events;
DROP POLICY IF EXISTS "Users update own" ON events;
DROP POLICY IF EXISTS "events_update_policy" ON events;
DROP POLICY IF EXISTS "events_delete_policy" ON events;

-- Forum Topics
DROP POLICY IF EXISTS "Public read access" ON forum_topics;
DROP POLICY IF EXISTS "forum_topics_select_policy" ON forum_topics;

-- ============================================
-- STEP 2: ENSURE RLS IS ENABLED
-- ============================================
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_topics ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 3: CREATE FRESH PUBLIC READ POLICIES
-- ============================================
CREATE POLICY "Public Read" ON startups FOR SELECT USING (true);
CREATE POLICY "Public Read" ON problems FOR SELECT USING (true);
CREATE POLICY "Public Read" ON jobs FOR SELECT USING (true);
CREATE POLICY "Public Read" ON investors FOR SELECT USING (true);
CREATE POLICY "Public Read" ON events FOR SELECT USING (true);
CREATE POLICY "Public Read" ON forum_topics FOR SELECT USING (true);

-- ============================================
-- STEP 4: RE-CREATE INSERT/UPDATE POLICIES
-- ============================================
CREATE POLICY "Auth Insert" ON startups FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth Insert" ON problems FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth Insert" ON jobs FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth Insert" ON events FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth Insert" ON forum_topics FOR INSERT WITH CHECK (true);

CREATE POLICY "Auth Update" ON startups FOR UPDATE USING (true);
CREATE POLICY "Auth Update" ON problems FOR UPDATE USING (true);
CREATE POLICY "Auth Update" ON jobs FOR UPDATE USING (true);
CREATE POLICY "Auth Update" ON events FOR UPDATE USING (true);
CREATE POLICY "Auth Update" ON forum_topics FOR UPDATE USING (true);

-- ============================================
-- VERIFICATION: Check row counts
-- ============================================
SELECT 'startups' as table_name, COUNT(*) as row_count FROM startups
UNION ALL
SELECT 'problems', COUNT(*) FROM problems
UNION ALL
SELECT 'jobs', COUNT(*) FROM jobs
UNION ALL
SELECT 'investors', COUNT(*) FROM investors
UNION ALL
SELECT 'events', COUNT(*) FROM events
UNION ALL
SELECT 'forum_topics', COUNT(*) FROM forum_topics;

-- ============================================
-- DONE! Refresh your site after running this.
-- ============================================
