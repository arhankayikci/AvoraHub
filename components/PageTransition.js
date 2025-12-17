"use client";

import { useState, useEffect } from 'react';
import styles from './PageTransition.module.css';

export default function PageTransition({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Simulate initial page load
        const timer = setTimeout(() => {
            setIsLoading(false);
            setTimeout(() => setIsVisible(true), 50);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className={styles.loadingScreen}>
                <div className={styles.loadingContent}>
                    <div className={styles.logoAnimation}>
                        <span className={styles.logoAvora}>AVORA</span>
                        <span className={styles.logoHub}>HUB</span>
                    </div>
                    <div className={styles.loadingBar}>
                        <div className={styles.loadingProgress}></div>
                    </div>
                    <p className={styles.loadingText}>Yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.pageContent} ${isVisible ? styles.visible : ''}`}>
            {children}
        </div>
    );
}
