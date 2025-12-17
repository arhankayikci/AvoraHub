import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const itemId = searchParams.get('itemId');
        const itemType = searchParams.get('itemType');

        if (userId && itemId && itemType) {
            // Check if specific item is favorited
            const isFavorited = db.favorites.checkFavorite(userId, itemId, itemType);
            return NextResponse.json({ isFavorited });
        }

        if (userId) {
            // Get all favorites for user
            const favorites = db.favorites.getUserFavorites(userId);
            return NextResponse.json(favorites);
        }

        return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { userId, itemId, itemType } = await request.json();

        if (!userId || !itemId || !itemType) {
            return NextResponse.json(
                { error: 'userId, itemId, and itemType are required' },
                { status: 400 }
            );
        }

        if (!['problem', 'startup'].includes(itemType)) {
            return NextResponse.json(
                { error: 'itemType must be either "problem" or "startup"' },
                { status: 400 }
            );
        }

        const favorite = db.favorites.addFavorite(userId, itemId, itemType);
        return NextResponse.json(favorite, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const itemId = searchParams.get('itemId');
        const itemType = searchParams.get('itemType');

        if (!userId || !itemId || !itemType) {
            return NextResponse.json(
                { error: 'userId, itemId, and itemType are required' },
                { status: 400 }
            );
        }

        const removed = db.favorites.removeFavorite(userId, itemId, itemType);

        if (!removed) {
            return NextResponse.json({ error: 'Favorite not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, removed });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
