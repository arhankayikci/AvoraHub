"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './apply.module.css';

const EXPERTISE_OPTIONS = [
    'Fundraising',
    'Product Strategy',
    'Growth Marketing',
    'Technical Leadership',
    'Team Building',
    'Sales',
    'Legal',
    'Operations',
    'Finance'
];

const INDUSTRY_OPTIONS = [
    'Fintech',
    'SaaS',
    'E-commerce',
    'HealthTech',
    'EdTech',
    'AI/ML',
    'Consumer',
    'B2B',
    'Marketplace'
];

export default function MentorApplyPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        title: '',
        company: '',
        linkedin: '',
        expertise: [],
        industries: [],
        experience: '',
        bio: '',
        motivation: '',
        availability: 'weekly-2',
        price: 'free'
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleArrayField = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(v => v !== value)
                : [...prev[field], value]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simüle submit
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStep(4); // Success
        setIsSubmitting(false);
    };

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.card}>
                    {/* Progress */}
                    <div className={styles.progress}>
                        {[1, 2, 3].map(s => (
                            <div key={s} className={`${styles.progressStep} ${step >= s ? styles.active : ''}`}>
                                <span className={styles.stepNumber}>{step > s ? '✓' : s}</span>
                                <span className={styles.stepLabel}>
                                    {s === 1 ? 'Kişisel' : s === 2 ? 'Uzmanlık' : 'Detaylar'}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Personal Info */}
                    {step === 1 && (
                        <div className={styles.stepContent}>
                            <h1 className={styles.title}>🎓 Mentor Başvurusu</h1>
                            <p className={styles.subtitle}>Deneyimlerinizi paylaşarak yeni nesil girişimcilere yol gösterin</p>

                            <div className={styles.form}>
                                <div className={styles.row}>
                                    <div className={styles.formGroup}>
                                        <label>İsim Soyisim *</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            className={styles.input}
                                            placeholder="Adınız Soyadınız"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>E-posta *</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            className={styles.input}
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.formGroup}>
                                        <label>Ünvan</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => handleChange('title', e.target.value)}
                                            className={styles.input}
                                            placeholder="örn: CEO, CTO, VP of Engineering"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Şirket</label>
                                        <input
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => handleChange('company', e.target.value)}
                                            className={styles.input}
                                            placeholder="Şirket adı"
                                        />
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>LinkedIn Profili</label>
                                    <input
                                        type="url"
                                        value={formData.linkedin}
                                        onChange={(e) => handleChange('linkedin', e.target.value)}
                                        className={styles.input}
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </div>
                            </div>

                            <button
                                className={styles.nextBtn}
                                onClick={() => setStep(2)}
                                disabled={!formData.name || !formData.email}
                            >
                                Devam Et →
                            </button>
                        </div>
                    )}

                    {/* Step 2: Expertise */}
                    {step === 2 && (
                        <div className={styles.stepContent}>
                            <h2 className={styles.stepTitle}>Uzmanlık Alanlarınız</h2>

                            <div className={styles.formGroup}>
                                <label>Uzmanlık Alanları (en az 1 seçin)</label>
                                <div className={styles.tags}>
                                    {EXPERTISE_OPTIONS.map(exp => (
                                        <button
                                            key={exp}
                                            type="button"
                                            className={`${styles.tag} ${formData.expertise.includes(exp) ? styles.selected : ''}`}
                                            onClick={() => toggleArrayField('expertise', exp)}
                                        >
                                            {exp}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Sektörler</label>
                                <div className={styles.tags}>
                                    {INDUSTRY_OPTIONS.map(ind => (
                                        <button
                                            key={ind}
                                            type="button"
                                            className={`${styles.tag} ${formData.industries.includes(ind) ? styles.selected : ''}`}
                                            onClick={() => toggleArrayField('industries', ind)}
                                        >
                                            {ind}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Deneyim Süresi</label>
                                <select
                                    value={formData.experience}
                                    onChange={(e) => handleChange('experience', e.target.value)}
                                    className={styles.select}
                                >
                                    <option value="">Seçin</option>
                                    <option value="3-5">3-5 yıl</option>
                                    <option value="5-10">5-10 yıl</option>
                                    <option value="10-15">10-15 yıl</option>
                                    <option value="15+">15+ yıl</option>
                                </select>
                            </div>

                            <div className={styles.buttons}>
                                <button className={styles.backBtn} onClick={() => setStep(1)}>
                                    ← Geri
                                </button>
                                <button
                                    className={styles.nextBtn}
                                    onClick={() => setStep(3)}
                                    disabled={formData.expertise.length === 0}
                                >
                                    Devam Et →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Details */}
                    {step === 3 && (
                        <form className={styles.stepContent} onSubmit={handleSubmit}>
                            <h2 className={styles.stepTitle}>Son Detaylar</h2>

                            <div className={styles.formGroup}>
                                <label>Kendinizi Tanıtın *</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => handleChange('bio', e.target.value)}
                                    className={styles.textarea}
                                    rows={4}
                                    placeholder="Kariyeriniz, başarılarınız ve deneyimleriniz hakkında kısa bilgi..."
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Neden mentor olmak istiyorsunuz?</label>
                                <textarea
                                    value={formData.motivation}
                                    onChange={(e) => handleChange('motivation', e.target.value)}
                                    className={styles.textarea}
                                    rows={3}
                                    placeholder="Motivasyonunuz..."
                                />
                            </div>

                            <div className={styles.row}>
                                <div className={styles.formGroup}>
                                    <label>Müsaitlik</label>
                                    <select
                                        value={formData.availability}
                                        onChange={(e) => handleChange('availability', e.target.value)}
                                        className={styles.select}
                                    >
                                        <option value="weekly-1">Haftada 1 saat</option>
                                        <option value="weekly-2">Haftada 2 saat</option>
                                        <option value="weekly-3">Haftada 3+ saat</option>
                                        <option value="monthly-4">Ayda 4 saat</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Ücretlendirme</label>
                                    <select
                                        value={formData.price}
                                        onChange={(e) => handleChange('price', e.target.value)}
                                        className={styles.select}
                                    >
                                        <option value="free">Ücretsiz</option>
                                        <option value="paid">Ücretli</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.buttons}>
                                <button type="button" className={styles.backBtn} onClick={() => setStep(2)}>
                                    ← Geri
                                </button>
                                <button
                                    type="submit"
                                    className={styles.submitBtn}
                                    disabled={isSubmitting || !formData.bio}
                                >
                                    {isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 4: Success */}
                    {step === 4 && (
                        <div className={styles.success}>
                            <span className={styles.successIcon}>🎉</span>
                            <h2>Başvurunuz Alındı!</h2>
                            <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
                            <button className={styles.homeBtn} onClick={() => router.push('/mentors')}>
                                Mentörlere Dön
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
