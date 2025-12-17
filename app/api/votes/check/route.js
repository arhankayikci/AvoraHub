import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const itemId = searchParams.get('itemId');
        const type = searchParams.get('type') || 'problem';

        if (!userId || !itemId) {
            return NextResponse.json({ error: 'Missing params' }, { status: 400 });
        }

        const hasVoted = db.votes.hasVoted(userId, parseInt(itemId), type);
        return NextResponse.json({ hasVoted });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
