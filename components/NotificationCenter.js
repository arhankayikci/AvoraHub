'use client';

import { useState, useEffect } from 'react';
import styles from './NotificationCenter.module.css';

export default function NotificationCenter() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch from API or NotificationContext
        // For now, empty
        setLoading(false);
    }, []);

    if (loading || notifications.length === 0) {
        return null;
    }

    return (
        <div className={styles.center}>
            {/* Notification content would go here */}
        </div>
    );
}
