"use client";

import { useState } from 'react';
import styles from './contact.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitted(true);
        setIsSubmitting(false);
    };

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <h1 className={styles.title}>📮 İletişim</h1>
                    <p className={styles.subtitle}>
                        Sorularınız, önerileriniz veya iş birliği teklifleriniz için bize ulaşın
                    </p>
                </div>

                <div className={styles.content}>
                    {/* Contact Cards */}
                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <span className={styles.cardIcon}>📧</span>
                            <h3>E-posta</h3>
                            <p>Genel sorular için</p>
                            <a href="mailto:info@avorahub.com">info@avorahub.com</a>
                        </div>
                        <div className={styles.card}>
                            <span className={styles.cardIcon}>🛠️</span>
                            <h3>Destek</h3>
                            <p>Teknik yardım için</p>
                            <a href="mailto:support@avorahub.com">support@avorahub.com</a>
                        </div>
                        <div className={styles.card}>
                            <span className={styles.cardIcon}>🤝</span>
                            <h3>İş Birlikleri</h3>
                            <p>Partnership önerileri</p>
                            <a href="mailto:partners@avorahub.com">partners@avorahub.com</a>
                        </div>
                        <div className={styles.card}>
                            <span className={styles.cardIcon}>📰</span>
                            <h3>Basın</h3>
                            <p>Medya talepleri için</p>
                            <a href="mailto:press@avorahub.com">press@avorahub.com</a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className={styles.formSection}>
                        <h2>Mesaj Gönderin</h2>

                        {submitted ? (
                            <div className={styles.successMsg}>
                                <span>✅</span>
                                <h3>Mesajınız alındı!</h3>
                                <p>En kısa sürede size dönüş yapacağız.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.row}>
                                    <div className={styles.formGroup}>
                                        <label>İsim</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Adınız Soyadınız"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>E-posta</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Konu</label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        required
                                    >
                                        <option value="">Seçin</option>
                                        <option value="general">Genel Soru</option>
                                        <option value="support">Teknik Destek</option>
                                        <option value="partnership">İş Birliği</option>
                                        <option value="feedback">Geri Bildirim</option>
                                        <option value="other">Diğer</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Mesajınız</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Mesajınızı buraya yazın..."
                                    />
                                </div>
                                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                                    {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* FAQ Link */}
                <div className={styles.faqBanner}>
                    <h3>Sıkça sorulan sorulara göz attınız mı?</h3>
                    <p>Belki aradığınız cevabı FAQ bölümümüzde bulabilirsiniz.</p>
                    <a href="/help" className={styles.faqLink}>Yardım Merkezi →</a>
                </div>
            </div>
        </div>
    );
}
