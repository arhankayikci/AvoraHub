"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './compare.module.css';
import { LoadingState, EmptyState } from '@/components/StateComponents';
import { ImgWithFallback } from '@/components/ImageWithFallback';

export default function ComparePage() {
    const [startups, setStartups] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStartups = async () => {
            try {
                const res = await fetch('/api/startups');
                const data = await res.json();
                setStartups(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching startups:', error);
                setStartups([]);
            } finally {
                setLoading(false);
            }
        };

        fetchStartups();
    }, []);

    const toggleSelect = (startup) => {
        if (selected.find(s => s.id === startup.id)) {
            setSelected(selected.filter(s => s.id !== startup.id));
        } else if (selected.length < 3) {
            setSelected([...selected, startup]);
        }
    };

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <h1 className={styles.title}>⚖️ Startup Karşılaştır</h1>
                    <p className={styles.subtitle}>
                        En fazla 3 startup seçip yan yana karşılaştırabilirsiniz
                    </p>
                </div>

                {loading ? (
                    <LoadingState text="Startup'lar yükleniyor..." />
                ) : startups.length > 0 ? (
                    <>
                        {/* Startup Selection */}
                        <div className={styles.selection}>
                            <h3>Karşılaştırmak için startup seçin ({selected.length}/3)</h3>
                            <div className={styles.grid}>
                                {startups.slice(0, 12).map(startup => (
                                    <div
                                        key={startup.id}
                                        className={`${styles.selectCard} ${selected.find(s => s.id === startup.id) ? styles.selected : ''}`}
                                        onClick={() => toggleSelect(startup)}
                                    >
                                        <ImgWithFallback
                                            src={startup.logo_url}
                                            alt={startup.name}
                                            fallbackText={startup.name}
                                            className={styles.logo}
                                            style={{ width: '40px', height: '40px' }}
                                        />
                                        <div>
                                            <h4>{startup.name}</h4>
                                            <p>{startup.tagline}</p>
                                        </div>
                                        {selected.find(s => s.id === startup.id) && (
                                            <span className={styles.checkmark}>✓</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Comparison Table */}
                        {selected.length >= 2 && (
                            <div className={styles.comparison}>
                                <h3>Karşılaştırma</h3>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Özellik</th>
                                            {selected.map(s => (
                                                <th key={s.id}>{s.name}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Kategori</td>
                                            {selected.map(s => <td key={s.id}>{s.category || '-'}</td>)}
                                        </tr>
                                        <tr>
                                            <td>Oylar</td>
                                            {selected.map(s => <td key={s.id}>{s.votes || 0}</td>)}
                                        </tr>
                                        <tr>
                                            <td>Kuruluş</td>
                                            {selected.map(s => <td key={s.id}>{s.founded_year || '-'}</td>)}
                                        </tr>
                                        <tr>
                                            <td>Website</td>
                                            {selected.map(s => (
                                                <td key={s.id}>
                                                    {s.website ? (
                                                        <a href={s.website} target="_blank" rel="noopener noreferrer">
                                                            Ziyaret Et
                                                        </a>
                                                    ) : '-'}
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                ) : (
                    <EmptyState
                        icon="⚖️"
                        title="Henüz Karşılaştırılacak Startup Yok"
                        description="Startup eklenince buradan karşılaştırabilirsiniz."
                        actionText="Startup'ları Görüntüle"
                        actionHref="/startups"
                    />
                )}
            </div>
        </div>
    );
}
