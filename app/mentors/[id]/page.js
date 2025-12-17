"use client";

import { use } from 'react';
import Link from 'next/link';
import styles from './mentor-detail.module.css';

const DEMO_MENTORS = {
    1: {
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
        reviews: 18,
        bio: '3 başarılı exit yapmış seri girişimci. Angel investor ve startup mentor. 15 yılı aşkın süredir teknoloji sektöründe aktif olarak çalışıyorum.',
        about: 'İlk startup\'ımı 2008 yılında kurdum ve o günden bu yana girişimcilik ekosisteminin içindeyim. TechVentures\'ı 2015\'te $50M değerleme ile sattıktan sonra angel yatırımcılığa yöneldim. Bugüne kadar 20+ startup\'a yatırım yaptım ve 50+ girişimciye mentorluk ettim.',
        availability: 'Haftada 2 saat',
        price: 'Ücretsiz',
        linkedin: 'https://linkedin.com/in/ahmetyilmaz',
        twitter: 'https://twitter.com/ahmetyilmaz',
        languages: ['Türkçe', 'İngilizce'],
        sessionTypes: [
            { type: '1-1 Görüşme', duration: '45 dakika', price: 'Ücretsiz' },
            { type: 'Pitch Review', duration: '30 dakika', price: 'Ücretsiz' },
            { type: 'Strateji Oturumu', duration: '90 dakika', price: '₺500' }
        ]
    },
    2: {
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
        reviews: 14,
        bio: 'VC partneri olarak 50+ şirkete yatırım yaptı. Stanford MBA.',
        about: 'Silikon Vadisi ve Türkiye\'de venture capital alanında 12 yılı aşkın deneyimim var. Stanford MBA sonrası Seed Capital\'e katıldım ve bugüne kadar 50\'den fazla şirkete yatırım yaptık.',
        availability: 'Haftada 1 saat',
        price: '₺500/saat',
        linkedin: 'https://linkedin.com/in/elifdemir',
        languages: ['Türkçe', 'İngilizce', 'Almanca'],
        sessionTypes: [
            { type: 'Yatırım Danışmanlığı', duration: '60 dakika', price: '₺500' },
            { type: 'Due Diligence Prep', duration: '45 dakika', price: '₺400' }
        ]
    }
};

export default function MentorDetailPage({ params }) {
    const { id } = use(params);
    const mentor = DEMO_MENTORS[id];

    if (!mentor) {
        return (
            <div className={styles.notFound}>
                <h1>Mentor bulunamadı</h1>
                <Link href="/mentors">← Mentörlere Dön</Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className="container">
                <Link href="/mentors" className={styles.backLink}>
                    ← Mentörlere Dön
                </Link>

                <div className={styles.layout}>
                    {/* Main Content */}
                    <div className={styles.main}>
                        {/* Header */}
                        <div className={styles.header}>
                            <div className={styles.avatar}>{mentor.avatar}</div>
                            <div className={styles.info}>
                                <h1 className={styles.name}>{mentor.name}</h1>
                                <p className={styles.title}>{mentor.title}</p>
                                <p className={styles.company}>{mentor.company}</p>
                                <div className={styles.stats}>
                                    <span>⭐ {mentor.rating} ({mentor.reviews} değerlendirme)</span>
                                    <span>👥 {mentor.mentees} mentee</span>
                                    <span>🕐 {mentor.experience}</span>
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className={styles.section}>
                            <h2>Hakkında</h2>
                            <p>{mentor.about}</p>
                        </div>

                        {/* Expertise */}
                        <div className={styles.section}>
                            <h2>Uzmanlık Alanları</h2>
                            <div className={styles.tags}>
                                {mentor.expertise.map((exp, i) => (
                                    <span key={i} className={styles.tag}>{exp}</span>
                                ))}
                            </div>
                        </div>

                        {/* Industries */}
                        <div className={styles.section}>
                            <h2>Sektörler</h2>
                            <div className={styles.tags}>
                                {mentor.industries.map((ind, i) => (
                                    <span key={i} className={styles.tagAlt}>{ind}</span>
                                ))}
                            </div>
                        </div>

                        {/* Session Types */}
                        <div className={styles.section}>
                            <h2>Oturum Tipleri</h2>
                            <div className={styles.sessions}>
                                {mentor.sessionTypes.map((session, i) => (
                                    <div key={i} className={styles.sessionCard}>
                                        <div className={styles.sessionInfo}>
                                            <h4>{session.type}</h4>
                                            <span>{session.duration}</span>
                                        </div>
                                        <span className={styles.sessionPrice}>{session.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className={styles.sidebar}>
                        <div className={styles.bookingCard}>
                            <h3>Randevu Al</h3>
                            <p className={styles.availability}>📅 {mentor.availability}</p>
                            <p className={styles.price}>{mentor.price}</p>
                            <Link href={`/mentors/${mentor.id}/book`} className={styles.bookBtn}>
                                Randevu Al →
                            </Link>
                        </div>

                        <div className={styles.detailsCard}>
                            <h4>Detaylar</h4>
                            <div className={styles.detailItem}>
                                <span>Diller</span>
                                <span>{mentor.languages?.join(', ')}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span>Deneyim</span>
                                <span>{mentor.experience}</span>
                            </div>
                            {mentor.linkedin && (
                                <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                    LinkedIn Profili →
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
