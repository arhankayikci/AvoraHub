import Link from 'next/link';
import styles from './privacy.module.css';

export default function PrivacyPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>Yasal</span>
                        <h1 className={styles.title}>Gizlilik Politikası</h1>
                        <p className={styles.subtitle}>
                            Verilerinizin güvenliği bizim için önceliktir. KVKK kapsamında hazırlanmış aydınlatma metni.
                        </p>
                        <div className={styles.meta}>
                            <span>Son Güncelleme: 20 Aralık 2024</span>
                            <span>•</span>
                            <span>KVKK Uyumlu</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className={styles.contentSection}>
                <div className="container">
                    <div className={styles.contentWrapper}>
                        {/* Section 1 */}
                        <div className={styles.card}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionNumber}>1</span>
                                Veri Sorumlusu
                            </h2>
                            <p className={styles.sectionText}>
                                6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında,
                                kişisel verilerinizin veri sorumlusu <strong>AvoraHub Teknoloji A.Ş.</strong>&apos;dir.
                            </p>
                            <div className={styles.infoBox}>
                                <div className={styles.infoGrid}>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>E-posta</span>
                                        <span className={styles.infoValue}>kvkk@avorahub.com.tr</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Konum</span>
                                        <span className={styles.infoValue}>İstanbul, Türkiye</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className={styles.card}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionNumber}>2</span>
                                Toplanan Veriler
                            </h2>
                            <p className={styles.sectionText}>
                                Platform hizmetlerini sunabilmek için aşağıdaki kategorilerde kişisel veriler işlenmektedir:
                            </p>
                            <ul className={styles.checkList}>
                                <li className={styles.checkItem}>
                                    <span className={styles.checkIcon}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className={styles.checkText}>Kimlik bilgileri (ad, soyad)</span>
                                </li>
                                <li className={styles.checkItem}>
                                    <span className={styles.checkIcon}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className={styles.checkText}>İletişim bilgileri (e-posta, telefon)</span>
                                </li>
                                <li className={styles.checkItem}>
                                    <span className={styles.checkIcon}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className={styles.checkText}>Şirket ve profesyonel bilgiler</span>
                                </li>
                                <li className={styles.checkItem}>
                                    <span className={styles.checkIcon}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className={styles.checkText}>Teknik veriler (IP, çerez, log kayıtları)</span>
                                </li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div className={styles.card}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionNumber}>3</span>
                                KVKK Haklarınız
                            </h2>
                            <p className={styles.sectionText}>
                                Kanun&apos;un 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:
                            </p>
                            <ul className={styles.checkList}>
                                <li className={styles.checkItem}>
                                    <span className={styles.checkIcon}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className={styles.checkText}>Bilgi edinme hakkı</span>
                                </li>
                                <li className={styles.checkItem}>
                                    <span className={styles.checkIcon}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className={styles.checkText}>Düzeltme veya silme talep etme</span>
                                </li>
                                <li className={styles.checkItem}>
                                    <span className={styles.checkIcon}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className={styles.checkText}>İşlemeye itiraz etme</span>
                                </li>
                                <li className={styles.checkItem}>
                                    <span className={styles.checkIcon}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className={styles.checkText}>Zararın giderilmesini isteme</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h3 className={styles.ctaTitle}>Haklarınızı Kullanın</h3>
                        <p className={styles.ctaText}>KVKK başvurularınız için bize ulaşın</p>
                        <a href="mailto:kvkk@avorahub.com.tr" className="btn btn-primary">
                            kvkk@avorahub.com.tr
                        </a>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <div className={styles.navLinks}>
                <Link href="/terms" className={styles.navLink}>Kullanım Şartları →</Link>
                <Link href="/about" className={styles.navLink}>Hakkımızda →</Link>
                <Link href="/contact" className={styles.navLink}>İletişim →</Link>
            </div>
        </div>
    );
}
