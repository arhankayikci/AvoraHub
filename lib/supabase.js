import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Helper functions
export async function getStartups(filters = {}) {
    let query = supabase
        .from('startups')
        .select('*')
        .order('created_at', { ascending: false });

    if (filters.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
    }
    if (filters.country && filters.country !== 'all') {
        query = query.eq('country', filters.country);
    }
    if (filters.stage && filters.stage !== 'all') {
        query = query.eq('stage', filters.stage);
    }
    if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
}

export async function getStartupById(id) {
    const { data, error } = await supabase
        .from('startups')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
}

export async function getProblems(filters = {}) {
    let query = supabase
        .from('problems')
        .select('*')
        .order('votes', { ascending: false });

    if (filters.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
    }
    if (filters.country && filters.country !== 'all') {
        query = query.eq('country_code', filters.country);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
}

export async function getInvestors() {
    const { data, error } = await supabase
        .from('investors')
        .select('*')
        .order('total_investments', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function getEvents() {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

    if (error) throw error;
    return data || [];
}

export async function getJobs() {
    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function getForumTopics() {
    const { data, error } = await supabase
        .from('forum_topics')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

// Create functions
export async function createStartup(startup) {
    const { data, error } = await supabase
        .from('startups')
        .insert([startup])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function createProblem(problem) {
    const { data, error } = await supabase
        .from('problems')
        .insert([problem])
        .select()
        .single();

    if (error) throw error;
    return data;
}

// Vote functions
export async function voteStartup(id) {
    const { data, error } = await supabase.rpc('increment_startup_votes', { startup_id: id });
    if (error) throw error;
    return data;
}

export async function voteProblem(id) {
    const { data, error } = await supabase.rpc('increment_problem_votes', { problem_id: id });
    if (error) throw error;
    return data;
}
