-- Supabase SQL Schema for AvoraHub
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Startups Table
CREATE TABLE IF NOT EXISTS startups (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tagline TEXT,
    description TEXT,
    category VARCHAR(100),
    country VARCHAR(10),
    stage VARCHAR(50),
    website VARCHAR(255),
    logo_url VARCHAR(500),
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    founded_year INTEGER,
    team_size VARCHAR(50),
    funding VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- Problems Table
CREATE TABLE IF NOT EXISTS problems (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    country_code VARCHAR(10),
    country_name VARCHAR(100),
    votes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    author VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- Investors Table
CREATE TABLE IF NOT EXISTS investors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    location VARCHAR(255),
    avatar VARCHAR(10),
    verified BOOLEAN DEFAULT false,
    bio TEXT,
    expertise TEXT[],
    ticket_size VARCHAR(100),
    stage TEXT[],
    geography TEXT[],
    total_investments INTEGER DEFAULT 0,
    active_deals INTEGER DEFAULT 0,
    exits INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE,
    time VARCHAR(50),
    location VARCHAR(255),
    event_type VARCHAR(50),
    attendees INTEGER DEFAULT 0,
    max_attendees INTEGER,
    speakers TEXT[],
    image_url VARCHAR(500),
    registration_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    company_logo VARCHAR(500),
    location VARCHAR(255),
    job_type VARCHAR(50),
    salary_range VARCHAR(100),
    description TEXT,
    requirements TEXT[],
    benefits TEXT[],
    apply_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- Forum Topics Table
CREATE TABLE IF NOT EXISTS forum_topics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category VARCHAR(100),
    author VARCHAR(255),
    author_avatar VARCHAR(10),
    replies INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT false,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- User Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    full_name VARCHAR(255),
    avatar_url VARCHAR(500),
    bio TEXT,
    website VARCHAR(255),
    location VARCHAR(255),
    user_type VARCHAR(50) DEFAULT 'user',
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies: Everyone can read
CREATE POLICY "Public read access" ON startups FOR SELECT USING (true);
CREATE POLICY "Public read access" ON problems FOR SELECT USING (true);
CREATE POLICY "Public read access" ON investors FOR SELECT USING (true);
CREATE POLICY "Public read access" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access" ON jobs FOR SELECT USING (true);
CREATE POLICY "Public read access" ON forum_topics FOR SELECT USING (true);
CREATE POLICY "Public read access" ON profiles FOR SELECT USING (true);

-- Policies: Authenticated users can insert
CREATE POLICY "Authenticated insert" ON startups FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated insert" ON problems FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated insert" ON events FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated insert" ON jobs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated insert" ON forum_topics FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Policies: Users can update their own records
CREATE POLICY "Users update own" ON startups FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users update own" ON problems FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users update own" ON events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users update own" ON jobs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users update own" ON forum_topics FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Function to increment startup votes
CREATE OR REPLACE FUNCTION increment_startup_votes(startup_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE startups SET likes = likes + 1 WHERE id = startup_id;
END;
$$ LANGUAGE plpgsql;

-- Function to increment problem votes
CREATE OR REPLACE FUNCTION increment_problem_votes(problem_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE problems SET votes = votes + 1 WHERE id = problem_id;
END;
$$ LANGUAGE plpgsql;

-- Create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO profiles (id, full_name, avatar_url)
    VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();
