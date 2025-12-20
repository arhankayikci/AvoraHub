"use client";

import { useState, createContext, useContext } from 'react';

// Notification Context
const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
    // Start with empty notifications - no demo data
    const [notifications, setNotifications] = useState([]);

    const addNotification = (notification) => {
        const newNotification = {
            id: Date.now(),
            ...notification,
            time: 'Şimdi',
            read: false
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(n => ({ ...n, read: true }))
        );
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{
            notifications,
            addNotification,
            markAsRead,
            markAllAsRead,
            clearNotifications,
            unreadCount
        }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) {
        return {
            notifications: [],
            addNotification: () => { },
            markAsRead: () => { },
            markAllAsRead: () => { },
            clearNotifications: () => { },
            unreadCount: 0
        };
    }
    return context;
}

export default NotificationContext;
