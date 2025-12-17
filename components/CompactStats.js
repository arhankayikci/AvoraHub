'use client';

import styles from './CompactStats.module.css';

const stats = [
    { label: 'Active Problems', value: '234', icon: '🎯', color: '#3b82f6' },
    { label: 'Solutions Proposed', value: '156', icon: '💡', color: '#10b981' },
    { label: 'Startups', value: '89', icon: '🚀', color: '#8b5cf6' },
    { label: 'Investors', value: '47', icon: '💰', color: '#f59e0b' }
];

export default function CompactStats() {
    return (
        <div className={styles.statsBar}>
            {stats.map((stat, index) => (
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
