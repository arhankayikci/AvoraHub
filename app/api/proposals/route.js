import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const problemId = searchParams.get('problemId');
        const userId = searchParams.get('userId');

        let proposals = db.proposals.getAll();

        if (problemId) {
            proposals = proposals.filter(p => p.problemId == problemId);
        }

        if (userId) {
            proposals = proposals.filter(p => p.userId === userId);
        }

        // Sort by newest
        proposals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return NextResponse.json(proposals);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        if (!body.problemId || !body.userId || !body.solution) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newProposal = db.proposals.create({
            problemId: body.problemId,
            userId: body.userId,
            solution: body.solution,
            timeline: body.timeline || '',
            teamMembers: body.teamMembers || [],
            requiredRoles: body.requiredRoles || [],
            estimatedBudget: body.estimatedBudget || null,
            status: 'submitted'
        });

        return NextResponse.json(newProposal, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
