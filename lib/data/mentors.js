// Mock Data - Mentors
// Bu dosya database entegrasyonunda kaldırılacak

export const DEMO_MENTORS = [
    {
        id: 1,
        name: 'Ahmet Yılmaz',
        title: 'Founder & CEO',
        company: 'TechVentures (Exit: $50M)',
        avatar: 'AY',
        expertise: ['Fundraising', 'Product Strategy', 'Team Building'],
        industries: ['Fintech', 'SaaS'],
        experience: '15+ yıl',
        mentees: 24,
        rating: 4.9,
        bio: '3 başarılı exit yapmış seri girişimci. Angel investor ve startup mentor.',
        availability: 'Haftada 2 saat',
        price: 0,
        priceLabel: 'Ücretsiz',
        featured: true
    },
    {
        id: 2,
        name: 'Dr. Elif Demir',
        title: 'Partner',
        company: 'Seed Capital VC',
        avatar: 'ED',
        expertise: ['Venture Capital', 'Due Diligence', 'Board Management'],
        industries: ['HealthTech', 'AI/ML'],
        experience: '12+ yıl',
        mentees: 18,
        rating: 4.8,
        bio: 'VC partneri olarak 50+ şirkete yatırım yaptı. Stanford MBA.',
        availability: 'Haftada 1 saat',
        price: 500,
        priceLabel: '₺500/saat',
        featured: true
    },
    {
        id: 3,
        name: 'Can Öztürk',
        title: 'VP of Engineering',
        company: 'Trendyol',
        avatar: 'CÖ',
        expertise: ['Technical Leadership', 'Scaling Teams', 'System Design'],
        industries: ['E-commerce', 'Marketplace'],
        experience: '10+ yıl',
        mentees: 31,
        rating: 4.9,
        bio: '500+ kişilik engineering ekibi yönetti. Technical scaling konusunda uzman.',
        availability: 'Haftada 2 saat',
        price: 0,
        priceLabel: 'Ücretsiz',
        featured: false
    },
    {
        id: 4,
        name: 'Selin Arslan',
        title: 'CMO',
        company: 'Getir (Ex)',
        avatar: 'SA',
        expertise: ['Growth Marketing', 'Brand Building', 'User Acquisition'],
        industries: ['Consumer', 'Mobile'],
        experience: '8+ yıl',
        mentees: 15,
        rating: 4.7,
        bio: 'Unicorn şirketinde CMO olarak görev yaptı. Growth hacking uzmanı.',
        availability: 'Ayda 4 saat',
        price: 750,
        priceLabel: '₺750/saat',
        featured: false
    },
];

export const EXPERTISE_AREAS = [
    'Tümü',
    'Fundraising',
    'Product Strategy',
    'Growth Marketing',
    'Technical Leadership',
    'Legal',
    'HR/Team Building',
    'Sales',
    'Operations'
];

export const MENTOR_INDUSTRIES = [
    'Tümü',
    'Fintech',
    'SaaS',
    'HealthTech',
    'E-commerce',
    'AI/ML',
    'Consumer',
    'B2B'
];
