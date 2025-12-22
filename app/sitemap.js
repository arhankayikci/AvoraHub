import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://avorahub.com.tr';

export default async function sitemap() {
    // Static routes
    const staticRoutes = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/startups`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/jobs`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/problems`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/mentors`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/events`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/forum`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    // If no Supabase, return only static routes
    if (!supabase) {
        return staticRoutes;
    }

    // Fetch all dynamic content IDs
    const [startupsRes, jobsRes, problemsRes, mentorsRes] = await Promise.all([
        supabase.from('startups').select('id, updated_at'),
        supabase.from('jobs').select('id, created_at'),
        supabase.from('problems').select('id, updated_at'),
        supabase.from('investors').select('id, created_at'),
    ]);

    // Generate startup routes
    const startupRoutes = (startupsRes.data || []).map((startup) => ({
        url: `${BASE_URL}/startups/${startup.id}`,
        lastModified: startup.updated_at ? new Date(startup.updated_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // Generate job routes
    const jobRoutes = (jobsRes.data || []).map((job) => ({
        url: `${BASE_URL}/jobs/${job.id}`,
        lastModified: job.created_at ? new Date(job.created_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // Generate problem routes
    const problemRoutes = (problemsRes.data || []).map((problem) => ({
        url: `${BASE_URL}/problems/${problem.id}`,
        lastModified: problem.updated_at ? new Date(problem.updated_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    // Generate mentor routes
    const mentorRoutes = (mentorsRes.data || []).map((mentor) => ({
        url: `${BASE_URL}/mentors/${mentor.id}`,
        lastModified: mentor.created_at ? new Date(mentor.created_at) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [
        ...staticRoutes,
        ...startupRoutes,
        ...jobRoutes,
        ...problemRoutes,
        ...mentorRoutes,
    ];
}
