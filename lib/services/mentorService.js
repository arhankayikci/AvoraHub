// Mentor Service
// Database entegrasyonunda sadece bu dosya değişecek

import { DEMO_MENTORS, EXPERTISE_AREAS, MENTOR_INDUSTRIES } from '@/lib/data/mentors';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Tüm mentorları getir
 */
export async function getMentors({ expertise, industry, freeOnly, sort, limit } = {}) {
    await delay(100);

    let mentors = [...DEMO_MENTORS];

    // Uzmanlık filtresi
    if (expertise && expertise !== 'Tümü') {
        mentors = mentors.filter(m =>
            m.expertise.some(e => e.includes(expertise))
        );
    }

    // Sektör filtresi
    if (industry && industry !== 'Tümü') {
        mentors = mentors.filter(m =>
            m.industries.some(i => i.includes(industry) || i === 'Tümü')
        );
    }

    // Ücretsiz filtresi
    if (freeOnly) {
        mentors = mentors.filter(m => m.price === 0);
    }

    // Sıralama
    if (sort === 'rating') {
        mentors.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'mentees') {
        mentors.sort((a, b) => b.mentees - a.mentees);
    } else if (sort === 'featured') {
        mentors.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    // Limit
    if (limit) {
        mentors = mentors.slice(0, limit);
    }

    return mentors;
}

/**
 * Tek mentor getir
 */
export async function getMentorById(id) {
    await delay(50);
    return DEMO_MENTORS.find(m => m.id === parseInt(id)) || null;
}

/**
 * Uzmanlık alanlarını getir
 */
export async function getExpertiseAreas() {
    return EXPERTISE_AREAS;
}

/**
 * Sektörleri getir
 */
export async function getMentorIndustries() {
    return MENTOR_INDUSTRIES;
}

/**
 * Randevu oluştur
 */
export async function createBooking(data) {
    await delay(200);

    if (!data.mentorId || !data.date || !data.time) {
        return { success: false, error: 'Mentor, tarih ve saat gerekli' };
    }

    const bookingId = Math.random().toString(36).substr(2, 9);
    console.log('New booking created (mock):', { id: bookingId, ...data });

    return { success: true, bookingId };
}

/**
 * Mentor başvurusu yap
 */
export async function applyAsMentor(data) {
    await delay(300);

    if (!data.name || !data.expertise || !data.bio) {
        return { success: false, error: 'Eksik bilgiler var' };
    }

    console.log('Mentor application (mock):', data);
    return { success: true, message: 'Başvurunuz alındı' };
}
