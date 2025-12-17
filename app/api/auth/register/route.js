import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request) {
    try {
        const { name, email, password, userType, interests } = await request.json();

        // Basic validation
        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Tüm alanlar zorunludur' }, { status: 400 });
        }

        // Validate userType
        const validTypes = ['entrepreneur', 'problem-owner', 'investor', 'solution-seeker'];
        if (!userType || !validTypes.includes(userType)) {
            return NextResponse.json({ error: 'Geçerli bir profil tipi seçmelisiniz' }, { status: 400 });
        }

        // Check if user exists
        const existingUser = db.users.findByEmail(email);
        if (existingUser) {
            return NextResponse.json({ error: 'Bu e-posta adresi zaten kayıtlı' }, { status: 409 });
        }

        // Create user
        // Note: In a real app, you MUST hash the password here (e.g., using bcrypt)
        const newUser = db.users.create({
            name,
            email,
            password, // Storing plain text for this demo ONLY
            avatar: '',
            bio: '',
            userType,
            interests: interests || []
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
