"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Delay showing for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptAll = () => {
        localStorage.setItem('cookieConsent', 'all');
        setIsVisible(false);
    };

    const acceptEssential = () => {
        localStorage.setItem('cookieConsent', 'essential');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <span className={styles.icon}>🍪</span>
                    <p>
                        Size daha iyi bir deneyim sunmak için çerezleri kullanıyoruz.{' '}
                        <Link href="/cookies" className={styles.link}>Daha fazla bilgi</Link>
                    </p>
                </div>
                <div className={styles.actions}>
                    <button onClick={acceptEssential} className={styles.btnSecondary}>
                        Sadece Gerekli
                    </button>
                    <button onClick={acceptAll} className={styles.btnPrimary}>
                        Tümünü Kabul Et
                    </button>
                </div>
            </div>
        </div>
    );
}
