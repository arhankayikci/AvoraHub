-- ===============================================
-- AvoraHub - Complete Database Schema
-- Run this in Supabase SQL Editor
-- ===============================================

-- 1. JOBS TABLE
-- ===============================================
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    company_logo TEXT,
    description TEXT,
    location TEXT,
    type TEXT, -- 'Tam Zamanlı', 'Yarı Zamanlı', 'Uzaktan', 'Staj'
    salary_min INTEGER,
    salary_max INTEGER,
    tags TEXT[],
    required_skills TEXT[],
    benefits TEXT[],
    apply_url TEXT,
    posted_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    views INTEGER DEFAULT 0,
    applications INTEGER DEFAULT 0
);

-- Jobs RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active jobs"
ON jobs FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "Authenticated users can create jobs"
ON jobs FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update their own jobs"
ON jobs FOR UPDATE
TO authenticated
USING (posted_by = auth.uid());

-- Jobs Indexes
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company);
CREATE INDEX IF NOT EXISTS idx_jobs_type ON jobs(type);


-- 2. EXPAND STARTUPS TABLE
-- ===============================================
ALTER TABLE startups ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS founded_year INTEGER;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS team_size TEXT;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS funding_amount BIGINT;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS funding_stage TEXT;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE startups ADD COLUMN IF NOT EXISTS tech_stack TEXT[];
ALTER TABLE startups ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS votes INTEGER DEFAULT 0;


-- 3. FUNDING ROUNDS TABLE
-- ===============================================
CREATE TABLE IF NOT EXISTS funding_rounds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
    round_type TEXT NOT NULL,
    amount BIGINT,
    currency TEXT DEFAULT 'TRY',
    announced_date DATE,
    lead_investor TEXT,
    investors TEXT[],
    valuation BIGINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Funding RLS
ALTER TABLE funding_rounds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read funding rounds"
ON funding_rounds FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can create funding rounds"
ON funding_rounds FOR INSERT
TO authenticated
WITH CHECK (true);

-- Funding Indexes
CREATE INDEX IF NOT EXISTS idx_funding_startup_id ON funding_rounds(startup_id);
CREATE INDEX IF NOT EXISTS idx_funding_announced_date ON funding_rounds(announced_date DESC);


-- 4. COLLECTIONS SYSTEM
-- ===============================================
CREATE TABLE IF NOT EXISTS collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_public BOOLEAN DEFAULT true,
    item_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS collection_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
    startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(collection_id, startup_id)
);

-- Collections RLS
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read public collections"
ON collections FOR SELECT
TO public
USING (is_public = true);

CREATE POLICY "Authenticated users can create collections"
ON collections FOR INSERT
TO authenticated
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own collections"
ON collections FOR UPDATE
TO authenticated
USING (created_by = auth.uid());

CREATE POLICY "Anyone can read collection items"
ON collection_items FOR SELECT
TO public
USING (true);

-- Collections Indexes
CREATE INDEX IF NOT EXISTS idx_collections_created_by ON collections(created_by);
CREATE INDEX IF NOT EXISTS idx_collection_items_collection_id ON collection_items(collection_id);
CREATE INDEX IF NOT EXISTS idx_collection_items_startup_id ON collection_items(startup_id);


-- 5. UPDATE TRIGGER FOR COLLECTION COUNT
-- ===============================================
CREATE OR REPLACE FUNCTION update_collection_item_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE collections
    SET item_count = (
        SELECT COUNT(*)
        FROM collection_items
        WHERE collection_id = COALESCE(NEW.collection_id, OLD.collection_id)
    ),
    updated_at = NOW()
    WHERE id = COALESCE(NEW.collection_id, OLD.collection_id);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_collection_count ON collection_items;
CREATE TRIGGER trigger_update_collection_count
AFTER INSERT OR DELETE ON collection_items
FOR EACH ROW
EXECUTE FUNCTION update_collection_item_count();


-- ===============================================
-- DONE! Tables created with RLS enabled
-- ===============================================
