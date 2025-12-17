"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './create.module.css';

export default function CreateEventPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: '',
        capacity: '',
        isOnline: false,
        registrationLink: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Mock submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/events');
    };

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <h1>Etkinlik Oluştur</h1>
                    <p>Topluluk için yeni bir etkinlik düzenleyin</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Etkinlik Başlığı *</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Örn: Startup Networking Gecesi"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Açıklama *</label>
                        <textarea
                            required
                            rows={5}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Etkinlik detaylarını yazın..."
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label>Tarih *</label>
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Saat *</label>
                            <input
                                type="time"
                                required
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Konum</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Örn: İstanbul Teknopark"
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label>Kategori *</label>
                            <select
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="">Seçin</option>
                                <option value="networking">Networking</option>
                                <option value="workshop">Workshop</option>
                                <option value="seminar">Seminer</option>
                                <option value="meetup">Meetup</option>
                                <option value="conference">Konferans</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Kapasite</label>
                            <input
                                type="number"
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                placeholder="Örn: 50"
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={formData.isOnline}
                                onChange={(e) => setFormData({ ...formData, isOnline: e.target.checked })}
                            />
                            <span>Online etkinlik</span>
                        </label>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Kayıt Linki</label>
                        <input
                            type="url"
                            value={formData.registrationLink}
                            onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                            placeholder="https://"
                        />
                    </div>

                    <div className={styles.actions}>
                        <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>
                            İptal
                        </button>
                        <button type="submit" className={styles.submitBtn}>
                            Etkinlik Oluştur
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
