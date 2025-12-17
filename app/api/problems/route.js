import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const country = searchParams.get('country');
        const search = searchParams.get('search');
        const sort = searchParams.get('sort');

        let problems = db.problems.getAll();

        // Filter by Category
        if (category && category !== 'all') {
            problems = problems.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }

        // Filter by Country
        if (country && country !== 'all') {
            problems = problems.filter(p => p.country === country);
        }

        // Filter by Search
        if (search) {
            const query = search.toLowerCase();
            problems = problems.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        // Sorting
        if (sort) {
            switch (sort) {
                case 'newest':
                    problems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                case 'votes':
                    problems.sort((a, b) => b.votes - a.votes);
                    break;
                case 'discussed':
                    problems.sort((a, b) => b.comments - a.comments);
                    break;
                default: // Trending (mix of votes and recency - simplified here as votes)
                    problems.sort((a, b) => b.votes - a.votes);
            }
        }

        return NextResponse.json(problems);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.title || !body.description || !body.category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newProblem = db.problems.create(body);
        return NextResponse.json(newProblem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
