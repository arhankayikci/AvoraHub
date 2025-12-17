import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'E-posta ve şifre gereklidir' }, { status: 400 });
        }

        const user = db.users.findByEmail(email);

        // Verify password (simple comparison for demo)
        if (!user || user.password !== password) {
            return NextResponse.json({ error: 'Geçersiz e-posta veya şifre' }, { status: 401 });
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        // In a real app, you would generate a JWT token here and set it as a cookie

        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
