import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        if (!supabase) {
            console.warn('Supabase not configured');
            return NextResponse.json([]);
        }

        const { data, error } = await supabase
            .from('funding_rounds')
            .select(`
                *,
                startups (
                    id,
                    name,
                    logo_url,
                    category,
                    tagline
                )
            `)
            .order('announced_date', { ascending: false });

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
            .from('funding_rounds')
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
