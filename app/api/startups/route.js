import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const country = searchParams.get('country');
        const stage = searchParams.get('stage');
        const search = searchParams.get('search');
        const sort = searchParams.get('sort');

        let startups = db.startups.getAll();

        // Filter by Category
        if (category && category !== 'all') {
            startups = startups.filter(s => s.category.toLowerCase() === category.toLowerCase());
        }

        // Filter by Country
        if (country && country !== 'all') {
            startups = startups.filter(s => s.country === country);
        }

        // Filter by Stage
        if (stage && stage !== 'all') {
            startups = startups.filter(s => s.stage === stage);
        }

        // Filter by Search
        if (search) {
            const query = search.toLowerCase();
            startups = startups.filter(s =>
                s.name.toLowerCase().includes(query) ||
                s.tagline.toLowerCase().includes(query)
            );
        }

        // Sorting
        if (sort) {
            switch (sort) {
                case 'newest':
                    startups.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                case 'popular': // Likes
                    startups.sort((a, b) => b.likes - a.likes);
                    break;
                case 'funding': // Simplified funding sort (parsing string to number would be needed for real sort)
                    // For now, just string sort or keep as is
                    break;
                case 'discussed':
                    startups.sort((a, b) => b.comments - a.comments);
                    break;
                default:
                    startups.sort((a, b) => b.likes - a.likes);
            }
        }

        return NextResponse.json(startups);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.tagline || !body.description || !body.authorId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newStartup = db.startups.create(body);
        return NextResponse.json(newStartup, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
