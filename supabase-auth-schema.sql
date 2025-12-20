-- ===============================================
-- AvoraHub - Complete Auth & Ownership Setup
-- Bu SQL tüm tabloları hazırlar
-- ===============================================

-- 1. PROFILES TABLE
-- ===============================================
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS linkedin TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Trigger
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);


-- 2. STARTUPS - ADD OWNER
-- ===============================================
ALTER TABLE startups ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id);

DROP POLICY IF EXISTS "Authenticated users can insert startups" ON startups;
CREATE POLICY "Authenticated users can insert startups"
ON startups FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "Users can update own startups" ON startups;
CREATE POLICY "Users can update own startups"
ON startups FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id);

DROP POLICY IF EXISTS "Users can delete own startups" ON startups;
CREATE POLICY "Users can delete own startups"
ON startups FOR DELETE
TO authenticated
USING (auth.uid() = owner_id);

CREATE INDEX IF NOT EXISTS idx_startups_owner_id ON startups(owner_id);


-- 3. JOBS - ADD POSTED_BY IF NOT EXISTS
-- ===============================================
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS posted_by UUID REFERENCES auth.users(id);

-- Ownership policies
DROP POLICY IF EXISTS "Users can update own jobs" ON jobs;
CREATE POLICY "Users can update own jobs"
ON jobs FOR UPDATE
TO authenticated
USING (auth.uid() = posted_by);

DROP POLICY IF EXISTS "Users can delete own jobs" ON jobs;
CREATE POLICY "Users can delete own jobs"
ON jobs FOR DELETE
TO authenticated
USING (auth.uid() = posted_by);

CREATE INDEX IF NOT EXISTS idx_jobs_posted_by ON jobs(posted_by);


-- 4. PROBLEMS - ADD OWNER
-- ===============================================
ALTER TABLE problems ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id);

DROP POLICY IF EXISTS "Authenticated users can create problems" ON problems;
CREATE POLICY "Authenticated users can create problems"
ON problems FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "Users can update own problems" ON problems;
CREATE POLICY "Users can update own problems"
ON problems FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id);

DROP POLICY IF EXISTS "Users can delete own problems" ON problems;
CREATE POLICY "Users can delete own problems"
ON problems FOR DELETE
TO authenticated
USING (auth.uid() = owner_id);

CREATE INDEX IF NOT EXISTS idx_problems_owner_id ON problems(owner_id);


-- ===============================================
-- ✅ DONE! All tables ready for Auth & Ownership
-- ===============================================
