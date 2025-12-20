'use client';

import { useState, useEffect } from 'react';
import styles from './MakerAMA.module.css';
import Link from 'next/link';

export default function MakerAMA() {
    const [amas, setAmas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In future, fetch from API
        // For now, return empty
        setLoading(false);
    }, []);

    if (loading) {
        return null;
    }

    if (amas.length === 0) {
        return null; // Don't show section if no AMAs
    }

    return (
        <section className={styles.amaSection}>
            <div className={styles.header}>
                <h2 className={styles.title}>🎤 Maker AMA</h2>
                <Link href="/ama" className={styles.viewAll}>
                    Tümünü Gör →
                </Link>
            </div>
            <div className={styles.grid}>
                {amas.map(ama => (
                    <div key={ama.id} className={styles.amaCard}>
                        {/* AMA card content */}
                    </div>
                ))}
            </div>
        </section>
    );
}
