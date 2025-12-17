"use client";

import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.glitchWrapper}>
                    <div className={styles.errorCode}>404</div>
                </div>

                <h1 className={styles.title}>Sayfa Bulunamadı</h1>
                <p className={styles.description}>
                    Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                </p>

                <div className={styles.suggestions}>
                    <h3>Bunları deneyebilirsiniz:</h3>
                    <div className={styles.suggestionCards}>
                        <Link href="/" className={styles.suggestionCard}>
                            <span className={styles.suggestionIcon}>🏠</span>
                            <span>Ana Sayfa</span>
                        </Link>
                        <Link href="/problems" className={styles.suggestionCard}>
                            <span className={styles.suggestionIcon}>💡</span>
                            <span>Problemler</span>
                        </Link>
                        <Link href="/startups" className={styles.suggestionCard}>
                            <span className={styles.suggestionIcon}>🚀</span>
                            <span>Startuplar</span>
                        </Link>
                        <Link href="/help" className={styles.suggestionCard}>
                            <span className={styles.suggestionIcon}>❓</span>
                            <span>Yardım</span>
                        </Link>
                    </div>
                </div>

                <div className={styles.contactNote}>
                    <p>Bu bir hata olduğunu düşünüyorsanız,</p>
                    <Link href="/contact">bize bildirin →</Link>
                </div>
            </div>
        </div>
    );
}
