import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create client with cache disabled for real-time data
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            fetch: (url, options = {}) => {
                return fetch(url, {
                    ...options,
                    cache: 'no-store',
                });
            },
        },
    })
    : null;

// Helper functions
export async function getStartups(filters = {}) {
    if (!supabase) return [];

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
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('startups')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
}

export async function getProblems(filters = {}) {
    if (!supabase) return [];

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
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('investors')
        .select('*')
        .order('total_investments', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function getEvents() {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

    if (error) throw error;
    return data || [];
}

export async function getJobs() {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function getForumTopics() {
    if (!supabase) return [];

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
