import Link from 'next/link';
import styles from './LockedItemCard.module.css';

export default function LockedItemCard({
    type = 'içerik',
    title = null,
    subtitle = null
}) {
    return (
        <div className={styles.lockedCard}>
            <div className={styles.lockOverlay}>
                <div className={styles.lockIcon}>🔒</div>
            </div>

            <div className={styles.content}>
                {title && <h4 className={styles.title}>{title}</h4>}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

                <div className={styles.blurredContent}>
                    <div className={styles.blurLine}></div>
                    <div className={styles.blurLine}></div>
                    <div className={styles.blurLine}></div>
                </div>

                <div className={styles.unlockPrompt}>
                    <p className={styles.message}>
                        Bu {type} kilitli
                    </p>
                    <Link href="/login" className={styles.unlockBtn}>
                        🔓 Kilidi Aç
                    </Link>
                </div>
            </div>
        </div>
    );
}
