"use client";

import Link from 'next/link';
import styles from './FreemiumGate.module.css';

export default function FreemiumGate({ isAuthenticated, items, children, listType = 'items' }) {
    const GUEST_LIMIT = 3;
    const showGate = !isAuthenticated && items && items.length > GUEST_LIMIT;

    if (!showGate) {
        return <>{children}</>;
    }

    const hiddenCount = items.length - GUEST_LIMIT;

    return (
        <div className={styles.container}>
            {children}

            {/* Blur Overlay Card */}
            <div className={styles.gateCard}>
                <div className={styles.lockIcon}>🔒</div>
                <h3 className={styles.title}>
                    {hiddenCount} {listType} daha görmek için giriş yapın
                </h3>
                <p className={styles.description}>
                    {listType === 'iş ilanı' && 'Binlerce kariyer fırsatına ulaşın'}
                    {listType === 'startup' && '500+ girişimi keşfedin ve yatırım fırsatlarını yakalayın'}
                    {listType === 'problem' && 'Çözüm bekleyen problemleri görün ve katkıda bulunun'}
                    {listType === 'items' && 'Tüm içeriğe sınırsız erişim'}
                </p>

                <div className={styles.benefits}>
                    <div className={styles.benefit}>
                        <span className={styles.checkmark}>✓</span>
                        <span>Sınırsız erişim</span>
                    </div>
                    <div className={styles.benefit}>
                        <span className={styles.checkmark}>✓</span>
                        <span>İlan verebilme</span>
                    </div>
                    <div className={styles.benefit}>
                        <span className={styles.checkmark}>✓</span>
                        <span>Networking imkanı</span>
                    </div>
                </div>

                <Link href="/login" className={styles.loginBtn}>
                    🔐 Ücretsiz Giriş Yap
                </Link>

                <p className={styles.signupLink}>
                    Hesabınız yok mu?{' '}
                    <Link href="/signup">Hemen kayıt olun</Link>
                </p>
            </div>
        </div>
    );
}
