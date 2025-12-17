"use client";

import { useState } from 'react';
import styles from './notifications.module.css';

const DEMO_NOTIFICATIONS = [
    {
        id: 1,
        type: 'vote',
        title: 'Yeni oy aldınız!',
        message: 'Ahmet Y. "E-ticaret iade sorunu" probleminizi oyladı.',
        time: '5 dakika önce',
        read: false,
        icon: '👍'
    },
    {
        id: 2,
        type: 'comment',
        title: 'Yeni yorum',
        message: 'Elif K. startup\'ınıza yorum yaptı: "Harika bir fikir!"',
        time: '1 saat önce',
        read: false,
        icon: '💬'
    },
    {
        id: 3,
        type: 'follow',
        title: 'Yeni takipçi',
        message: 'Can Ö. sizi takip etmeye başladı.',
        time: '3 saat önce',
        read: true,
        icon: '👤'
    },
    {
        id: 4,
        type: 'mention',
        title: 'Bahsedildiniz',
        message: 'Selin A. bir yorumda sizden bahsetti.',
        time: '1 gün önce',
        read: true,
        icon: '📢'
    },
    {
        id: 5,
        type: 'system',
        title: 'Hoş geldiniz!',
        message: 'AvoraHub\'a katıldığınız için teşekkürler. Profilinizi tamamlayın.',
        time: '2 gün önce',
        read: true,
        icon: '🎉'
    },
];

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
    const [filter, setFilter] = useState('all');

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'unread') return !n.read;
        return true;
    });

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <h1 className={styles.title}>🔔 Bildirimler</h1>
                    <div className={styles.actions}>
                        <div className={styles.filters}>
                            <button
                                className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
                                onClick={() => setFilter('all')}
                            >
                                Tümü
                            </button>
                            <button
                                className={`${styles.filterBtn} ${filter === 'unread' ? styles.active : ''}`}
                                onClick={() => setFilter('unread')}
                            >
                                Okunmamış
                            </button>
                        </div>
                        <button className={styles.markAllBtn} onClick={markAllRead}>
                            Tümünü okundu işaretle
                        </button>
                    </div>
                </div>

                <div className={styles.list}>
                    {filteredNotifications.length === 0 ? (
                        <div className={styles.empty}>
                            <span className={styles.emptyIcon}>📭</span>
                            <p>Bildirim yok</p>
                        </div>
                    ) : (
                        filteredNotifications.map(notification => (
                            <div
                                key={notification.id}
                                className={`${styles.item} ${!notification.read ? styles.unread : ''}`}
                                onClick={() => markAsRead(notification.id)}
                            >
                                <span className={styles.icon}>{notification.icon}</span>
                                <div className={styles.content}>
                                    <h3 className={styles.itemTitle}>{notification.title}</h3>
                                    <p className={styles.message}>{notification.message}</p>
                                    <span className={styles.time}>{notification.time}</span>
                                </div>
                                {!notification.read && <span className={styles.unreadDot}></span>}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
