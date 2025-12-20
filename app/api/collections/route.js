import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        if (!supabase) {
            console.warn('Supabase not configured');
            return NextResponse.json([]);
        }

        const { data, error } = await supabase
            .from('collections')
            .select(`
                *,
                collection_items (
                    id,
                    startup_id,
                    added_at,
                    startups (
                        id,
                        name,
                        tagline,
                        logo_url,
                        votes
                    )
                )
            `)
            .eq('is_public', true)
            .order('created_at', { ascending: false });

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
