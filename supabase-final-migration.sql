  -- ============================================
  -- AVORA PRODUCT HUNTER - FINAL MIGRATION
  -- Complete Architecture Overhaul: Security + RBAC
  -- ============================================
  -- Run this in Supabase SQL Editor
  -- IMPORTANT: Run this FIRST before deploying code changes

  -- ============================================
  -- STEP 1: Update Profiles Table Schema
  -- ============================================

  -- Add role column (mandatory choice: entrepreneur or investor)
  ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS role VARCHAR(20) CHECK (role IN ('entrepreneur', 'investor'));

  -- Add company column (optional)
  ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS company VARCHAR(255);

  -- Remove user_type column if it exists (replaced by role)
  ALTER TABLE profiles 
  DROP COLUMN IF EXISTS user_type;

  -- ============================================
  -- STEP 2: Remove Auto-Profile Creation
  -- ============================================
  -- This conflicts with the onboarding flow
  -- Users should manually create their profile during onboarding

  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
  DROP FUNCTION IF EXISTS handle_new_user();

  -- ============================================
  -- STEP 3: Update RLS Policies for Profiles
  -- ============================================

  -- Drop existing policies
  DROP POLICY IF EXISTS "Public read access" ON profiles;
  DROP POLICY IF EXISTS "Users update own profile" ON profiles;

  -- New policies
  CREATE POLICY "profiles_select_policy" 
  ON profiles FOR SELECT 
  USING (true);

  CREATE POLICY "profiles_insert_policy" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

  CREATE POLICY "profiles_update_policy" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

  -- ============================================
  -- STEP 4: Update RLS Policies for Startups
  -- ============================================

  -- Drop existing policies
  DROP POLICY IF EXISTS "Public read access" ON startups;
  DROP POLICY IF EXISTS "Authenticated insert" ON startups;
  DROP POLICY IF EXISTS "Users update own" ON startups;

  -- New policies: Public Read, Owner-only Write/Delete
  CREATE POLICY "startups_select_policy" 
  ON startups FOR SELECT 
  USING (true);

  CREATE POLICY "startups_insert_policy" 
  ON startups FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

  CREATE POLICY "startups_update_policy" 
  ON startups FOR UPDATE 
  USING (auth.uid() = user_id);

  CREATE POLICY "startups_delete_policy" 
  ON startups FOR DELETE 
  USING (auth.uid() = user_id);

  -- ============================================
  -- STEP 5: Update RLS Policies for Jobs
  -- ============================================

  -- Drop existing policies
  DROP POLICY IF EXISTS "Public read access" ON jobs;
  DROP POLICY IF EXISTS "Authenticated insert" ON jobs;
  DROP POLICY IF EXISTS "Users update own" ON jobs;

  -- New policies: Public Read, Owner-only Write/Delete
  CREATE POLICY "jobs_select_policy" 
  ON jobs FOR SELECT 
  USING (true);

  CREATE POLICY "jobs_insert_policy" 
  ON jobs FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

  CREATE POLICY "jobs_update_policy" 
  ON jobs FOR UPDATE 
  USING (auth.uid() = user_id);

  CREATE POLICY "jobs_delete_policy" 
  ON jobs FOR DELETE 
  USING (auth.uid() = user_id);

  -- ============================================
  -- STEP 6: Update RLS Policies for Problems
  -- ============================================

  -- Drop existing policies
  DROP POLICY IF EXISTS "Public read access" ON problems;
  DROP POLICY IF EXISTS "Authenticated insert" ON problems;
  DROP POLICY IF EXISTS "Users update own" ON problems;

  -- New policies
  CREATE POLICY "problems_select_policy" 
  ON problems FOR SELECT 
  USING (true);

  CREATE POLICY "problems_insert_policy" 
  ON problems FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

  CREATE POLICY "problems_update_policy" 
  ON problems FOR UPDATE 
  USING (auth.uid() = user_id);

  CREATE POLICY "problems_delete_policy" 
  ON problems FOR DELETE 
  USING (auth.uid() = user_id);

  -- ============================================
  -- STEP 7: Update Other Tables
  -- ============================================

  -- Events
  DROP POLICY IF EXISTS "Public read access" ON events;
  DROP POLICY IF EXISTS "Authenticated insert" ON events;
  DROP POLICY IF EXISTS "Users update own" ON events;

  CREATE POLICY "events_select_policy" ON events FOR SELECT USING (true);
  CREATE POLICY "events_insert_policy" ON events FOR INSERT WITH CHECK (auth.uid() = user_id);
  CREATE POLICY "events_update_policy" ON events FOR UPDATE USING (auth.uid() = user_id);
  CREATE POLICY "events_delete_policy" ON events FOR DELETE USING (auth.uid() = user_id);

  -- Forum Topics
  DROP POLICY IF EXISTS "Public read access" ON forum_topics;
  DROP POLICY IF EXISTS "Authenticated insert" ON forum_topics;
  DROP POLICY IF EXISTS "Users update own" ON forum_topics;

  CREATE POLICY "forum_topics_select_policy" ON forum_topics FOR SELECT USING (true);
  CREATE POLICY "forum_topics_insert_policy" ON forum_topics FOR INSERT WITH CHECK (auth.uid() = user_id);
  CREATE POLICY "forum_topics_update_policy" ON forum_topics FOR UPDATE USING (auth.uid() = user_id);
  CREATE POLICY "forum_topics_delete_policy" ON forum_topics FOR DELETE USING (auth.uid() = user_id);

  -- ============================================
  -- STEP 8: Add Helper Function
  -- ============================================

  -- Function to check if user has completed onboarding
  CREATE OR REPLACE FUNCTION has_completed_onboarding(user_id UUID)
  RETURNS BOOLEAN AS $$
  BEGIN
    RETURN EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = user_id AND role IS NOT NULL
    );
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  -- ============================================
  -- MIGRATION COMPLETE
  -- ============================================
  -- Next steps:
  -- 1. Deploy updated middleware.ts
  -- 2. Deploy updated AuthContext.js
  -- 3. Test the onboarding flow
  -- ============================================
