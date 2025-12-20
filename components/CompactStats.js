'use client';

import { useState, useEffect } from 'react';
import styles from './CompactStats.module.css';

export default function CompactStats() {
    const [stats, setStats] = useState({
        problems: 0,
        startups: 0,
        mentors: 0,
        users: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch real counts from API
                const [problemsRes, startupsRes, mentorsRes] = await Promise.all([
                    fetch('/api/problems'),
                    fetch('/api/startups'),
                    fetch('/api/mentors')
                ]);

                const problems = await problemsRes.json();
                const startups = await startupsRes.json();
                const mentors = await mentorsRes.json();

                setStats({
                    problems: Array.isArray(problems) ? problems.length : 0,
                    startups: Array.isArray(startups) ? startups.length : 0,
                    mentors: Array.isArray(mentors) ? mentors.length : 0,
                    users: 0 // Users API'si yok şimdilik
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return null;
    }

    // Don't show if all stats are 0
    if (stats.problems === 0 && stats.startups === 0 && stats.mentors === 0) {
        return null;
    }

    const statsArray = [
        { label: 'Problemler', value: stats.problems, icon: '🎯', color: '#3b82f6' },
        { label: 'Çözümler', value: stats.startups, icon: '💡', color: '#10b981' },
        { label: 'Mentörler', value: stats.mentors, icon: '🚀', color: '#8b5cf6' },
        { label: 'Kullanıcılar', value: stats.users, icon: '💰', color: '#f59e0b' }
    ].filter(stat => stat.value > 0); // Only show non-zero stats

    if (statsArray.length === 0) {
        return null;
    }

    return (
        <div className={styles.statsBar}>
            {statsArray.map((stat, index) => (
                <div
                    key={index}
                    className={styles.statItem}
                    style={{ '--stat-color': stat.color }}
                >
                    <span className={styles.icon}>{stat.icon}</span>
                    <div className={styles.data}>
                        <div className={styles.value}>{stat.value}</div>
                        <div className={styles.label}>{stat.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
