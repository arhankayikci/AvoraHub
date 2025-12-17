// Mock Data - Problems
// Bu dosya database entegrasyonunda kaldırılacak

export const DEMO_PROBLEMS = [
    {
        id: 1,
        title: 'E-ticaret sitelerinde iade süreci çok karmaşık',
        description: 'Online alışverişlerde iade yapmak istediğimde süreç çok uzun ve karmaşık. Kargo takibi, para iadesi, müşteri hizmetleri...',
        category: 'E-ticaret',
        author: { id: 1, name: 'Ahmet Y.', avatar: 'AY' },
        votes: 234,
        comments: 45,
        solutions: 12,
        createdAt: '2024-01-15',
        tags: ['e-ticaret', 'iade', 'müşteri deneyimi'],
        status: 'active'
    },
    {
        id: 2,
        title: 'Türkiye\'de freelancer ödemelerinde sorunlar',
        description: 'Uluslararası müşterilerden ödeme almak çok zor. PayPal yok, Swift pahalı, kripto yasal değil...',
        category: 'Fintech',
        author: { id: 2, name: 'Elif K.', avatar: 'EK' },
        votes: 189,
        comments: 67,
        solutions: 8,
        createdAt: '2024-01-12',
        tags: ['fintech', 'ödeme', 'freelance'],
        status: 'active'
    },
    {
        id: 3,
        title: 'Startup\'lar için uygun fiyatlı hukuki danışmanlık',
        description: 'Erken aşama startup olarak avukat tutmak çok pahalı. Şirket kuruluşu, sözleşmeler, IP koruması...',
        category: 'Hukuk',
        author: { id: 3, name: 'Can Ö.', avatar: 'CÖ' },
        votes: 156,
        comments: 34,
        solutions: 5,
        createdAt: '2024-01-10',
        tags: ['hukuk', 'startup', 'danışmanlık'],
        status: 'active'
    },
    {
        id: 4,
        title: 'Ev sahipleri ve kiracılar arasında güven sorunu',
        description: 'Kiralama sürecinde hem ev sahipleri hem kiracılar güvenlik endişesi yaşıyor. Depozito, ödeme garantisi...',
        category: 'Emlak',
        author: { id: 4, name: 'Selin A.', avatar: 'SA' },
        votes: 142,
        comments: 28,
        solutions: 6,
        createdAt: '2024-01-08',
        tags: ['emlak', 'kiralama', 'güven'],
        status: 'active'
    },
];

export const PROBLEM_CATEGORIES = [
    'Tümü',
    'E-ticaret',
    'Fintech',
    'Sağlık',
    'Eğitim',
    'Lojistik',
    'Hukuk',
    'Emlak',
    'Diğer'
];
