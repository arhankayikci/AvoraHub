"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from './new.module.css';

const CATEGORIES = [
    'Teknoloji', 'Sağlık', 'Eğitim', 'Finans', 'E-Ticaret',
    'SaaS', 'AI/ML', 'Mobil', 'Oyun', 'Sosyal Medya', 'Diğer'
];

const STAGES = [
    'Fikir Aşaması', 'MVP', 'Pre-Seed', 'Seed', 'Series A', 'Series B+'
];

export default function NewStartupPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        tagline: '',
        description: '',
        category: 'Teknoloji',
        stage: 'Fikir Aşaması',
        country: 'TR',
        website: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const res = await fetch('/api/startups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/startups');
            } else {
                const data = await res.json();
                setError(data.error || 'Bir hata oluştu');
            }
        } catch (err) {
            setError('Bir hata oluştu');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className={styles.page}><div className="container"><p>Yükleniyor...</p></div></div>;
    }

    if (!user) {
        return (
            <div className={styles.page}>
                <div className="container">
                    <div className={styles.authRequired}>
                        <h1>Giriş Yapmalısınız</h1>
                        <p>Startup eklemek için üye olmalısınız veya giriş yapmalısınız.</p>
                        <div className={styles.authButtons}>
                            <Link href="/login" className="btn btn-primary">Giriş Yap</Link>
                            <Link href="/signup" className="btn btn-outline">Üye Ol</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <Link href="/startups" className={styles.backLink}>← Startup&apos;lara Dön</Link>
                    <h1 className={styles.title}>Yeni Startup Ekle</h1>
                    <p className={styles.subtitle}>Girişiminizi topluluğa tanıtın</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.formGroup}>
                        <label htmlFor="name">Startup Adı *</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Örn: TechVenture"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="tagline">Kısa Açıklama (Tagline) *</label>
                        <input
                            type="text"
                            id="tagline"
                            value={formData.tagline}
                            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                            placeholder="Örn: Yapay zeka destekli müşteri hizmetleri"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Detaylı Açıklama</label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Girişiminizi detaylı bir şekilde açıklayın..."
                            rows={6}
                            className={styles.textarea}
                        />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="category">Kategori *</label>
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className={styles.select}
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="stage">Aşama</label>
                            <select
                                id="stage"
                                value={formData.stage}
                                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                                className={styles.select}
                            >
                                {STAGES.map(stage => (
                                    <option key={stage} value={stage}>{stage}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="website">Website (Opsiyonel)</label>
                        <input
                            type="url"
                            id="website"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            placeholder="https://example.com"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" onClick={() => router.back()} className="btn btn-outline">
                            İptal
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            {submitting ? 'Ekleniyor...' : 'Startup Ekle'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
