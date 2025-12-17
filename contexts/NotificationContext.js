"use client";

import { useState, useEffect, createContext, useContext } from 'react';

// Notification Context
const NotificationContext = createContext(null);

// Demo notifications
const DEMO_NOTIFICATIONS = [
    {
        id: 1,
        type: 'follow',
        icon: '👤',
        title: 'Yeni Takipçi',
        message: 'TechVentures sizi takip etmeye başladı',
        time: '5 dakika önce',
        read: false,
        link: '/profile/techventures'
    },
    {
        id: 2,
        type: 'upvote',
        icon: '⬆️',
        title: 'Yeni Oy',
        message: 'Probleminiz 50 oy aldı!',
        time: '1 saat önce',
        read: false,
        link: '/problems/1'
    },
    {
        id: 3,
        type: 'comment',
        icon: '💬',
        title: 'Yeni Yorum',
        message: 'Ali Yılmaz startup\'ınıza yorum yaptı',
        time: '3 saat önce',
        read: true,
        link: '/startups/1'
    },
    {
        id: 4,
        type: 'featured',
        icon: '🏆',
        title: 'Öne Çıkanlar',
        message: 'Startup\'ınız Günün Startup\'ı seçildi!',
        time: 'Dün',
        read: true,
        link: '/startups/1'
    },
    {
        id: 5,
        type: 'investor',
        icon: '💰',
        title: 'Yatırımcı İlgisi',
        message: 'Bir yatırımcı profilinizi inceledi',
        time: '2 gün önce',
        read: true,
        link: '/dashboard'
    }
];

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const count = notifications.filter(n => !n.read).length;
        setUnreadCount(count);
    }, [notifications]);

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const addNotification = (notification) => {
        const newNotification = {
            id: Date.now(),
            read: false,
            time: 'Şimdi',
            ...notification
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            markAsRead,
            markAllAsRead,
            addNotification,
            removeNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
}

export default NotificationProvider;
