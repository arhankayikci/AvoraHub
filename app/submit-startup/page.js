"use client";

import { useState, useEffect } from 'react';
import styles from './submit.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const categories = [
    "AI", "Dev", "No-Code", "Freelance", "Tasarım & Yaratıcılık",
    "Pazarlama & Satış", "SEO & GEO", "Perakende", "Finans",
    "İK & Kariyer", "Hukuk", "Seyahat", "Göç", "Eğitim",
    "Tıp & Sağlık", "Gıda & Beslenme", "Spor & Fitness",
    "Verimlilik", "Medya", "VC & Startups", "Lojistik & Teslimat",
    "İş Dünyası", "Psikoloji", "AgTech", "Diğer"
];

const stages = [
    "Fikir Aşaması", "Pre-Seed", "Seed", "Series A", "Series B+", "Halka Açık"
];

const countries = [
    { code: "TR", name: "Türkiye" },
    { code: "US", name: "Amerika" },
    { code: "GB", name: "İngiltere" },
    { code: "DE", name: "Almanya" },
    { code: "FR", name: "Fransa" },
    { code: "BR", name: "Brezilya" },
    { code: "IN", name: "Hindistan" },
    { code: "ID", name: "Endonezya" },
    { code: "MX", name: "Meksika" },
    { code: "NG", name: "Nijerya" }
];

export default function SubmitStartup() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        tagline: '',
        description: '',
        category: '',
        stage: '',
        funding: '',
        website: '',
        country: ''
    });

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <div className="flex justify-center py-20">Yükleniyor...</div>;
    }

    const [errors, setErrors] = useState({});

    // Validation Functions
    const validateName = (name) => {
        if (!name.trim()) return "Girişim adı gereklidir";
        if (name.length < 2) return "Girişim adı en az 2 karakter olmalıdır";
        return null;
    };

    const validateTagline = (tagline) => {
        if (!tagline.trim()) return "Slogan gereklidir";
        if (tagline.length > 100) return "Slogan en fazla 100 karakter olabilir";
        return null;
    };

    const validateDescription = (desc) => {
        if (!desc.trim()) return "Açıklama gereklidir";
        if (desc.length < 50) return "Açıklama en az 50 karakter olmalıdır";
        return null;
    };

    const validateWebsite = (url) => {
        if (!url.trim()) return "Web sitesi gereklidir";
        try {
            new URL(url);
            return null;
        } catch (e) {
            return "Geçerli bir URL giriniz (örn: https://example.com)";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Real-time validation clearing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all required fields
        const newErrors = {};

        const nameError = validateName(formData.name);
        if (nameError) newErrors.name = nameError;

        const taglineError = validateTagline(formData.tagline);
        if (taglineError) newErrors.tagline = taglineError;

        const descError = validateDescription(formData.description);
        if (descError) newErrors.description = descError;

        const websiteError = validateWebsite(formData.website);
        if (websiteError) newErrors.website = websiteError;

        if (!formData.category) newErrors.category = "Kategori seçin";
        if (!formData.stage) newErrors.stage = "Aşama seçin";
        if (!formData.country) newErrors.country = "Ülke seçin";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Submit form
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/startups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    authorId: user.id,
                    author: user.name
                }),
            });

            if (!res.ok) {
                throw new Error('Submission failed');
            }

            // Show success and redirect
            alert('Girişim başarıyla eklendi! 🚀');
            router.push('/startups');
        } catch (error) {
            console.error(error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className={styles.title}>Girişim Ekle</h1>
                        <p className={styles.subtitle}>
                            Girişiminizi binlerce kişiye tanıtın, geri bildirim alın ve yatırımcılarla buluşun.
                        </p>
                    </div>
                </div>
            </section>

            {/* Form */}
            <section className={styles.formSection}>
                <div className="container">
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Temel Bilgiler */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Girişim Detayları</h2>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Girişim Adı *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Örn: Avora"
                                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                                />
                                {errors.name && <span className={styles.error}>{errors.name}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Slogan (Tagline) *
                                    <span className={styles.hint}>Girişiminizi tek cümlede özetleyin</span>
                                </label>
                                <input
                                    type="text"
                                    name="tagline"
                                    value={formData.tagline}
                                    onChange={handleChange}
                                    placeholder="Örn: Girişimciler için global pazar yeri"
                                    className={`${styles.input} ${errors.tagline ? styles.inputError : ''}`}
                                    maxLength={100}
                                />
                                {errors.tagline && <span className={styles.error}>{errors.tagline}</span>}
                                <span className={styles.charCount}>{formData.tagline.length}/100</span>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Detaylı Açıklama *
                                    <span className={styles.hint}>Girişiminizin ne yaptığını, hangi sorunu çözdüğünü anlatın</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Girişiminiz hakkında detaylı bilgi verin..."
                                    className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                                    rows={6}
                                />
                                {errors.description && <span className={styles.error}>{errors.description}</span>}
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Kategori *</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className={`${styles.select} ${errors.category ? styles.inputError : ''}`}
                                    >
                                        <option value="">Kategori seçin</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    {errors.category && <span className={styles.error}>{errors.category}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Aşama *</label>
                                    <select
                                        name="stage"
                                        value={formData.stage}
                                        onChange={handleChange}
                                        className={`${styles.select} ${errors.stage ? styles.inputError : ''}`}
                                    >
                                        <option value="">Aşama seçin</option>
                                        {stages.map(stage => (
                                            <option key={stage} value={stage}>{stage}</option>
                                        ))}
                                    </select>
                                    {errors.stage && <span className={styles.error}>{errors.stage}</span>}
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Ülke *</label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className={`${styles.select} ${errors.country ? styles.inputError : ''}`}
                                    >
                                        <option value="">Ülke seçin</option>
                                        {countries.map(country => (
                                            <option key={country.code} value={country.code}>{country.name}</option>
                                        ))}
                                    </select>
                                    {errors.country && <span className={styles.error}>{errors.country}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Yatırım Miktarı (Opsiyonel)</label>
                                    <input
                                        type="text"
                                        name="funding"
                                        value={formData.funding}
                                        onChange={handleChange}
                                        placeholder="Örn: $500K"
                                        className={styles.input}
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Web Sitesi *
                                </label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                    className={`${styles.input} ${errors.website ? styles.inputError : ''}`}
                                />
                                {errors.website && <span className={styles.error}>{errors.website}</span>}
                            </div>
                        </div>

                        {/* Submit */}
                        <div className={styles.submitSection}>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Gönderiliyor...' : 'Girişimi Yayınla'}
                            </button>
                            <button type="button" className="btn btn-ghost btn-lg" onClick={() => router.back()}>
                                İptal
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
