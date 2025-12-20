import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        if (!supabase) {
            return NextResponse.json([]);
        }

        const { data, error } = await supabase
            .from('forum_topics')
            .select('*')
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
