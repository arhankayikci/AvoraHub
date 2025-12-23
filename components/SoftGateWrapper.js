"use client";

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import styles from './SoftGateWrapper.module.css';

// Client-side soft gating wrapper that shows login wall for unauthenticated users
export default function SoftGateWrapper({ children, title = "Detayları Görmek İçin Giriş Yapın" }) {
    const { user, loading } = useAuth();

    // Show loading state briefly
    if (loading) {
        return <>{children}</>;
    }

    // User is logged in - show full content
    if (user) {
        return <>{children}</>;
    }

    // User is not logged in - show content with blur overlay
    return (
        <div className={styles.gatedContainer}>
            <div className={styles.blurContent}>
                {children}
            </div>
            <div className={styles.loginWall}>
                <div className={styles.lockIcon}>🔒</div>
                <h3 className={styles.loginTitle}>{title}</h3>
                <p className={styles.loginDescription}>
                    Tam içeriği görüntülemek için ücretsiz üye olun veya giriş yapın.
                </p>
                <div className={styles.loginButtons}>
                    <Link href="/register" className={styles.registerBtn}>
                        Ücretsiz Üye Ol
                    </Link>
                    <Link href="/login" className={styles.loginBtn}>
                        Giriş Yap
                    </Link>
                </div>
            </div>
        </div>
    );
}
