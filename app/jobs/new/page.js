"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './new.module.css';

export default function NewJobPage() {
    const router = useRouter();
    const { user, profile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        type: 'Tam Zamanlı',
        salaryMin: '',
        salaryMax: '',
        description: '',
        requirements: '',
        benefits: '',
        applyUrl: '',
        tags: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('Giriş yapmalısınız');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Parse tags from comma-separated string
            const tagsArray = formData.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            const { data, error: insertError } = await supabase
                .from('jobs')
                .insert([{
                    title: formData.title,
                    company: formData.company || profile?.company || 'Firma Adı',
                    location: formData.location,
                    type: formData.type,
                    salary_min: formData.salaryMin ? parseInt(formData.salaryMin) : null,
                    salary_max: formData.salaryMax ? parseInt(formData.salaryMax) : null,
                    description: formData.description,
                    requirements: formData.requirements ? formData.requirements.split('\n').filter(r => r.trim()) : [],
                    benefits: formData.benefits ? formData.benefits.split('\n').filter(b => b.trim()) : [],
                    apply_url: formData.applyUrl,
                    tags: tagsArray,
                    user_id: user.id,
                    is_active: true
                }])
                .select();

            if (insertError) throw insertError;

            // Redirect to jobs page
            router.push('/jobs');
        } catch (err) {
            console.error('Error creating job:', err);
            setError(err.message || 'İlan oluşturulurken bir hata oluştu');
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className={styles.page}>
                <div className="container">
                    <div className={styles.authRequired}>
                        <h2>🔒 Giriş Gerekli</h2>
                        <p>İş ilanı vermek için giriş yapmalısınız.</p>
                        <Link href="/login?next=/jobs/new" className="btn btn-primary">
                            Giriş Yap
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <Link href="/jobs" className={styles.backLink}>
                        ← Geri Dön
                    </Link>
                    <h1 className={styles.title}>💼 İş İlanı Ver</h1>
                    <p className={styles.subtitle}>
                        Girişiminiz için yetenekli kişileri bulun
                    </p>
                </div>

                {error && (
                    <div className={styles.error}>
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Temel Bilgiler</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                İş Pozisyonu <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Örn: Senior Frontend Developer"
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Şirket Adı <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder={profile?.company || "Şirket adı"}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Lokasyon <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Örn: İstanbul, Türkiye"
                                    className={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Çalışma Türü <span className={styles.required}>*</span>
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className={styles.select}
                                    required
                                >
                                    <option value="Tam Zamanlı">Tam Zamanlı</option>
                                    <option value="Yarı Zamanlı">Yarı Zamanlı</option>
                                    <option value="Sözleşmeli">Sözleşmeli</option>
                                    <option value="Staj">Staj</option>
                                    <option value="Uzaktan">Uzaktan</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Etiketler</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    placeholder="React, TypeScript, Remote (virgülle ayırın)"
                                    className={styles.input}
                                />
                                <small className={styles.hint}>Virgülle ayırarak birden fazla etiket ekleyin</small>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Min. Maaş (₺)</label>
                                <input
                                    type="number"
                                    name="salaryMin"
                                    value={formData.salaryMin}
                                    onChange={handleChange}
                                    placeholder="15000"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Max. Maaş (₺)</label>
                                <input
                                    type="number"
                                    name="salaryMax"
                                    value={formData.salaryMax}
                                    onChange={handleChange}
                                    placeholder="25000"
                                    className={styles.input}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>İş Açıklaması</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Detaylı Açıklama <span className={styles.required}>*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="İş pozisyonunun detaylı açıklaması..."
                                className={styles.textarea}
                                rows={6}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Gereksinimler</label>
                            <textarea
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleChange}
                                placeholder="Her satıra bir gereksinim yazın&#10;Örn:&#10;3+ yıl React deneyimi&#10;TypeScript bilgisi&#10;Takım çalışmasına yatkın"
                                className={styles.textarea}
                                rows={5}
                            />
                            <small className={styles.hint}>Her satıra bir gereksinim yazın</small>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Sağlanan Faydalar</label>
                            <textarea
                                name="benefits"
                                value={formData.benefits}
                                onChange={handleChange}
                                placeholder="Her satıra bir fayda yazın&#10;Örn:&#10;Sağlık sigortası&#10;Esnek çalışma saatleri&#10;Uzaktan çalışma imkanı"
                                className={styles.textarea}
                                rows={5}
                            />
                            <small className={styles.hint}>Her satıra bir fayda yazın</small>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Başvuru Bilgileri</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Başvuru URL veya Email
                            </label>
                            <input
                                type="text"
                                name="applyUrl"
                                value={formData.applyUrl}
                                onChange={handleChange}
                                placeholder="https://sirket.com/kariyer veya kariyer@sirket.com"
                                className={styles.input}
                            />
                            <small className={styles.hint}>
                                Başvuru formu linki veya iletişim e-posta adresi
                            </small>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/jobs" className={styles.cancelBtn}>
                            İptal Et
                        </Link>
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={loading}
                        >
                            {loading ? '⏳ Yayınlanıyor...' : '✅ İlanı Yayınla'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
