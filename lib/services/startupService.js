// Startup Service
// Database entegrasyonunda sadece bu dosya değişecek

import { DEMO_STARTUPS, STARTUP_CATEGORIES, STARTUP_STAGES } from '@/lib/data/startups';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Tüm startup'ları getir
 */
export async function getStartups({ category, stage, sort, limit, featured } = {}) {
    await delay(100);

    let startups = [...DEMO_STARTUPS];

    // Featured filtresi
    if (featured) {
        startups = startups.filter(s => s.featured);
    }

    // Kategori filtresi
    if (category && category !== 'Tümü') {
        startups = startups.filter(s => s.category === category);
    }

    // Stage filtresi
    if (stage && stage !== 'Tümü') {
        startups = startups.filter(s => s.stage === stage);
    }

    // Sıralama
    if (sort === 'votes') {
        startups.sort((a, b) => b.votes - a.votes);
    } else if (sort === 'newest') {
        startups.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Limit
    if (limit) {
        startups = startups.slice(0, limit);
    }

    return startups;
}

/**
 * Tek startup getir
 */
export async function getStartupById(id) {
    await delay(50);
    return DEMO_STARTUPS.find(s => s.id === parseInt(id)) || null;
}

/**
 * Kategorileri getir
 */
export async function getStartupCategories() {
    return STARTUP_CATEGORIES;
}

/**
 * Aşamaları getir
 */
export async function getStartupStages() {
    return STARTUP_STAGES;
}

/**
 * Yeni startup oluştur
 */
export async function createStartup(data) {
    await delay(200);

    if (!data.name || !data.tagline) {
        return { success: false, error: 'İsim ve tagline gerekli' };
    }

    const newId = DEMO_STARTUPS.length + 1;
    console.log('New startup created (mock):', { id: newId, ...data });

    return { success: true, id: newId };
}

/**
 * Startup oyla
 */
export async function voteStartup(id, userId) {
    await delay(100);
    console.log('Vote startup (mock):', { startupId: id, userId });
    return { success: true };
}

/**
 * Startup ara
 */
export async function searchStartups(query) {
    await delay(100);

    if (!query) return [];

    const lowerQuery = query.toLowerCase();
    return DEMO_STARTUPS.filter(s =>
        s.name.toLowerCase().includes(lowerQuery) ||
        s.tagline.toLowerCase().includes(lowerQuery) ||
        s.tags.some(t => t.toLowerCase().includes(lowerQuery))
    );
}
