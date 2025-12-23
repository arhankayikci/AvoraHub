import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            return NextResponse.json([]);
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('published_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json([]);
        }

        // Format data for frontend compatibility
        const formattedNews = (data || []).map(item => ({
            id: item.id,
            title: item.title,
            excerpt: item.summary,
            content: item.content,
            category: item.category,
            author: item.author,
            image: item.image_url,
            date: new Date(item.published_at).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }),
            readTime: Math.ceil((item.content?.length || 500) / 1000) + ' dk',
            views: item.views,
            featured: item.views > 10000
        }));

        return NextResponse.json(formattedNews);
    } catch (error) {
        console.error('News API error:', error);
        return NextResponse.json([]);
    }
}

