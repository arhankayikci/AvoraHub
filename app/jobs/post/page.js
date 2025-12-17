"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../jobs.module.css';

export default function PostJobPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        type: 'full_time',
        experienceLevel: 'mid',
        salaryMin: '',
        salaryMax: '',
        description: '',
        requirements: '',
        benefits: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Job posted:', formData);
        router.push('/jobs');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.jobsPage}>
            <div className="container">
                <div className={styles.postJobHeader}>
                    <Link href="/jobs" className={styles.backLink}>← Geri Dön</Link>
                    <h1>İş İlanı Oluştur</h1>
                    <p>Yetenekli adayları bulmak için iş ilanınızı oluşturun</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.postJobForm}>
                    <div className={styles.formSection}>
                        <h3>Genel Bilgiler</h3>

                        <div className={styles.formGroup}>
                            <label>Pozisyon Adı *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="ör. Senior Full Stack Developer"
                                required
                                className={styles.formInput}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Şirket Adı *</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Şirketinizin adı"
                                required
                                className={styles.formInput}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Lokasyon *</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="İstanbul, Türkiye"
                                    required
                                    className={styles.formInput}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Çalışma Şekli *</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className={styles.formSelect}
                                >
                                    <option value="full_time">Tam Zamanlı</option>
                                    <option value="part_time">Yarı Zamanlı</option>
                                    <option value="remote">Uzaktan</option>
                                    <option value="hybrid">Hibrit</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Deneyim Seviyesi *</label>
                                <select
                                    name="experienceLevel"
                                    value={formData.experienceLevel}
                                    onChange={handleChange}
                                    className={styles.formSelect}
                                >
                                    <option value="entry">Başlangıç</option>
                                    <option value="mid">Orta</option>
                                    <option value="senior">Kıdemli</option>
                                    <option value="lead">Lider</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Maaş Aralığı (₺)</label>
                                <div className={styles.salaryRange}>
                                    <input
                                        type="number"
                                        name="salaryMin"
                                        value={formData.salaryMin}
                                        onChange={handleChange}
                                        placeholder="Min"
                                        className={styles.formInput}
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        name="salaryMax"
                                        value={formData.salaryMax}
                                        onChange={handleChange}
                                        placeholder="Max"
                                        className={styles.formInput}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formSection}>
                        <h3>İş Detayları</h3>

                        <div className={styles.formGroup}>
                            <label>İş Açıklaması *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="İş tanımını detaylı olarak açıklayın..."
                                rows={6}
                                required
                                className={styles.formTextarea}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Gereksinimler *</label>
                            <textarea
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleChange}
                                placeholder="İş için gerekli yetenek ve deneyimleri listeleyin..."
                                rows={6}
                                required
                                className={styles.formTextarea}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Yan Haklar</label>
                            <textarea
                                name="benefits"
                                value={formData.benefits}
                                onChange={handleChange}
                                placeholder="Sunduğunuz yan hakları listeleyin..."
                                rows={4}
                                className={styles.formTextarea}
                            />
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" onClick={() => router.push('/jobs')} className={styles.cancelBtn}>İptal</button>
                        <button type="submit" className={styles.submitBtn}>İlanı Yayınla</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
