'use client';

import { useState } from 'react';
import styles from './NotificationBell.module.css';

const mockNotifications = [
    {
        id: 1,
        type: 'comment',
        message: 'Mehmet Yılmaz yorumladı: "Harika bir çözüm!"',
        time: '5 dakika önce',
        read: false,
        link: '/problems/1'
    },
    {
        id: 2,
        type: 'empathy',
        message: '15 kişi probleminize empati gösterdi',
        time: '1 saat önce',
        read: false,
        link: '/problems/2'
    },
    {
        id: 3,
        type: 'solution',
        message: 'Yeni çözüm önerisi aldınız',
        time: '3 saat önce',
        read: true,
        link: '/problems/1'
    },
    {
        id: 4,
        type: 'follow',
        message: 'Ayşe Demir sizi takip etmeye başladı',
        time: '1 gün önce',
        read: true,
        link: '/profile/ayse-demir'
    }
];

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(mockNotifications);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'comment':
                return '💬';
            case 'empathy':
                return '❤️';
            case 'solution':
                return '💡';
            case 'follow':
                return '👤';
            default:
                return '🔔';
        }
    };

    return (
        <div className={styles.notificationBell}>
            <button
                className={styles.bellButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Notifications"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                {unreadCount > 0 && (
                    <span className={styles.badge}>{unreadCount}</span>
                )}
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.header}>
                        <h3>Notifications</h3>
                        {unreadCount > 0 && (
                            <button onClick={markAllAsRead} className={styles.markAllRead}>
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div className={styles.list}>
                        {notifications.length === 0 ? (
                            <div className={styles.empty}>
                                <span className={styles.emptyIcon}>🔔</span>
                                <p>No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <a
                                    key={notification.id}
                                    href={notification.link}
                                    className={`${styles.item} ${!notification.read ? styles.unread : ''}`}
                                    onClick={() => {
                                        markAsRead(notification.id);
                                        setIsOpen(false);
                                    }}
                                >
                                    <span className={styles.icon}>{getIcon(notification.type)}</span>
                                    <div className={styles.content}>
                                        <p className={styles.message}>{notification.message}</p>
                                        <span className={styles.time}>{notification.time}</span>
                                    </div>
                                    {!notification.read && <span className={styles.dot}></span>}
                                </a>
                            ))
                        )}
                    </div>

                    <a href="/notifications" className={styles.viewAll}>
                        View All Notifications
                    </a>
                </div>
            )}
        </div>
    );
}
