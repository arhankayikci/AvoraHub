"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Collections.module.css';

export function CollectionCard({ collection }) {
    return (
        <Link href={`/collections/${collection.id}`} className={styles.card}>
            <div
                className={styles.iconWrapper}
                style={{ backgroundColor: `${collection.color}15` }}
            >
                <span className={styles.icon}>{collection.icon}</span>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{collection.title}</h3>
                <p className={styles.description}>{collection.description}</p>
                <div className={styles.meta}>
                    <span className={styles.count}>{collection.itemCount} startup</span>
                    <span className={styles.curator}>@{collection.curator}</span>
                </div>
            </div>
        </Link>
    );
}

export default function Collections({ title = "Koleksiyonlar" }) {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const res = await fetch('/api/collections');
                if (res.ok) {
                    const data = await res.json();
                    setCollections(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error('Error fetching collections:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCollections();
    }, []);

    if (loading) {
        return null;
    }

    if (collections.length === 0) {
        return null; // Don't render section if no collections
    }

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.sectionTitle}>📚 {title}</h2>
                <Link href="/collections" className={styles.viewAll}>
                    Tümünü Gör →
                </Link>
            </div>
            <div className={styles.grid}>
                {collections.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
            </div>
        </section>
    );
}
