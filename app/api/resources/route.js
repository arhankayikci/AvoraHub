import { NextResponse } from 'next/server';

export async function GET() {
    // Resources tablosu henüz oluşturulmamış, boş dizi döndür
    return NextResponse.json([]);
}
