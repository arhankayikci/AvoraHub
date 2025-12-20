import { NextResponse } from 'next/server';

export async function GET() {
    // News tablosu henüz oluşturulmamış, boş dizi döndür
    return NextResponse.json([]);
}
