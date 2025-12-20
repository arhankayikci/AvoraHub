import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
    try {
        // Check if Supabase is configured
        if (!supabase) {
            console.warn('Supabase not configured');
            return NextResponse.json([]);
        }

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const country = searchParams.get('country');
        const stage = searchParams.get('stage');
        const search = searchParams.get('search');
        const sort = searchParams.get('sort') || 'popular';

        let query = supabase
            .from('startups')
            .select('*');

        // Filter by Category
        if (category && category !== 'all') {
            query = query.ilike('category', category);
        }

        // Filter by Country
        if (country && country !== 'all') {
            query = query.eq('country', country);
        }

        // Filter by Stage
        if (stage && stage !== 'all') {
            query = query.eq('stage', stage);
        }

        // Filter by Search
        if (search) {
            query = query.or(`name.ilike.%${search}%,tagline.ilike.%${search}%`);
        }

        // Sorting
        switch (sort) {
            case 'newest':
                query = query.order('created_at', { ascending: false });
                break;
            case 'popular':
                query = query.order('likes', { ascending: false });
                break;
            case 'discussed':
                query = query.order('comments', { ascending: false });
                break;
            default:
                query = query.order('likes', { ascending: false });
        }

        const { data, error } = await query;

        if (error) {
            console.error('Supabase error:', error);
            // Return empty array with 200 to prevent infinite loading
            return NextResponse.json([]);
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('API error:', error);
        // Return empty array with 200 to prevent infinite loading
        return NextResponse.json([]);
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.tagline) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('startups')
            .insert([{
                name: body.name,
                tagline: body.tagline,
                description: body.description || '',
                category: body.category || 'Teknoloji',
                country: body.country || 'TR',
                stage: body.stage || 'Seed',
                website: body.website || '',
                likes: 0,
                comments: 0,
                featured: false
            }])
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
