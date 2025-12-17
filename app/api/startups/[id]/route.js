import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request, { params }) {
    try {
        const { id } = await params;  // Await params in Next.js 16
        const startup = db.startups.getById(id);

        if (!startup) {
            return NextResponse.json({ error: 'Startup not found' }, { status: 404 });
        }

        return NextResponse.json(startup);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
