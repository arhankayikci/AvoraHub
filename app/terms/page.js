import Link from 'next/link';
import styles from '../privacy/privacy.module.css';

export default function TermsPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>Yasal</span>
                        <h1 className={styles.title}>Kullanım Şartları</h1>
                        <p className={styles.subtitle}>
                            Platformumuzu kullanarak kabul ettiğiniz koşullar ve sorumluluklar.
                        </p>
                        <div className={styles.meta}>
                            <span>Son Güncelleme: 20 Aralık 2024</span>
                            <span>•</span>
                            <span>Versiyon 1.2</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className={styles.contentSection}>
                <div className="container">
                    <div className={styles.contentWrapper}>
                        {/* Warning */}
                        <div className={styles.warningBox}>
                            <div className={styles.warningIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className={styles.warningContent}>
                                <h4>Önemli Uyarı</h4>
                                <p>AvoraHub bir yatırım danışmanlığı platformu değildir. Yatırım kararları kullanıcıların sorumluluğundadır.</p>
                            </div>
                        </div>

                        {/* Section 1 */}
                        <div className={styles.card}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionNumber}>1</span>
                                Taraflar
                            </h2>
                            <p className={styles.sectionText}>
                                Bu sözleşme, <strong>AvoraHub Teknoloji A.Ş.</strong> ile avorahub.com platformunu
                                kullanan tüm gerçek ve tüzel kişiler arasında akdedilmiştir.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className={styles.card}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionNumber}>2</span>
                                Hesap Kuralları
                            </h2>
                            <p className={styles.sectionText}>
                                Platforma kayıt olurken aşağıdaki kurallara uymanız gerekmektedir:
                            </p>
                            <ul className={styles.checkList}>
                                <li className={styles.checkItem}>
                                    <span className={styles.checkIcon}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className={styles.checkText}>18 yaş ve üzeri olmak</span>
                                </li>
                                <li className={styles.checkItem}>
                                    <span className={styles.checkIcon}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className={styles.checkText}>Doğru ve güncel bilgi vermek</span>
                                </li>
                                <li className={styles.checkItem}>
                                    <span className={styles.checkIcon}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className={styles.checkText}>Hesap güvenliğini sağlamak</span>
                                </li>
                                <li className={styles.checkItem}>
                                    <span className={styles.checkIcon}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className={styles.checkText}>Tek hesap ile işlem yapmak</span>
                                </li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div className={styles.card}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionNumber}>3</span>
                                Fikri Mülkiyet
                            </h2>
                            <p className={styles.sectionText}>
                                Platform tasarımı, içerikleri ve tüm fikri mülkiyet hakları AvoraHub Teknoloji A.Ş.&apos;ye aittir.
                                Paylaştığınız içeriklerin hakları size ait olmaya devam eder.
                            </p>
                        </div>

                        {/* Section 4 - Sorumluluk */}
                        <div className={styles.card}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionNumber}>4</span>
                                Sorumluluk Sınırları
                            </h2>
                            <p className={styles.sectionText}>
                                Hizmetlerimiz &quot;olduğu gibi&quot; sunulmaktadır. AvoraHub, aşağıdaki konularda sorumluluk kabul etmez:
                            </p>
                            <div className={styles.dangerBox}>
                                <h4>AvoraHub sorumlu değildir:</h4>
                                <ul>
                                    <li>• Yatırım kararlarınız ve mali sonuçları</li>
                                    <li>• Kullanıcılar arası yapılan anlaşmalar</li>
                                    <li>• Platform içeriklerinin doğruluğu</li>
                                    <li>• Hizmet kesintileri veya teknik aksaklıklar</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h3 className={styles.ctaTitle}>Sorularınız mı var?</h3>
                        <p className={styles.ctaText}>Sözleşme hakkında bize ulaşın</p>
                        <a href="mailto:legal@avorahub.com.tr" className="btn btn-primary">
                            legal@avorahub.com.tr
                        </a>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <div className={styles.navLinks}>
                <Link href="/privacy" className={styles.navLink}>← Gizlilik Politikası</Link>
                <Link href="/about" className={styles.navLink}>Hakkımızda →</Link>
                <Link href="/contact" className={styles.navLink}>İletişim →</Link>
            </div>
        </div>
    );
}
