"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './new-topic.module.css';

const CATEGORIES = [
    { id: 'general', name: 'Genel' },
    { id: 'startups', name: 'Startup\'lar' },
    { id: 'funding', name: 'Yatırım & Fonlama' },
    { id: 'tech', name: 'Teknoloji' },
    { id: 'marketing', name: 'Pazarlama & Growth' },
    { id: 'hiring', name: 'İşe Alım' },
];

export default function NewTopicPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        category: 'general',
        content: '',
        tags: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('New topic:', formData);
        router.push('/forum');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.newTopicPage}>
            <div className="container">
                <div className={styles.header}>
                    <Link href="/forum" className={styles.backLink}>← Forum'a Dön</Link>
                    <h1 className={styles.title}>Yeni Konu Aç</h1>
                    <p className={styles.subtitle}>Topluluğa soru sorun, deneyimlerinizi paylaşın</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formCard}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Konu Başlığı *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Açık ve net bir başlık yazın..."
                                required
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Kategori *</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={styles.select}
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>İçerik *</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Konunuzu detaylı olarak açıklayın..."
                                rows={12}
                                required
                                className={styles.textarea}
                            />
                            <div className={styles.hint}>
                                Markdown formatını kullanabilirsiniz
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Etiketler</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="startup, yatırım, teknoloji (virgülle ayırın)"
                                className={styles.input}
                            />
                            <div className={styles.hint}>
                                İlgili anahtar kelimeleri ekleyin (isteğe bağlı)
                            </div>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            onClick={() => router.push('/forum')}
                            className={styles.cancelBtn}
                        >
                            İptal
                        </button>
                        <button type="submit" className={styles.submitBtn}>
                            Konuyu Yayınla
                        </button>
                    </div>
                </form>

                <div className={styles.guidelines}>
                    <h3>Topluluk Kuralları</h3>
                    <ul>
                        <li>Saygılı ve yapıcı bir dil kullanın</li>
                        <li>Spam veya reklam içeriği paylaşmayın</li>
                        <li>Konu başlığını açık ve anlaşılır yazın</li>
                        <li>Doğru kategoriyi seçin</li>
                        <li>Başkalarının fikirlerine saygı gösterin</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
