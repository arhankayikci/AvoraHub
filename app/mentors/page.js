"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './mentors.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { filterItemsForGuests } from '@/utils/visibilityHelpers';

const EXPERTISE_AREAS = ['Tümü', 'Fundraising', 'Product Strategy', 'Growth Marketing', 'Technical Leadership', 'Legal'];
const INDUSTRIES = ['Tümü', 'Fintech', 'SaaS', 'HealthTech', 'E-commerce', 'AI/ML'];

function MentorCard({ mentor }) {
    // Check if avatar is a URL or just initials
    const isAvatarUrl = mentor.avatar && mentor.avatar.length > 10 && mentor.avatar.startsWith('http');

    return (
        <Link href={`/mentors/${mentor.id}`} className={`${styles.mentorCard} ${mentor.featured ? styles.featured : ''}`}>
            {mentor.featured && <span className={styles.featuredBadge}></span>}

            <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                    {isAvatarUrl ? (
                        <img src={mentor.avatar} alt={mentor.name} className={styles.avatarImg} />
                    ) : (
                        <span>{mentor.avatar || mentor.name?.slice(0, 2).toUpperCase()}</span>
                    )}
                </div>
                <div className={styles.headerInfo}>
                    <h3 className={styles.name}>{mentor.name}</h3>
                    <p className={styles.mentorTitle}>{mentor.role}</p>
                    <p className={styles.company}>{mentor.location}</p>
                </div>
            </div>

            <p className={styles.bio}>{mentor.bio}</p>

            <div className={styles.expertise}>
                {mentor.expertise?.slice(0, 3).map((exp, i) => (
                    <span key={i} className={styles.expertiseTag}>{exp}</span>
                ))}
            </div>

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <span className={styles.statValue}>{mentor.total_investments || 0}</span>
                    <span className={styles.statLabel}>yatırım</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.statValue}>{mentor.active_deals || 0}</span>
                    <span className={styles.statLabel}>aktif</span>
                </div>
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.availability}>{mentor.ticket_size || 'Belirtilmemiş'}</span>
            </div>
        </Link>
    );
}

export default function MentorsPage() {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedExpertise, setSelectedExpertise] = useState('Tümü');
    const [selectedIndustry, setSelectedIndustry] = useState('Tümü');
    const [showFreeOnly, setShowFreeOnly] = useState(false);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const res = await fetch('/api/mentors');
                if (res.ok) {
                    const data = await res.json();
                    setMentors(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error('Error fetching mentors:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMentors();
    }, []);

    const filteredMentors = mentors.filter(mentor => {
        const matchesExpertise = selectedExpertise === 'Tümü' ||
            mentor.expertise?.some(e => e.includes(selectedExpertise));
        const matchesIndustry = selectedIndustry === 'Tümü' ||
            mentor.geography?.some(i => i.includes(selectedIndustry) || i === 'Tümü');
        return matchesExpertise && matchesIndustry;
    });

    const { user } = useAuth();
    const router = useRouter();

    // Apply rotating visibility for guests
    const { displayedItems: visibleMentors } = filterItemsForGuests(
        filteredMentors,
        !!user,
        3
    );

    const handleApplyClick = () => {
        if (!user) {
            router.push('/login?next=/mentors/apply');
        } else {
            router.push('/mentors/apply');
        }
    };

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
                </div>

                {/* Mentors Grid */}
                <div className={styles.mentorsGrid}>
                    {loading ? (
                        <p>Yükleniyor...</p>
                    ) : visibleMentors.length > 0 ? (
                        visibleMentors.map(mentor => (
                            <MentorCard key={mentor.id} mentor={mentor} />
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            <p>Henüz mentor eklenmemiş.</p>
                            <button onClick={handleApplyClick} className="btn btn-primary">Mentor Ol</button>
                        </div>
                    )}
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
                    <button onClick={handleApplyClick} className={styles.ctaBtn}>
                        Mentor Ol →
                    </button>
                </div>
            </div>
        </div>
    );
}
