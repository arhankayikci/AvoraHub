import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
    try {
        if (!supabase) {
            console.warn('Supabase not configured');
            return NextResponse.json([]);
        }

        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const location = searchParams.get('location');
        const search = searchParams.get('search');

        let query = supabase
            .from('jobs')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        // Filter by type
        if (type && type !== 'all') {
            query = query.eq('type', type);
        }

        // Filter by location
        if (location && location !== 'all') {
            query = query.ilike('location', `%${location}%`);
        }

        // Search
        if (search) {
            query = query.or(`title.ilike.%${search}%,company.ilike.%${search}%,description.ilike.%${search}%`);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json([]);
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json([]);
    }
}

export async function POST(request) {
    try {
        if (!supabase) {
            return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
        }

        const body = await request.json();

        const { data, error } = await supabase
            .from('jobs')
            .insert([body])
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
