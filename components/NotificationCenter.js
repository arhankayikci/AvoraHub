"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './NotificationCenter.module.css';

// Demo notifications for standalone use
const DEMO_NOTIFICATIONS = [
    { id: 1, type: 'follow', icon: '👤', title: 'Yeni Takipçi', message: 'TechVentures sizi takip etmeye başladı', time: '5 dk', read: false, link: '/investors/1' },
    { id: 2, type: 'upvote', icon: '⬆️', title: 'Yeni Oy', message: 'Probleminiz 50 oy aldı!', time: '1 sa', read: false, link: '/problems/1' },
    { id: 3, type: 'comment', icon: '💬', title: 'Yeni Yorum', message: 'Ali Yılmaz startup\'ınıza yorum yaptı', time: '3 sa', read: true, link: '/startups/1' },
    { id: 4, type: 'featured', icon: '🏆', title: 'Öne Çıkanlar', message: 'Günün Startup\'ı seçildiniz!', time: 'Dün', read: true, link: '/startups/1' },
];

export default function NotificationCenter({ notifications = DEMO_NOTIFICATIONS }) {
    const [isOpen, setIsOpen] = useState(false);
    const [localNotifications, setLocalNotifications] = useState(notifications);
    const dropdownRef = useRef(null);

    const unreadCount = localNotifications.filter(n => !n.read).length;

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAsRead = (id) => {
        setLocalNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllAsRead = () => {
        setLocalNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Bildirimler"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                {unreadCount > 0 && (
                    <span className={styles.badge}>{unreadCount > 9 ? '9+' : unreadCount}</span>
                )}
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.header}>
                        <h3>Bildirimler</h3>
                        {unreadCount > 0 && (
                            <button className={styles.markAll} onClick={markAllAsRead}>
                                Tümünü Okundu İşaretle
                            </button>
                        )}
                    </div>

                    <div className={styles.list}>
                        {localNotifications.length === 0 ? (
                            <div className={styles.empty}>
                                <span>🔔</span>
                                <p>Henüz bildirim yok</p>
                            </div>
                        ) : (
                            localNotifications.map(notification => (
                                <Link
                                    key={notification.id}
                                    href={notification.link || '#'}
                                    className={`${styles.item} ${!notification.read ? styles.unread : ''}`}
                                    onClick={() => {
                                        markAsRead(notification.id);
                                        setIsOpen(false);
                                    }}
                                >
                                    <span className={styles.icon}>{notification.icon}</span>
                                    <div className={styles.content}>
                                        <span className={styles.title}>{notification.title}</span>
                                        <span className={styles.message}>{notification.message}</span>
                                        <span className={styles.time}>{notification.time}</span>
                                    </div>
                                    {!notification.read && <span className={styles.dot}></span>}
                                </Link>
                            ))
                        )}
                    </div>

                    <div className={styles.footer}>
                        <Link href="/notifications" className={styles.viewAll}>
                            Tüm Bildirimleri Gör
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
