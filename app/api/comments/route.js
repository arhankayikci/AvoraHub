import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const itemId = searchParams.get('itemId');
        const itemType = searchParams.get('itemType');

        let comments = db.comments.getAll();

        if (itemId && itemType) {
            comments = comments.filter(c =>
                c.itemId == itemId && c.itemType === itemType
            );
        }

        // Sort by newest
        comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        if (!body.content || !body.itemId || !body.authorId || !body.itemType) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newComment = db.comments.create({
            content: body.content,
            itemId: body.itemId,
            itemType: body.itemType,
            authorId: body.authorId,
            author: body.author,
            avatar: body.avatar || '',
            likes: 0
        });

        // Update comment count on problem or startup
        if (body.itemType === 'problem') {
            const problem = db.problems.getById(body.itemId);
            if (problem) {
                db.problems.update(body.itemId, { comments: (problem.comments || 0) + 1 });
            }
        } else if (body.itemType === 'startup') {
            const startup = db.startups.getById(body.itemId);
            if (startup) {
                db.startups.update(body.itemId, { comments: (startup.comments || 0) + 1 });
            }
        }

        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
