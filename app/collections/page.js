"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './collections.module.css';
import { LoadingState, EmptyState } from '@/components/StateComponents';

export default function CollectionsPage() {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const res = await fetch('/api/collections');
                const data = await res.json();
                setCollections(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching collections:', error);
                setCollections([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, []);

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <h1 className={styles.title}>📚 Koleksiyonlar</h1>
                        <p className={styles.subtitle}>
                            Küratörlenen startup listeleri
                        </p>
                    </div>
                </div>

                {/* Collections Grid */}
                {loading ? (
                    <LoadingState text="Koleksiyonlar yükleniyor..." />
                ) : collections.length > 0 ? (
                    <div className={styles.grid}>
                        {collections.map((collection) => (
                            <Link
                                key={collection.id}
                                href={`/collections/${collection.id}`}
                                className={styles.card}
                            >
                                <div className={styles.iconWrapper}>
                                    <span className={styles.icon}>{collection.icon || '📁'}</span>
                                </div>
                                <div className={styles.content}>
                                    <h2 className={styles.cardTitle}>{collection.name}</h2>
                                    <p className={styles.cardDescription}>
                                        {collection.description || 'Açıklama eklenmemiş'}
                                    </p>
                                    <div className={styles.meta}>
                                        <span className={styles.count}>
                                            {collection.item_count || 0} startup
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon="📚"
                        title="Henüz Koleksiyon Yok"
                        description="Şu an küratörlü koleksiyon bulunmamaktadır."
                    />
                )}
            </div>
        </div>
    );
}
