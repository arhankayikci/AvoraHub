"use client";

import Link from 'next/link';
import styles from './HeroSection.module.css';

const HeroSection = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroBackground}></div>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <div className={styles.badge}>
                        <span className={styles.badgeDot}></span>
                        Türkiye&apos;nin Lider Startup Ekosistemi
                    </div>

                    <h1 className={styles.title}>
                        Geleceği Şekillendirecek Çözümleri Keşfedin
                    </h1>

                    <p className={styles.subtitle}>
                        Vizyon sahibi problem çözücüler, yenilikçi startup&apos;lar ve ilerici yatırımcılarla bağlantı kurun. Anlamlı inovasyonu yönlendiren global ağa katılın.
                    </p>

                    <div className={styles.actions}>
                        <Link href="/problems" className="btn btn-primary btn-lg">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            Problemleri Keşfedin
                        </Link>
                        <Link href="/startups" className="btn btn-outline btn-lg">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                            </svg>
                            Girişimleri Keşfedin
                        </Link>
                    </div>

                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <div className={styles.statIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                            </div>
                            <span className={styles.statNumber}>500+</span>
                            <span className={styles.statLabel}>PROBLEM</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <div className={styles.statIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                </svg>
                            </div>
                            <span className={styles.statNumber}>120+</span>
                            <span className={styles.statLabel}>GİRİŞİM</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <div className={styles.statIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                            </div>
                            <span className={styles.statNumber}>50+</span>
                            <span className={styles.statLabel}>YATIRIMCI</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
