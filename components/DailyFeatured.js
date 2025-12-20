'use client';

import { useState, useEffect } from 'react';
import styles from './DailyFeatured.module.css';
import Link from 'next/link';

export function DailyFeaturedStartup() {
    const [startup, setStartup] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await fetch('/api/startups?sort=popular');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setStartup(data[0]);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    if (loading || !startup) {
        return null;
    }

    return (
        <div className={styles.featuredCard}>
            <h3>{startup.name}</h3>
            <p>{startup.tagline}</p>
            <Link href={`/startups/${startup.id}`}>Detaylara Git →</Link>
        </div>
    );
}

export function DailyFeaturedProblem() {
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await fetch('/api/problems?sort=votes');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setProblem(data[0]);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    if (loading || !problem) {
        return null;
    }

    return (
        <div className={styles.featuredCard}>
            <h3>{problem.title}</h3>
            <p>{problem.description}</p>
            <Link href={`/problems/${problem.id}`}>Detaylara Git →</Link>
        </div>
    );
}
