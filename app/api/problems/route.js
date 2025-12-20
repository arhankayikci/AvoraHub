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
        const search = searchParams.get('search');
        const sort = searchParams.get('sort') || 'votes';

        let query = supabase
            .from('problems')
            .select('*');

        // Filter by Category
        if (category && category !== 'all') {
            query = query.ilike('category', category);
        }

        // Filter by Country
        if (country && country !== 'all') {
            query = query.eq('country_code', country);
        }

        // Filter by Search
        if (search) {
            query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
        }

        // Sorting
        switch (sort) {
            case 'newest':
                query = query.order('created_at', { ascending: false });
                break;
            case 'votes':
                query = query.order('votes', { ascending: false });
                break;
            case 'discussed':
                query = query.order('comments', { ascending: false });
                break;
            default:
                query = query.order('votes', { ascending: false });
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

        if (!body.title || !body.description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('problems')
            .insert([{
                title: body.title,
                description: body.description,
                category: body.category || 'Genel',
                country_code: body.country_code || 'TR',
                country_name: body.country_name || 'Türkiye',
                author: body.author || 'Anonim',
                votes: 0,
                comments: 0
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
