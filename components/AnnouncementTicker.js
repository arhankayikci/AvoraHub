"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './AnnouncementTicker.module.css';

const TICKER_ITEMS = [
    {
        id: 1,
        type: 'startup',
        icon: '🏆',
        label: "Günün Startup'ı",
        title: "ChargeHub Brasil",
        category: "Ulaşım",
        href: "/startups/1"
    },
    {
        id: 2,
        type: 'problem',
        icon: '🎯',
        label: "Günün Problemi",
        title: "Uygun fiyatlı sağlık hizmeti erişimi",
        category: "Sağlık",
        href: "/problems/2"
    },
    {
        id: 3,
        type: 'stat',
        icon: '📈',
        label: "Bugün",
        title: "12 yeni startup, 45 yeni problem paylaşıldı",
        href: "/startups"
    }
];

export default function AnnouncementTicker() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % TICKER_ITEMS.length);
        }, 5000); // 5 saniyede bir değiş

        return () => clearInterval(interval);
    }, []);

    if (!isVisible) return null;

    const currentItem = TICKER_ITEMS[currentIndex];

    return (
        <div className={styles.ticker}>
            <div className={styles.content}>
                <Link href={currentItem.href} className={styles.item}>
                    <span className={styles.icon}>{currentItem.icon}</span>
                    <span className={styles.label}>{currentItem.label}:</span>
                    <span className={styles.title}>{currentItem.title}</span>
                    {currentItem.category && (
                        <span className={styles.category}>{currentItem.category}</span>
                    )}
                </Link>

                <div className={styles.dots}>
                    {TICKER_ITEMS.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <button
                className={styles.closeBtn}
                onClick={() => setIsVisible(false)}
                aria-label="Kapat"
            >
                ×
            </button>
        </div>
    );
}
