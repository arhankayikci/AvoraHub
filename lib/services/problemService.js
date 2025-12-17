// Problem Service
// Database entegrasyonunda sadece bu dosya değişecek

import { DEMO_PROBLEMS, PROBLEM_CATEGORIES } from '@/lib/data/problems';

// Simüle edilmiş API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Tüm problemleri getir
 */
export async function getProblems({ category, sort, limit } = {}) {
    await delay(100); // Simulated network delay

    let problems = [...DEMO_PROBLEMS];

    // Kategori filtresi
    if (category && category !== 'Tümü') {
        problems = problems.filter(p => p.category === category);
    }

    // Sıralama
    if (sort === 'votes') {
        problems.sort((a, b) => b.votes - a.votes);
    } else if (sort === 'newest') {
        problems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'comments') {
        problems.sort((a, b) => b.comments - a.comments);
    }

    // Limit
    if (limit) {
        problems = problems.slice(0, limit);
    }

    return problems;
}

/**
 * Tek problem getir
 */
export async function getProblemById(id) {
    await delay(50);
    return DEMO_PROBLEMS.find(p => p.id === parseInt(id)) || null;
}

/**
 * Problem kategorilerini getir
 */
export async function getProblemCategories() {
    return PROBLEM_CATEGORIES;
}

/**
 * Yeni problem oluştur
 * @returns {Promise<{success: boolean, id?: number, error?: string}>}
 */
export async function createProblem(data) {
    await delay(200);

    // Validasyon
    if (!data.title || !data.description) {
        return { success: false, error: 'Başlık ve açıklama gerekli' };
    }

    // Mock: Gerçek DB'de insert yapılacak
    const newId = DEMO_PROBLEMS.length + 1;
    console.log('New problem created (mock):', { id: newId, ...data });

    return { success: true, id: newId };
}

/**
 * Problem oyla
 */
export async function voteProblem(id, userId) {
    await delay(100);
    console.log('Vote problem (mock):', { problemId: id, userId });
    return { success: true };
}

/**
 * Problem ara
 */
export async function searchProblems(query) {
    await delay(100);

    if (!query) return [];

    const lowerQuery = query.toLowerCase();
    return DEMO_PROBLEMS.filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.tags.some(t => t.toLowerCase().includes(lowerQuery))
    );
}
