"use client";

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from './investors.module.css';

export default function InvestorsPage() {
    const { user, profile } = useAuth();
    const isInvestor = profile?.role === 'investor';

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className={styles.title}>Geleceğin Unicornlarını Keşfedin</h1>
                        <p className={styles.subtitle}>
                            Avora, vizyoner yatırımcıları Türkiye&apos;nin en potansiyelli girişimleriyle buluşturuyor.
                            Erken aşama fırsatları yakalayın.
                        </p>
                        <div className="flex gap-8 justify-center">
                            {user ? (
                                isInvestor ? (
                                    <Link href="/startups" className="btn btn-primary btn-lg">
                                        Girişimleri Keşfet
                                    </Link>
                                ) : (
                                    <Link href="/onboarding?role=investor" className="btn btn-primary btn-lg">
                                        Yatırımcı Profiline Geç
                                    </Link>
                                )
                            ) : (
                                <Link href="/signup?role=investor" className="btn btn-primary btn-lg">
                                    Yatırımcı Olarak Katıl
                                </Link>
                            )}
                            <Link href="/startups" className="btn btn-outline btn-lg">
                                Girişimleri İncele
                            </Link>
                        </div>

                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <span className={styles.statValue}>500+</span>
                                <span className={styles.statLabel}>Onaylı Startup</span>
                            </div>
                            <div className={styles.statCard}>
                                <span className={styles.statValue}>$12M</span>
                                <span className={styles.statLabel}>Yatırım Hacmi</span>
                            </div>
                            <div className={styles.statCard}>
                                <span className={styles.statValue}>150+</span>
                                <span className={styles.statLabel}>Aktif Yatırımcı</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className={styles.valueSection}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Neden Avora?</h2>
                    <div className={styles.valueGrid}>
                        <div className={styles.valueCard}>
                            <div className={styles.valueIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg>
                            </div>
                            <h3 className={styles.valueTitle}>Erken Erişim</h3>
                            <p className={styles.valueText}>
                                Henüz lansman yapmamış, gizli modda çalışan girişimlere ilk siz erişin ve early-bird avantajlarından yararlanın.
                            </p>
                        </div>
                        <div className={styles.valueCard}>
                            <div className={styles.valueIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <h3 className={styles.valueTitle}>Doğrulanmış Veriler</h3>
                            <p className={styles.valueText}>
                                Tüm girişimler detaylı bir ön incelemeden geçer. Finansal veriler, ekip geçmişi ve pazar analizi elinizin altında.
                            </p>
                        </div>
                        <div className={styles.valueCard}>
                            <div className={styles.valueIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <h3 className={styles.valueTitle}>Doğrudan İletişim</h3>
                            <p className={styles.valueText}>
                                Aracı olmadan kurucularla doğrudan iletişime geçin, toplantı ayarlayın ve deal flow&apos;unuzu hızlandırın.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Portföyünüzü Büyütün</h2>
                    <p className={styles.subtitle} style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Türkiye&apos;nin en hızlı büyüyen girişimcilik ağında yerinizi alın.
                    </p>
                    {user ? (
                        <Link href="/startups" className="btn btn-primary btn-lg">
                            Girişimleri Keşfet
                        </Link>
                    ) : (
                        <Link href="/signup?role=investor" className="btn btn-primary btn-lg">
                            Hemen Başvurun
                        </Link>
                    )}
                </div>
            </section>
        </div>
    );
}
