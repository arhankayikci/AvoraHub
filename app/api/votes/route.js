import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const itemId = searchParams.get('itemId');
        const itemType = searchParams.get('itemType') || 'problem';

        // Check if user has voted
        if (userId && itemId) {
            const hasVoted = db.votes.hasVoted(userId, itemId, itemType);
            return NextResponse.json({ hasVoted });
        }

        // Get vote count for item
        if (itemId) {
            const count = db.votes.getVoteCount(itemId, itemType);
            return NextResponse.json({ count });
        }

        return NextResponse.json({ error: 'itemId is required' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { userId, itemId, itemType } = await request.json();

        if (!userId || !itemId) {
            return NextResponse.json(
                { error: 'userId and itemId are required' },
                { status: 400 }
            );
        }

        const type = itemType || 'problem';

        if (!['problem', 'startup'].includes(type)) {
            return NextResponse.json(
                { error: 'itemType must be either "problem" or "startup"' },
                { status: 400 }
            );
        }

        const result = db.votes.addVote(userId, itemId, type);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const itemId = searchParams.get('itemId');
        const itemType = searchParams.get('itemType') || 'problem';

        if (!userId || !itemId) {
            return NextResponse.json(
                { error: 'userId and itemId are required' },
                { status: 400 }
            );
        }

        const result = db.votes.removeVote(userId, itemId, itemType);

        if (!result.success) {
            return NextResponse.json({ error: 'Vote not found' }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
