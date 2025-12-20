'use client';

import { useState, useEffect } from 'react';
import styles from './CreatorDashboard.module.css';

export default function CreatorDashboard() {
    const [stats, setStats] = useState(null);
    const [content, setContent] = useState([]);
    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch from API in future
        setLoading(false);
    }, []);

    if (loading || (!stats && content.length === 0 && activity.length === 0)) {
        return null; // Don't show empty dashboard
    }

    return (
        <div className={styles.dashboard}>
            {/* Dashboard content would go here when data is available */}
            <p>Creator dashboard - veri yok</p>
        </div>
    );
}
