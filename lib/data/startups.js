// Mock Data - Startups
// Bu dosya database entegrasyonunda kaldırılacak

export const DEMO_STARTUPS = [
    {
        id: 1,
        name: 'PayFlex',
        tagline: 'Türkiye\'nin freelancer ödeme çözümü',
        description: 'Uluslararası müşterilerden kolayca ödeme alın. Düşük komisyon, hızlı transfer.',
        logo: '💳',
        category: 'Fintech',
        founder: { id: 1, name: 'Mehmet K.', avatar: 'MK' },
        votes: 456,
        comments: 89,
        website: 'https://payflex.com',
        stage: 'Seed',
        founded: '2023',
        teamSize: '5-10',
        funding: '$500K',
        tags: ['fintech', 'ödeme', 'freelance'],
        featured: true,
        createdAt: '2024-01-20'
    },
    {
        id: 2,
        name: 'ReturnEasy',
        tagline: 'E-ticaret iadeleri artık kolay',
        description: 'Tek tıkla iade başlatın. Otomatik kargo, anında para iadesi.',
        logo: '📦',
        category: 'E-ticaret',
        founder: { id: 2, name: 'Zeynep C.', avatar: 'ZC' },
        votes: 312,
        comments: 56,
        website: 'https://returneasy.io',
        stage: 'Pre-seed',
        founded: '2024',
        teamSize: '1-5',
        funding: 'Bootstrapped',
        tags: ['e-ticaret', 'iade', 'lojistik'],
        featured: true,
        createdAt: '2024-01-18'
    },
    {
        id: 3,
        name: 'LegalStart',
        tagline: 'Startup\'lar için hukuki asistan',
        description: 'AI destekli hukuki danışmanlık. Sözleşmeler, şirket kuruluşu, IP koruması.',
        logo: '⚖️',
        category: 'LegalTech',
        founder: { id: 3, name: 'Deniz Y.', avatar: 'DY' },
        votes: 278,
        comments: 42,
        website: 'https://legalstart.co',
        stage: 'Seed',
        founded: '2023',
        teamSize: '5-10',
        funding: '$250K',
        tags: ['legaltech', 'AI', 'startup'],
        featured: false,
        createdAt: '2024-01-15'
    },
    {
        id: 4,
        name: 'RentTrust',
        tagline: 'Güvenli kiralama platformu',
        description: 'Ev sahipleri ve kiracılar için güvenli ödeme ve doğrulama sistemi.',
        logo: '🏠',
        category: 'PropTech',
        founder: { id: 4, name: 'Burak S.', avatar: 'BS' },
        votes: 198,
        comments: 31,
        website: 'https://renttrust.app',
        stage: 'Pre-seed',
        founded: '2024',
        teamSize: '1-5',
        funding: 'Bootstrapped',
        tags: ['proptech', 'kiralama', 'güven'],
        featured: false,
        createdAt: '2024-01-12'
    },
];

export const STARTUP_CATEGORIES = [
    'Tümü',
    'Fintech',
    'E-ticaret',
    'SaaS',
    'HealthTech',
    'EdTech',
    'LegalTech',
    'PropTech',
    'AI/ML',
    'Diğer'
];

export const STARTUP_STAGES = [
    'Tümü',
    'Idea',
    'Pre-seed',
    'Seed',
    'Series A',
    'Series B+',
    'Profitable'
];
