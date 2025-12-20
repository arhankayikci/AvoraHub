"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from './new.module.css';

const CATEGORIES = [
    'Teknoloji', 'Sağlık', 'Eğitim', 'Finans', 'Ulaşım',
    'Enerji', 'Tarım', 'Turizm', 'E-Ticaret', 'Sosyal', 'Diğer'
];

export default function NewProblemPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Teknoloji',
        country_code: 'TR',
        country_name: 'Türkiye'
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const res = await fetch('/api/problems', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    author: user?.name || 'Anonim'
                })
            });

            if (res.ok) {
                router.push('/problems');
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
                        <p>Problem eklemek için üye olmalısınız veya giriş yapmalısınız.</p>
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
                    <Link href="/problems" className={styles.backLink}>← Problemlere Dön</Link>
                    <h1 className={styles.title}>Yeni Problem Ekle</h1>
                    <p className={styles.subtitle}>Toplulukla paylaşmak istediğiniz bir problem tanımlayın</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.formGroup}>
                        <label htmlFor="title">Problem Başlığı *</label>
                        <input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Örn: Elektrikli araç şarj istasyonu eksikliği"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Açıklama *</label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Problemi detaylı bir şekilde açıklayın..."
                            required
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
                            <label htmlFor="country">Ülke</label>
                            <select
                                id="country"
                                value={formData.country_code}
                                onChange={(e) => setFormData({ ...formData, country_code: e.target.value })}
                                className={styles.select}
                            >
                                <option value="TR">Türkiye 🇹🇷</option>
                                <option value="US">ABD 🇺🇸</option>
                                <option value="DE">Almanya 🇩🇪</option>
                                <option value="GB">İngiltere 🇬🇧</option>
                                <option value="FR">Fransa 🇫🇷</option>
                                <option value="OTHER">Diğer</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" onClick={() => router.back()} className="btn btn-outline">
                            İptal
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            {submitting ? 'Ekleniyor...' : 'Problem Ekle'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
