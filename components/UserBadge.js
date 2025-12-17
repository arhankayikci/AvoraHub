"use client";

import styles from './UserBadge.module.css';
import { BADGE_TYPES, FEATURED_BADGES } from './BadgeSystem';

// Tek rozet gösterimi
export function Badge({ badge, size = 'sm', showTooltip = true }) {
    const sizeClass = styles[size] || styles.sm;

    return (
        <span
            className={`${styles.badge} ${sizeClass}`}
            style={{ backgroundColor: badge.color }}
            title={showTooltip ? `${badge.name}: ${badge.description}` : undefined}
        >
            <span className={styles.icon}>{badge.icon}</span>
            {size !== 'xs' && <span className={styles.name}>{badge.name}</span>}
        </span>
    );
}

// Featured rozet (Günün Startup'ı / Problemi)
export function FeaturedBadge({ type }) {
    const badge = FEATURED_BADGES[type];
    if (!badge) return null;

    return (
        <span
            className={styles.featuredBadge}
            style={{ background: badge.gradient }}
        >
            <span className={styles.icon}>{badge.icon}</span>
            <span className={styles.name}>{badge.name}</span>
        </span>
    );
}

// Rozet listesi
export function BadgeList({ badges, max = 3, size = 'sm' }) {
    if (!badges || badges.length === 0) return null;

    const displayBadges = badges.slice(0, max);
    const remaining = badges.length - max;

    return (
        <div className={styles.badgeList}>
            {displayBadges.map((badge, index) => (
                <Badge key={badge.id || index} badge={badge} size={size} />
            ))}
            {remaining > 0 && (
                <span className={styles.moreBadges}>+{remaining}</span>
            )}
        </div>
    );
}

// Profil sayfası için rozet vitrini
export function BadgeShowcase({ badges, title = "Rozetler" }) {
    if (!badges || badges.length === 0) {
        return (
            <div className={styles.showcase}>
                <h3 className={styles.showcaseTitle}>{title}</h3>
                <p className={styles.emptyState}>Henüz rozet kazanılmadı</p>
            </div>
        );
    }

    return (
        <div className={styles.showcase}>
            <h3 className={styles.showcaseTitle}>{title}</h3>
            <div className={styles.showcaseGrid}>
                {badges.map((badge, index) => (
                    <div key={badge.id || index} className={styles.showcaseItem}>
                        <div
                            className={styles.showcaseIcon}
                            style={{ backgroundColor: `${badge.color}20` }}
                        >
                            <span>{badge.icon}</span>
                        </div>
                        <div className={styles.showcaseInfo}>
                            <span className={styles.showcaseName}>{badge.name}</span>
                            <span className={styles.showcaseDesc}>{badge.description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Badge;
