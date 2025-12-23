"use client";

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import styles from './NotificationDropdown.module.css';

export default function NotificationDropdown() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef(null);

    // Fetch notifications
    useEffect(() => {
        if (!user?.id || !supabase) {
            setLoading(false);
            return;
        }

        fetchNotifications();

        // Poll every 30 seconds for updates
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, [user?.id]);

    const fetchNotifications = async () => {
        if (!user?.id || !supabase) return;

        try {
            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(10);

            if (error) throw error;

            setNotifications(data || []);
            setUnreadCount((data || []).filter(n => !n.is_read).length);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Mark single as read when dropdown opens
    const markAllAsRead = async () => {
        if (!user?.id || !supabase || unreadCount === 0) return;

        try {
            const { error } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('user_id', user.id)
                .eq('is_read', false);

            if (error) throw error;

            // Update local state
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    };

    // Format time ago
    const formatTimeAgo = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'az önce';
        if (diffMins < 60) return `${diffMins} dk`;
        if (diffHours < 24) return `${diffHours} sa`;
        if (diffDays < 7) return `${diffDays} gün`;
        return date.toLocaleDateString('tr-TR');
    };

    // Get icon for notification type
    const getNotificationIcon = (type) => {
        const icons = {
            'application': '📋',
            'interview': '📅',
            'offer': '🎉',
            'rejected': '❌',
            'message': '💬',
            'system': '🔔'
        };
        return icons[type] || '🔔';
    };

    if (!user) return null;

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button
                className={styles.bellButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Bildirimler"
            >
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadCount > 0 && (
                    <span className={styles.badge}>
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.dropdownHeader}>
                        <h3>Bildirimler</h3>
                        {unreadCount > 0 && (
                            <button
                                className={styles.markAllBtn}
                                onClick={markAllAsRead}
                            >
                                Hepsini okundu işaretle
                            </button>
                        )}
                    </div>

                    <div className={styles.notificationsList}>
                        {loading ? (
                            <div className={styles.loadingState}>
                                <span>Yükleniyor...</span>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className={styles.emptyState}>
                                <span className={styles.emptyIcon}>🔔</span>
                                <p>Henüz bildirim yok</p>
                            </div>
                        ) : (
                            notifications.slice(0, 5).map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`${styles.notificationItem} ${!notification.is_read ? styles.unread : ''}`}
                                >
                                    <span className={styles.notificationIcon}>
                                        {getNotificationIcon(notification.type)}
                                    </span>
                                    <div className={styles.notificationContent}>
                                        <p className={styles.notificationTitle}>
                                            {notification.title}
                                        </p>
                                        {notification.message && (
                                            <p className={styles.notificationMessage}>
                                                {notification.message}
                                            </p>
                                        )}
                                        <span className={styles.notificationTime}>
                                            {formatTimeAgo(notification.created_at)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {notifications.length > 5 && (
                        <div className={styles.dropdownFooter}>
                            <Link href="/notifications" className={styles.viewAllLink}>
                                Tüm bildirimleri gör →
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
