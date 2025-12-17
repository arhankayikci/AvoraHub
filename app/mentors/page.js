"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './mentors.module.css';

// Demo mentorlar
const DEMO_MENTORS = [
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
        price: 'Ücretsiz',
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
        price: '₺500/saat',
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
        price: 'Ücretsiz',
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
        price: '₺750/saat',
        featured: false
    },
    {
        id: 5,
        name: 'Murat Kaya',
        title: 'Serial Entrepreneur',
        company: '4x Founder',
        avatar: 'MK',
        expertise: ['0-1 Journey', 'Bootstrapping', 'Product-Market Fit'],
        industries: ['B2B SaaS', 'Developer Tools'],
        experience: '12+ yıl',
        mentees: 42,
        rating: 4.8,
        bio: '4 startup kurmuş, 2 exit yapmış girişimci. Bootstrapping hayranı.',
        availability: 'Haftada 3 saat',
        price: 'Ücretsiz',
        featured: true
    },
    {
        id: 6,
        name: 'Zeynep Çelik',
        title: 'Legal Counsel',
        company: 'Startup Law Firm',
        avatar: 'ZÇ',
        expertise: ['Startup Legal', 'Term Sheets', 'IP Protection'],
        industries: ['Tümü'],
        experience: '10+ yıl',
        mentees: 28,
        rating: 4.6,
        bio: '100+ startup\'a hukuki danışmanlık verdi. Y Combinator mentoru.',
        availability: 'Haftada 2 saat',
        price: '₺400/saat',
        featured: false
    }
];

const EXPERTISE_AREAS = ['Tümü', 'Fundraising', 'Product Strategy', 'Growth Marketing', 'Technical Leadership', 'Legal'];
const INDUSTRIES = ['Tümü', 'Fintech', 'SaaS', 'HealthTech', 'E-commerce', 'AI/ML'];

function MentorCard({ mentor }) {
    return (
        <Link href={`/mentors/${mentor.id}`} className={`${styles.mentorCard} ${mentor.featured ? styles.featured : ''}`}>
            {mentor.featured && <span className={styles.featuredBadge}></span>}

            <div className={styles.cardHeader}>
                <div className={styles.avatar}>{mentor.avatar}</div>
                <div className={styles.headerInfo}>
                    <h3 className={styles.name}>{mentor.name}</h3>
                    <p className={styles.mentorTitle}>{mentor.title}</p>
                    <p className={styles.company}>{mentor.company}</p>
                </div>
            </div>

            <p className={styles.bio}>{mentor.bio}</p>

            <div className={styles.expertise}>
                {mentor.expertise.slice(0, 3).map((exp, i) => (
                    <span key={i} className={styles.expertiseTag}>{exp}</span>
                ))}
            </div>

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <span className={styles.statValue}>{mentor.rating}</span>
                    <span className={styles.statLabel}>puan</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.statValue}>{mentor.mentees}</span>
                    <span className={styles.statLabel}>mentee</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.statValue}>{mentor.experience}</span>
                </div>
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.availability}>{mentor.availability}</span>
                <span className={`${styles.price} ${mentor.price === 'Ücretsiz' ? styles.free : ''}`}>
                    {mentor.price}
                </span>
            </div>
        </Link>
    );
}

export default function MentorsPage() {
    const [selectedExpertise, setSelectedExpertise] = useState('Tümü');
    const [selectedIndustry, setSelectedIndustry] = useState('Tümü');
    const [showFreeOnly, setShowFreeOnly] = useState(false);

    const filteredMentors = DEMO_MENTORS.filter(mentor => {
        const matchesExpertise = selectedExpertise === 'Tümü' ||
            mentor.expertise.some(e => e.includes(selectedExpertise));
        const matchesIndustry = selectedIndustry === 'Tümü' ||
            mentor.industries.some(i => i.includes(selectedIndustry) || i === 'Tümü');
        const matchesFree = !showFreeOnly || mentor.price === 'Ücretsiz';
        return matchesExpertise && matchesIndustry && matchesFree;
    });

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Hero */}
                <div className={styles.hero}>
                    <h1 className={styles.title}>Mentorluk</h1>
                    <p className={styles.subtitle}>
                        Deneyimli girişimciler ve sektör liderlerinden birebir rehberlik alın
                    </p>
                </div>

                {/* Filters */}
                <div className={styles.filters}>
                    <div className={styles.filterRow}>
                        <div className={styles.filterGroup}>
                            <label>Uzmanlık Alanı</label>
                            <select
                                value={selectedExpertise}
                                onChange={(e) => setSelectedExpertise(e.target.value)}
                                className={styles.select}
                            >
                                {EXPERTISE_AREAS.map(area => (
                                    <option key={area} value={area}>{area}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.filterGroup}>
                            <label>Sektör</label>
                            <select
                                value={selectedIndustry}
                                onChange={(e) => setSelectedIndustry(e.target.value)}
                                className={styles.select}
                            >
                                {INDUSTRIES.map(ind => (
                                    <option key={ind} value={ind}>{ind}</option>
                                ))}
                            </select>
                        </div>
                        <label className={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={showFreeOnly}
                                onChange={(e) => setShowFreeOnly(e.target.checked)}
                            />
                            <span>Sadece ücretsiz</span>
                        </label>
                    </div>
                </div>

                {/* Stats */}
                <div className={styles.statsBar}>
                    <span>{filteredMentors.length} mentor</span>
                    <span>•</span>
                    <span>{DEMO_MENTORS.filter(m => m.price === 'Ücretsiz').length} ücretsiz</span>
                </div>

                {/* Mentors Grid */}
                <div className={styles.mentorsGrid}>
                    {filteredMentors.map(mentor => (
                        <MentorCard key={mentor.id} mentor={mentor} />
                    ))}
                </div>

                {/* Become Mentor CTA */}
                <div
                    className={styles.cta}
                    style={{
                        background: 'linear-gradient(135deg, #0B4F3B 0%, #1B6B54 50%, #2E8B70 100%)',
                        color: 'white'
                    }}
                >
                    <div className={styles.ctaContent}>
                        <h3 style={{ color: '#D4AF37' }}>Deneyimlerinizi paylaşın</h3>
                        <p style={{ color: 'white' }}>Mentor olarak topluluğa katkıda bulunun ve yeni nesil girişimcilere yol gösterin</p>
                    </div>
                    <Link href="/mentors/apply" className={styles.ctaBtn}>
                        Mentor Ol →
                    </Link>
                </div>
            </div>
        </div>
    );
}
