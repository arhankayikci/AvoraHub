import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const DEMO_PROBLEMS = [
    {
        title: 'Elektrikli araç şarj istasyonu eksikliği',
        description: 'Türkiye\'nin büyük şehirlerinde elektrikli araçların şarj edilebileceği yeterli istasyon yok.',
        category: 'Ulaşım',
        country_code: 'TR',
        country_name: 'Türkiye',
        author: 'Demo User',
        votes: 342
    },
    {
        title: 'Gıda israfı sorunu',
        description: 'Restoranlar ve marketlerde günlük tonlarca yiyecek çöpe gidiyor.',
        category: 'Sosyal',
        country_code: 'TR',
        country_name: 'Türkiye',
        author: 'Demo User',
        votes: 287
    },
    {
        title: 'Sağlık randevu sistemi verimsizliği',
        description: 'Hastanelerde randevu almak ve takip etmek çok zor.',
        category: 'Sağlık',
        country_code: 'TR',
        country_name: 'Türkiye',
        author: 'Demo User',
        votes: 198
    }
];

const DEMO_STARTUPS = [
    {
        name: 'ChargeHub',
        tagline: 'Elektrikli araç şarj ağı platformu',
        description: 'Türkiye\'nin en kapsamlı EV şarj istasyonu haritası ve rezervasyon sistemi.',
        category: 'Ulaşım',
        stage: 'Seed',
        country: 'TR',
        website: 'https://chargehub.example.com',
        votes: 156
    },
    {
        name: 'FoodSaver',
        tagline: 'Fazla yiyecekleri değerlendir',
        description: 'Restoran ve marketlerdeki fazla yiyecekleri indirimli fiyata sunan platform.',
        category: 'Sosyal',
        stage: 'MVP',
        country: 'TR',
        website: 'https://foodsaver.example.com',
        votes: 234
    },
    {
        name: 'HealthSync',
        tagline: 'Akıllı sağlık randevu asistanı',
        description: 'Yapay zeka destekli randevu yönetimi ve sağlık takip uygulaması.',
        category: 'Sağlık',
        stage: 'Pre-Seed',
        country: 'TR',
        website: 'https://healthsync.example.com',
        votes: 178
    }
];

export async function POST() {
    try {
        if (!supabase) {
            return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
        }

        // Insert demo problems
        const { data: problemsData, error: problemsError } = await supabase
            .from('problems')
            .insert(DEMO_PROBLEMS)
            .select();

        if (problemsError) {
            console.error('Error inserting demo problems:', problemsError);
        }

        // Insert demo startups
        const { data: startupsData, error: startupsError } = await supabase
            .from('startups')
            .insert(DEMO_STARTUPS)
            .select();

        if (startupsError) {
            console.error('Error inserting demo startups:', startupsError);
        }

        return NextResponse.json({
            success: true,
            problems: problemsData?.length || 0,
            startups: startupsData?.length || 0,
            message: 'Demo veriler başarıyla yüklendi!'
        });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
