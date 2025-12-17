"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './ActivityFeed.module.css';

const mockActivities = [
    {
        id: 1,
        userName: 'Ayşe Demir',
        userAvatar: null,
        action: 'commented',
        targetType: 'problem',
        targetTitle: 'Üniversite öğrencileri için uygun fiyatlı konaklama',
        timestamp: new Date(Date.now() - 2 * 60 * 1000)
    },
    {
        id: 2,
        userName: 'Mehmet Yılmaz',
        userAvatar: null,
        action: 'empathized',
        targetType: 'problem',
        targetTitle: 'Şehir içi ulaşımda karbon ayak izi',
        timestamp: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
        id: 3,
        userName: 'Zeynep Kaya',
        userAvatar: null,
        action: 'shared',
        targetType: 'problem',
        targetTitle: 'Yerel üreticiler için dijital pazar yeri',
        timestamp: new Date(Date.now() - 45 * 60 * 1000)
    },
    {
        id: 4,
        userName: 'Can Öztürk',
        userAvatar: null,
        action: 'proposed_solution',
        targetType: 'problem',
        targetTitle: 'Gıda israfını azaltma platformu',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
];

export default function ActivityFeed({ maxItems = 5 }) {
    const [activities, setActivities] = useState(mockActivities.slice(0, maxItems));

    const getActionText = (action) => {
        const actions = {
            commented: { text: 'yorum yaptı', icon: '💬', color: '#3b82f6' },
            empathized: { text: 'empati kurdu', icon: '❤️', color: '#ef4444' },
            shared: { text: 'paylaştı', icon: '📝', color: '#10b981' },
            proposed_solution: { text: 'çözüm önerdi', icon: '💡', color: '#f59e0b' },
            upvoted: { text: 'beğendi', icon: '👍', color: '#8b5cf6' }
        };
        return actions[action] || actions.commented;
    };

    const getRelativeTime = (timestamp) => {
        const seconds = Math.floor((new Date() - timestamp) / 1000);

        if (seconds < 60) return 'Az önce';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} dakika önce`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} saat önce`;
        return `${Math.floor(seconds / 86400)} gün önce`;
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className={styles.feed}>
            <div className={styles.header}>
                <h3 className={styles.title}>Recent Activity</h3>
                <Link href="/activity" className={styles.viewAll}>
                    View All
                </Link>
            </div>

            <div className={styles.activityList}>
                {activities.map((activity, index) => {
                    const actionData = getActionText(activity.action);

                    return (
                        <div
                            key={activity.id}
                            className={styles.activityItem}
                            style={{ '--delay': `${index * 0.1}s` }}
                        >
                            <div className={styles.avatar}>
                                {activity.userAvatar ? (
                                    <img src={activity.userAvatar} alt={activity.userName} />
                                ) : (
                                    <span className={styles.initials}>
                                        {getInitials(activity.userName)}
                                    </span>
                                )}
                            </div>

                            <div className={styles.content}>
                                <p className={styles.text}>
                                    <strong>{activity.userName}</strong>
                                    {' '}
                                    <span
                                        className={styles.action}
                                        style={{ color: actionData.color }}
                                    >
                                        {actionData.icon} {actionData.text}
                                    </span>
                                    {' '}
                                    <Link
                                        href={`/problems/${activity.id}`}
                                        className={styles.target}
                                    >
                                        {activity.targetTitle}
                                    </Link>
                                </p>
                                <span className={styles.time}>
                                    {getRelativeTime(activity.timestamp)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
