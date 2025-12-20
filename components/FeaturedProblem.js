'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './FeaturedProblem.module.css';
import EmpathyButton from './EmpathyButton';

export default function FeaturedProblem() {
    const [featured, setFeatured] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await fetch('/api/problems?sort=votes');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setFeatured({
                            ...data[0],
                            empathyCount: data[0].votes || 0,
                            comments: data[0].comments || 0,
                            author: data[0].author || 'Anonim',
                            badge: 'Problem of the Day',
                            trending: '+125% today'
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching featured problem:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    if (loading) {
        return null;
    }

    if (!featured) {
        return null; // Don't show anything if no featured problem
    }

    return (
        <div className={styles.featuredCard}>
            <div className={styles.badge}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                {featured.badge}
            </div>

            <Link href={`/problems/${featured.id}`} className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{featured.title}</h3>
                    <span className={styles.trending}>{featured.trending}</span>
                </div>

                <p className={styles.description}>{featured.description}</p>

                <div className={styles.footer}>
                    <div className={styles.meta}>
                        <span className={styles.category}>{featured.category}</span>
                        <span className={styles.author}>by {featured.author}</span>
                    </div>

                    <div className={styles.stats}>
                        <EmpathyButton
                            initialCount={featured.empathyCount}
                            size="small"
                        />
                        <span className={styles.comments}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            {featured.comments}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
