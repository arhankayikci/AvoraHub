import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request, { params }) {
    try {
        const id = params.id;
        const body = await request.json();
        const userId = body.userId;

        if (!userId) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }

        const problem = db.problems.getById(id);
        if (!problem) {
            return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
        }

        // Check if user already voted
        const hasVoted = db.votes.hasVoted(userId, parseInt(id), 'problem');

        if (hasVoted) {
            // Remove vote
            db.votes.removeVote(userId, parseInt(id), 'problem');
            const updatedProblem = db.problems.update(id, { votes: Math.max(0, problem.votes - 1) });
            return NextResponse.json({ ...updatedProblem, hasVoted: false });
        } else {
            // Add vote
            db.votes.addVote(userId, parseInt(id), 'problem');
            const updatedProblem = db.problems.update(id, { votes: problem.votes + 1 });
            return NextResponse.json({ ...updatedProblem, hasVoted: true });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
