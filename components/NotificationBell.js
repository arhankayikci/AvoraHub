'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useNotifications } from '@/contexts/NotificationContext';
import styles from './NotificationBell.module.css';

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

    const getIcon = (type) => {
        switch (type) {
            case 'comment':
                return '💬';
            case 'empathy':
            case 'like':
                return '❤️';
            case 'solution':
                return '💡';
            case 'follow':
                return '👤';
            case 'mention':
                return '📢';
            default:
                return '🔔';
        }
    };

    return (
        <div className={styles.notificationBell}>
            <button
                className={styles.bellButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Bildirimler"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                {unreadCount > 0 && (
                    <span className={styles.badge}>{unreadCount > 9 ? '9+' : unreadCount}</span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
                    <div className={styles.dropdown}>
                        <div className={styles.header}>
                            <h3>Bildirimler</h3>
                            {unreadCount > 0 && (
                                <button onClick={markAllAsRead} className={styles.markAllRead}>
                                    Tümünü okundu işaretle
                                </button>
                            )}
                        </div>

                        <div className={styles.list}>
                            {notifications.length === 0 ? (
                                <div className={styles.empty}>
                                    <span className={styles.emptyIcon}>🔔</span>
                                    <p>Henüz bildiriminiz yok</p>
                                    <span className={styles.emptySubtext}>
                                        Yeni aktiviteler burada görünecek
                                    </span>
                                </div>
                            ) : (
                                notifications.slice(0, 5).map((notification) => (
                                    <Link
                                        key={notification.id}
                                        href={notification.link || '#'}
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
                                    </Link>
                                ))
                            )}
                        </div>

                        {notifications.length > 0 && (
                            <Link href="/notifications" className={styles.viewAll} onClick={() => setIsOpen(false)}>
                                Tüm Bildirimleri Gör
                            </Link>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
