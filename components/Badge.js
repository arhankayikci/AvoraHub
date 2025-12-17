import styles from './Badge.module.css';

const badgeConfig = {
    early_adopter: {
        label: 'Early Adopter',
        labelTr: 'Erken Katılan',
        icon: '⭐',
        color: '#8b5cf6',
        description: 'Joined within first 1000 users'
    },
    problem_hunter: {
        label: 'Problem Hunter',
        labelTr: 'Problem Avcısı',
        icon: '🎯',
        color: '#f59e0b',
        description: 'Shared 5+ problems'
    },
    active_contributor: {
        label: 'Active Contributor',
        labelTr: 'Aktif Katılımcı',
        icon: '🔥',
        color: '#10b981',
        description: '20+ contributions'
    },
    verified: {
        label: 'Verified',
        labelTr: 'Doğrulanmış',
        icon: '✓',
        color: '#3b82f6',
        description: 'Email verified account'
    },
    solution_master: {
        label: 'Solution Master',
        labelTr: 'Çözüm Ustası',
        icon: '💡',
        color: '#ec4899',
        description: '10+ solutions proposed'
    },
    community_hero: {
        label: 'Community Hero',
        labelTr: 'Topluluk Kahramanı',
        icon: '🏆',
        color: '#f43f5e',
        description: '100+ empathies received'
    }
};

export default function Badge({ type, size = 'medium', showLabel = false, locale = 'en' }) {
    const badge = badgeConfig[type];
    if (!badge) return null;

    const label = locale === 'tr' ? badge.labelTr : badge.label;

    return (
        <div
            className={`${styles.badge} ${styles[size]}`}
            style={{ '--badge': badge.color }}
            title={badge.description}
        >
            <span className={styles.icon}>{badge.icon}</span>
            {showLabel && <span className={styles.label}>{label}</span>}
        </div>
    );
}

export function BadgeList({ badges, size = 'small', maxDisplay = 3, locale = 'en' }) {
    const displayBadges = badges.slice(0, maxDisplay);
    const remaining = badges.length - maxDisplay;

    return (
        <div className={styles.badgeList}>
            {displayBadges.map((badgeType) => (
                <Badge
                    key={badgeType}
                    type={badgeType}
                    size={size}
                    locale={locale}
                />
            ))}
            {remaining > 0 && (
                <span className={styles.remaining}>+{remaining}</span>
            )}
        </div>
    );
}
