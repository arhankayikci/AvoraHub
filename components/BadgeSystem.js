"use client";

// Rozet türleri ve özellikleri
export const BADGE_TYPES = {
    // Kullanıcı Rolleri
    HUNTER: {
        id: 'hunter',
        name: 'Hunter',
        icon: '🎯',
        color: '#0B4F3B',
        description: 'Problem ve startup avcısı',
        requirement: 'İlk içerik paylaşımı'
    },
    FOUNDER: {
        id: 'founder',
        name: 'Founder',
        icon: '🚀',
        color: '#1B6B54',
        description: 'Startup kurucusu',
        requirement: 'Startup kaydı'
    },
    INVESTOR: {
        id: 'investor',
        name: 'Yatırımcı',
        icon: '💰',
        color: '#D4AF37',
        description: 'Aktif yatırımcı',
        requirement: 'Yatırımcı profili'
    },

    // Aktivite Rozetleri
    TOP_VOTER: {
        id: 'top_voter',
        name: 'Top Voter',
        icon: '⬆️',
        color: '#2E8B70',
        description: 'En aktif oylayan',
        requirement: '100+ oy'
    },
    EARLY_ADOPTER: {
        id: 'early_adopter',
        name: 'Öncü',
        icon: '⭐',
        color: '#F59E0B',
        description: 'İlk 1000 kullanıcı',
        requirement: 'Erken kayıt'
    },
    PROBLEM_SOLVER: {
        id: 'problem_solver',
        name: 'Çözümcü',
        icon: '💡',
        color: '#8B5CF6',
        description: 'Problem çözücü',
        requirement: '5+ çözüm önerisi'
    },

    // Streak Rozetleri
    STREAK_7: {
        id: 'streak_7',
        name: '7 Gün',
        icon: '🔥',
        color: '#EF4444',
        description: '7 günlük seri',
        requirement: '7 gün üst üste giriş'
    },
    STREAK_30: {
        id: 'streak_30',
        name: '30 Gün',
        icon: '🔥',
        color: '#F97316',
        description: '30 günlük seri',
        requirement: '30 gün üst üste giriş'
    },

    // Başarı Rozetleri
    TRENDING: {
        id: 'trending',
        name: 'Trending',
        icon: '📈',
        color: '#06B6D4',
        description: 'Trend olan içerik sahibi',
        requirement: 'Top 10 içerik'
    },
    VERIFIED: {
        id: 'verified',
        name: 'Doğrulanmış',
        icon: '✓',
        color: '#10B981',
        description: 'Doğrulanmış hesap',
        requirement: 'Kimlik doğrulama'
    }
};

export const FEATURED_BADGES = {
    STARTUP_OF_DAY: {
        id: 'startup_of_day',
        name: 'Günün Startup\'ı',
        icon: '🏆',
        color: '#D4AF37',
        gradient: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)'
    },
    PROBLEM_OF_DAY: {
        id: 'problem_of_day',
        name: 'Günün Problemi',
        icon: '🎯',
        color: '#0B4F3B',
        gradient: 'linear-gradient(135deg, #0B4F3B 0%, #2E8B70 100%)'
    }
};

// Kullanıcının rozetlerini hesapla
export function calculateUserBadges(user) {
    const badges = [];

    // Rol bazlı rozetler
    if (user?.profileType === 'startup') {
        badges.push(BADGE_TYPES.FOUNDER);
    }
    if (user?.profileType === 'investor') {
        badges.push(BADGE_TYPES.INVESTOR);
    }

    // Aktivite bazlı
    if (user?.totalVotes >= 100) {
        badges.push(BADGE_TYPES.TOP_VOTER);
    }
    if (user?.isEarlyAdopter) {
        badges.push(BADGE_TYPES.EARLY_ADOPTER);
    }
    if (user?.solutionsCount >= 5) {
        badges.push(BADGE_TYPES.PROBLEM_SOLVER);
    }

    // Streak bazlı
    if (user?.currentStreak >= 30) {
        badges.push(BADGE_TYPES.STREAK_30);
    } else if (user?.currentStreak >= 7) {
        badges.push(BADGE_TYPES.STREAK_7);
    }

    // Başarı bazlı
    if (user?.hasTrendingContent) {
        badges.push(BADGE_TYPES.TRENDING);
    }
    if (user?.isVerified) {
        badges.push(BADGE_TYPES.VERIFIED);
    }

    return badges;
}

export default BADGE_TYPES;
