"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './contact.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 3000);
    };

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>İletişim</span>
                        <h1 className={styles.title}>Bizimle İletişime Geçin</h1>
                        <p className={styles.subtitle}>
                            Sorularınız için buradayız. Size yardımcı olmaktan mutluluk duyarız.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Cards */}
            <section className={styles.cardsSection}>
                <div className="container">
                    <div className={styles.cardsGrid}>
                        <div className={styles.contactCard}>
                            <div className={styles.cardIcon}>📧</div>
                            <div className={styles.cardLabel}>E-posta</div>
                            <div className={styles.cardValue}>
                                <a href="mailto:hello@avorahub.com">hello@avorahub.com</a>
                            </div>
                        </div>
                        <div className={styles.contactCard}>
                            <div className={styles.cardIcon}>📞</div>
                            <div className={styles.cardLabel}>Telefon</div>
                            <div className={styles.cardValue}>+90 (212) XXX XX XX</div>
                        </div>
                        <div className={styles.contactCard}>
                            <div className={styles.cardIcon}>📍</div>
                            <div className={styles.cardLabel}>Konum</div>
                            <div className={styles.cardValue}>İstanbul, Türkiye</div>
                        </div>
                        <div className={styles.contactCard}>
                            <div className={styles.cardIcon}>⏰</div>
                            <div className={styles.cardLabel}>Çalışma</div>
                            <div className={styles.cardValue}>Pzt-Cum 09:00-18:00</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form */}
            <section className={styles.formSection}>
                <div className="container">
                    <div className={styles.formWrapper}>
                        <div className={styles.formCard}>
                            {submitted ? (
                                <div className={styles.successBox}>
                                    <div className={styles.successIcon}>
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <h3 className={styles.successTitle}>Mesajınız Alındı!</h3>
                                    <p className={styles.successText}>En kısa sürede size dönüş yapacağız.</p>
                                </div>
                            ) : (
                                <>
                                    <h2 className={styles.formTitle}>Mesaj Gönderin</h2>
                                    <p className={styles.formSubtitle}>Formu doldurun, en kısa sürede dönüş yapalım</p>

                                    <form onSubmit={handleSubmit} className={styles.formGrid}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>
                                                Ad Soyad <span>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className={styles.formInput}
                                                placeholder="Adınız"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>
                                                E-posta <span>*</span>
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className={styles.formInput}
                                                placeholder="ornek@email.com"
                                            />
                                        </div>
                                        <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                                            <label className={styles.formLabel}>
                                                Konu <span>*</span>
                                            </label>
                                            <select
                                                required
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className={styles.formSelect}
                                            >
                                                <option value="">Konu seçin...</option>
                                                <option value="genel">Genel Bilgi</option>
                                                <option value="destek">Teknik Destek</option>
                                                <option value="isbirligi">İş Birliği</option>
                                                <option value="yatirimci">Yatırımcı Soruları</option>
                                            </select>
                                        </div>
                                        <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                                            <label className={styles.formLabel}>
                                                Mesaj <span>*</span>
                                            </label>
                                            <textarea
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className={styles.formTextarea}
                                                placeholder="Mesajınızı buraya yazın..."
                                            />
                                        </div>
                                        <button type="submit" className={styles.submitBtn}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Mesajı Gönder
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <div className={styles.navLinks}>
                <Link href="/privacy" className={styles.navLink}>Gizlilik Politikası →</Link>
                <Link href="/terms" className={styles.navLink}>Kullanım Şartları →</Link>
                <Link href="/about" className={styles.navLink}>Hakkımızda →</Link>
            </div>
        </div>
    );
}
