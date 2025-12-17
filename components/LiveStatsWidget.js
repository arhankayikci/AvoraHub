"use client";

import { useState, useEffect } from 'react';
import styles from './LiveStatsWidget.module.css';

const mockStats = {
    newProblemsToday: 15,
    activeDiscussions: 28,
    onlineUsers: 127,
    solutionsProposed: 34
};

export default function LiveStatsWidget() {
    const [stats, setStats] = useState(mockStats);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        // Simulate live updates every 30 seconds
        const interval = setInterval(() => {
            setStats(prev => ({
                newProblemsToday: prev.newProblemsToday + Math.floor(Math.random() * 2),
                activeDiscussions: prev.activeDiscussions + Math.floor(Math.random() * 3) - 1,
                onlineUsers: prev.onlineUsers + Math.floor(Math.random() * 10) - 5,
                solutionsProposed: prev.solutionsProposed + Math.floor(Math.random() * 2)
            }));
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const statItems = [
        {
            label: 'New Problems',
            sublabel: 'Today',
            value: stats.newProblemsToday,
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            ),
            color: '#3b82f6'
        },
        {
            label: 'Active ',
            sublabel: 'Discussions',
            value: stats.activeDiscussions,
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            ),
            color: '#8b5cf6'
        },
        {
            label: 'Online',
            sublabel: 'Users',
            value: stats.onlineUsers,
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            ),
            color: '#10b981',
            pulse: true
        },
        {
            label: 'Solutions',
            sublabel: 'Proposed',
            value: stats.solutionsProposed,
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            ),
            color: '#f59e0b'
        }
    ];

    return (
        <div className={`${styles.widget} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.header}>
                <h3 className={styles.title}>Live Stats</h3>
                <span className={styles.liveDot}>
                    <span className={styles.ping}></span>
                    Live
                </span>
            </div>

            <div className={styles.statsGrid}>
                {statItems.map((stat, index) => (
                    <div
                        key={index}
                        className={styles.statCard}
                        style={{ '--delay': `${index * 0.1}s` }}
                    >
                        <div
                            className={styles.iconWrapper}
                            style={{ backgroundColor: `${stat.color}15` }}
                        >
                            <div style={{ color: stat.color }}>
                                {stat.icon}
                            </div>
                            {stat.pulse && <span className={styles.pulse}></span>}
                        </div>
                        <div className={styles.statInfo}>
                            <div className={styles.value}>{stat.value}</div>
                            <div className={styles.label}>
                                {stat.label}
                                <span className={styles.sublabel}>{stat.sublabel}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
