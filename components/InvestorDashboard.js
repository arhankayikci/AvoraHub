'use client';

import { useState, useEffect } from 'react';
import styles from './InvestorDashboard.module.css';

export default function InvestorDashboard() {
    const [stats, setStats] = useState(null);
    const [pipeline, setPipeline] = useState([]);
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch from API in future
        setLoading(false);
    }, []);

    if (loading || (!stats && pipeline.length === 0 && trending.length === 0)) {
        return null; // Don't show empty dashboard
    }

    return (
        <div className={styles.dashboard}>
            {/* Dashboard content would go here when data is available */}
            <p>Yatırımcı dashboard - veri yok</p>
        </div>
    );
}
