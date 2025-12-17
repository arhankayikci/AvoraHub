// Services Index
// Database entegrasyonu için merkezi servis noktası

export * from './problemService';
export * from './startupService';
export * from './mentorService';

// Database config - burada yapılacak
export const DB_CONFIG = {
    provider: 'mock', // 'supabase' | 'firebase' | 'prisma' | 'mock'
    // supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    // supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

/**
 * Database bağlantı durumu (mock)
 */
export async function checkDatabaseConnection() {
    // Mock implementation
    return {
        connected: true,
        provider: DB_CONFIG.provider,
        message: 'Mock database is working'
    };
}
