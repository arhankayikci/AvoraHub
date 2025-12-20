import Link from 'next/link';
import styles from './about.module.css';

export default function AboutPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>Hakkımızda</span>
                        <h1 className={styles.title}>Girişimciliğin Yeni Altyapısı</h1>
                        <p className={styles.subtitle}>
                            Fikirleri sermayeyle, problemleri çözümlerle buluşturuyoruz.
                            Her harika fikir desteklenmeli.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/signup" className="btn btn-primary btn-lg">
                                Platforma Katıl
                            </Link>
                            <Link href="/startups" className="btn btn-outline btn-lg">
                                Girişimleri Keşfet
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className={styles.statsSection}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>500+</span>
                            <span className={styles.statLabel}>Aktif Girişim</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>12M₺</span>
                            <span className={styles.statLabel}>Oluşturulan Değer</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>150+</span>
                            <span className={styles.statLabel}>Onaylı Yatırımcı</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>Global</span>
                            <span className={styles.statLabel}>Erişim Ağı</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className={styles.storySection}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Hikayemiz</h2>
                    <div className={styles.storyGrid}>
                        <div className={styles.storyCard}>
                            <div className={styles.storyIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Problem</h3>
                            <p>
                                Harika fikirler, doğru kişilere ulaşamadığı için kaybolur.
                                Girişimcilik ekosistemi kapalı ve yavaştır.
                            </p>
                        </div>
                        <div className={styles.storyCard}>
                            <div className={styles.storyIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Çözüm</h3>
                            <p>
                                Şeffaf, hızlı ve demokratik bir platform. Girişimciler için görünürlük,
                                yatırımcılar için nitelikli fırsatlar.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className={styles.valuesSection}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Değerlerimiz</h2>
                    <div className={styles.valuesGrid}>
                        <div className={styles.valueCard}>
                            <div className={styles.valueIcon}>⚡</div>
                            <h3>Hız</h3>
                            <p>Fikirler beklemez. En hızlı bağlantıyı kuruyoruz.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <div className={styles.valueIcon}>🎯</div>
                            <h3>Şeffaflık</h3>
                            <p>Bilgi herkes için açık. Süreci netleştiriyoruz.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <div className={styles.valueIcon}>💎</div>
                            <h3>Etki</h3>
                            <p>Toplumsal değer yaratan işleri önceliklendiriyoruz.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>Geleceği Birlikte İnşa Edelim</h2>
                        <p className={styles.ctaText}>
                            Türkiye&apos;nin en dinamik girişimcilik topluluğuna katılın
                        </p>
                        <Link href="/signup" className="btn btn-primary btn-lg">
                            Ücretsiz Başla
                        </Link>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <div className={styles.navLinks}>
                <Link href="/privacy" className={styles.navLink}>Gizlilik Politikası →</Link>
                <Link href="/terms" className={styles.navLink}>Kullanım Şartları →</Link>
                <Link href="/contact" className={styles.navLink}>İletişim →</Link>
            </div>
        </div>
    );
}
