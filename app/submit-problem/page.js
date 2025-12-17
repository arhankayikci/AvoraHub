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

export default function SubmitProblem() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        detailedDescription: '',
        category: '',
        country: '',
        budgetMin: '',
        budgetMax: '',
        timeline: '',
        technologies: '',
        contactEmail: ''
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
    const validateTitle = (title) => {
        if (!title.trim()) return "Başlık gereklidir";
        if (title.length < 10) return "Başlık en az 10 karakter olmalıdır";
        if (title.length > 120) return "Başlık en fazla 120 karakter olabilir";
        return null;
    };

    const validateDescription = (desc) => {
        if (!desc.trim()) return "Kısa açıklama gereklidir";
        if (desc.length > 300) return "Kısa açıklama en fazla 300 karakter olabilir";
        return null;
    };

    const validateEmail = (email) => {
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Geçerli bir e-posta adresi giriniz";
        }
        return null;
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

        const titleError = validateTitle(formData.title);
        if (titleError) newErrors.title = titleError;

        if (!formData.category) newErrors.category = "Kategori seçin";
        if (!formData.country) newErrors.country = "Ülke seçin";

        const descError = validateDescription(formData.description);
        if (descError) newErrors.description = descError;

        const emailError = validateEmail(formData.contactEmail);
        if (emailError) newErrors.contactEmail = emailError;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Submit form
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/problems', {
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
            alert('Problem başarıyla gönderildi! ✅');
            router.push('/problems');
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
                        <h1 className={styles.title}>Problem Paylaş</h1>
                        <p className={styles.subtitle}>
                            Çözüm bekleyen bir problemle mi karşılaştınız? Topluluğumuzla paylaşın ve yenilikçi çözümler bulun
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
                            <h2 className={styles.sectionTitle}>Temel Bilgiler</h2>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Problem Başlığı *
                                    <span className={styles.hint}>Problemi kısaca özetleyin</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Örn: Elektrikli araç şarj istasyonu eksikliği"
                                    className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                                    maxLength={120}
                                />
                                {errors.title && <span className={styles.error}>{errors.title}</span>}
                                <span className={styles.charCount}>{formData.title.length}/120</span>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Kısa Açıklama *
                                    <span className={styles.hint}>Problemi 1-2 cümlede anlatın</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Problemi kısa ve net bir şekilde açıklayın..."
                                    className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                                    rows={3}
                                    maxLength={300}
                                />
                                {errors.description && <span className={styles.error}>{errors.description}</span>}
                                <span className={styles.charCount}>{formData.description.length}/300</span>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Detaylı Açıklama
                                    <span className={styles.hint}>İstatistikler, örnekler ve bağlam ekleyin</span>
                                </label>
                                <textarea
                                    name="detailedDescription"
                                    value={formData.detailedDescription}
                                    onChange={handleChange}
                                    placeholder="Problemin detaylarını, etkisini ve önemini açıklayın..."
                                    className={styles.textarea}
                                    rows={6}
                                />
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
                            </div>
                        </div>

                        {/* Çözüm Gereksinimleri */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Çözüm Gereksinimleri (Opsiyonel)</h2>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Tahmini Bütçe (Min - USD)</label>
                                    <input
                                        type="number"
                                        name="budgetMin"
                                        value={formData.budgetMin}
                                        onChange={handleChange}
                                        placeholder="50000"
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Tahmini Bütçe (Max - USD)</label>
                                    <input
                                        type="number"
                                        name="budgetMax"
                                        value={formData.budgetMax}
                                        onChange={handleChange}
                                        placeholder="200000"
                                        className={styles.input}
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Tahmini Süre</label>
                                <input
                                    type="text"
                                    name="timeline"
                                    value={formData.timeline}
                                    onChange={handleChange}
                                    placeholder="Örn: 12-18 ay"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Gerekli Teknolojiler</label>
                                <input
                                    type="text"
                                    name="technologies"
                                    value={formData.technologies}
                                    onChange={handleChange}
                                    placeholder="Örn: React Native, Node.js, PostgreSQL"
                                    className={styles.input}
                                />
                                <span className={styles.hint}>Virgülle ayırarak yazın</span>
                            </div>
                        </div>

                        {/* İletişim */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>İletişim (Opsiyonel)</h2>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    E-posta Adresi
                                    <span className={styles.hint}>İlgilenenler size nasıl ulaşsın?</span>
                                </label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleChange}
                                    placeholder="ornek@sirket.com"
                                    className={`${styles.input} ${errors.contactEmail ? styles.inputError : ''}`}
                                />
                                {errors.contactEmail && <span className={styles.error}>{errors.contactEmail}</span>}
                            </div>
                        </div>

                        {/* Submit */}
                        <div className={styles.submitSection}>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Gönderiliyor...' : 'Problem Paylaş'}
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
