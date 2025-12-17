import styles from './EmptyState.module.css';

export default function EmptyState({
    icon,
    title,
    description,
    action,
    variant = 'default'
}) {
    const defaultIcons = {
        problems: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
        ),
        search: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
            </svg>
        ),
        notifications: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
        ),
        generic: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 11H3v2h6m-6 7h18M3 6h18M10 14l2 2 4-4"></path>
            </svg>
        )
    };

    return (
        <div className={`${styles.emptyState} ${styles[variant]}`}>
            <div className={styles.iconWrapper}>
                {icon || defaultIcons[variant] || defaultIcons.generic}
            </div>
            <h3 className={styles.title}>{title}</h3>
            {description && <p className={styles.description}>{description}</p>}
            {action && (
                <div className={styles.actionWrapper}>
                    {action}
                </div>
            )}
        </div>
    );
}
