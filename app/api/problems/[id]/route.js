import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request, { params }) {
    try {
        const { id } = await params;  // Await params in Next.js 16
        const problem = db.problems.getById(id);

        if (!problem) {
            return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
        }

        return NextResponse.json(problem);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
