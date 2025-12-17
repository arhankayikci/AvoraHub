"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './startup-detail.module.css';
import CommentSection from '@/components/CommentSection';
import VoteButton from '@/components/VoteButton';
import ShareButtons from '@/components/ShareButtons';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function StartupDetailPage() {
    const params = useParams();
    const { id } = params;

    const [startup, setStartup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStartup = async () => {
            try {
                const res = await fetch(`/api/startups/${id}`);
                if (!res.ok) throw new Error('Startup not found');
                const data = await res.json();
                setStartup(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchStartup();
    }, [id]);

    if (loading) return <div className={styles.loadingContainer}><LoadingSpinner /></div>;
    if (error) return (
        <div className={styles.errorContainer}>
            <h1>Startup Bulunamadı</h1>
            <Link href="/startups" className="btn btn-primary">Listeye Dön</Link>
        </div>
    );
    if (!startup) return null;

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.breadcrumb}>
                        <Link href="/">Ana Sayfa</Link>
                        <span>/</span>
                        <Link href="/startups">Startup'lar</Link>
                        <span>/</span>
                        <span>{startup.category}</span>
                    </div>

                    <div className={styles.heroContent}>
                        <div className={styles.logoWrapper}>
                            <div className={styles.logo}>{startup.name[0]}</div>
                        </div>
                        <div className={styles.headerInfo}>
                            <span className={styles.categoryBadge}>{startup.category}</span>
                            <h1 className={styles.title}>{startup.name}</h1>
                            <p className={styles.tagline}>{startup.tagline}</p>
                            <div className={styles.meta}>
                                <span className={styles.stageBadge}>{startup.stage}</span>
                                <span className={styles.location}>📍 {startup.country}</span>
                            </div>
                        </div>
                        <div className={styles.heroStats}>
                            <div className={styles.statBox}>
                                <span className={styles.statNumber}>{startup.likes}</span>
                                <span className={styles.statLabel}>Beğeni</span>
                            </div>
                            <div className={styles.statBox}>
                                <span className={styles.statNumber}>{startup.comments || 0}</span>
                                <span className={styles.statLabel}>Yorum</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className={styles.contentSection}>
                <div className="container">
                    <div className={styles.contentGrid}>
                        {/* Main Content */}
                        <div className={styles.mainContent}>
                            {/* About Card */}
                            <div className={styles.contentCard}>
                                <h2 className={styles.sectionTitle}>Hakkında</h2>
                                <p className={styles.description}>{startup.description}</p>

                                <div className={styles.actions}>
                                    <VoteButton
                                        itemId={id}
                                        itemType="startup"
                                        initialCount={startup.likes}
                                    />
                                    <ShareButtons title={startup.name} />
                                </div>
                            </div>

                            {/* Info Cards */}
                            <div className={styles.infoCards}>
                                {/* Tech Stack */}
                                <div className={styles.infoCard}>
                                    <h3 className={styles.infoCardTitle}>
                                        <span>💻</span> Teknoloji Stack
                                    </h3>
                                    <div className={styles.techStack}>
                                        {['React', 'Node.js', 'AWS', 'Python', 'PostgreSQL'].map(tech => (
                                            <span key={tech} className={styles.techBadge}>{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Funding Info */}
                                <div className={styles.infoCard}>
                                    <h3 className={styles.infoCardTitle}>
                                        <span>💰</span> Yatırım Bilgileri
                                    </h3>
                                    <div className={styles.fundingList}>
                                        <div className={styles.fundingRow}>
                                            <span>Toplam Yatırım</span>
                                            <span>{startup.funding || '$500K'}</span>
                                        </div>
                                        <div className={styles.fundingRow}>
                                            <span>Aşama</span>
                                            <span>{startup.stage}</span>
                                        </div>
                                        <div className={styles.fundingRow}>
                                            <span>Kuruluş</span>
                                            <span>2023</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Team */}
                                <div className={styles.infoCard}>
                                    <h3 className={styles.infoCardTitle}>
                                        <span>👥</span> Ekip
                                    </h3>
                                    <div className={styles.teamList}>
                                        <div className={styles.teamMember}>
                                            <div className={styles.memberAvatar}>A</div>
                                            <div>
                                                <span className={styles.memberName}>Ahmet Yılmaz</span>
                                                <span className={styles.memberRole}>CEO & Kurucu</span>
                                            </div>
                                        </div>
                                        <div className={styles.teamMember}>
                                            <div className={styles.memberAvatar}>M</div>
                                            <div>
                                                <span className={styles.memberName}>Mehmet Kaya</span>
                                                <span className={styles.memberRole}>CTO</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className={styles.ctaCard}>
                                <div className={styles.ctaContent}>
                                    <h3>Bu Startup ile İletişime Geç</h3>
                                    <p>Yatırım veya iş birliği fırsatlarını değerlendirin</p>
                                </div>
                                <a href={startup.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                                    Siteyi Ziyaret Et →
                                </a>
                            </div>

                            {/* Comments */}
                            <CommentSection startupId={id} />
                        </div>

                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            {/* Founder Info */}
                            <div className={styles.sidebarCard}>
                                <h4>Kurucu</h4>
                                <div className={styles.ownerInfo}>
                                    <div className={styles.ownerAvatar}>A</div>
                                    <div>
                                        <span className={styles.ownerName}>Ahmet Yılmaz</span>
                                        <span className={styles.ownerMeta}>CEO & Kurucu</span>
                                    </div>
                                </div>
                                <button className="btn btn-outline btn-full">Mesaj Gönder</button>
                            </div>

                            {/* Quick Stats */}
                            <div className={styles.sidebarCard}>
                                <h4>Hızlı Bilgi</h4>
                                <div className={styles.quickStats}>
                                    <div className={styles.quickStatItem}>
                                        <span>💰</span>
                                        <div>
                                            <span className={styles.quickStatLabel}>Yatırım</span>
                                            <span className={styles.quickStatValue}>{startup.funding || '$500K'}</span>
                                        </div>
                                    </div>
                                    <div className={styles.quickStatItem}>
                                        <span>📈</span>
                                        <div>
                                            <span className={styles.quickStatLabel}>Aşama</span>
                                            <span className={styles.quickStatValue}>{startup.stage}</span>
                                        </div>
                                    </div>
                                    <div className={styles.quickStatItem}>
                                        <span>🌍</span>
                                        <div>
                                            <span className={styles.quickStatLabel}>Lokasyon</span>
                                            <span className={styles.quickStatValue}>{startup.country}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Similar Startups */}
                            <div className={styles.sidebarCard}>
                                <h4>Benzer Startup'lar</h4>
                                <div className={styles.similarList}>
                                    <Link href="/startups/2" className={styles.similarItem}>
                                        <span>TechFlow AI</span>
                                        <span className={styles.similarVotes}>↑ 234</span>
                                    </Link>
                                    <Link href="/startups/3" className={styles.similarItem}>
                                        <span>DataHub Pro</span>
                                        <span className={styles.similarVotes}>↑ 189</span>
                                    </Link>
                                    <Link href="/startups/4" className={styles.similarItem}>
                                        <span>CloudSync</span>
                                        <span className={styles.similarVotes}>↑ 156</span>
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}
