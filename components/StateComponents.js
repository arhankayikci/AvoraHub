"use client";

import styles from './ErrorBoundary.module.css';

export function ErrorState({ error, onRetry }) {
    return (
        <div className={styles.errorState}>
            <div className={styles.errorIcon}>⚠️</div>
            <h3>Bir Hata Oluştu</h3>
            <p>{error || 'Veriler yüklenirken bir sorun oluştu.'}</p>
            {onRetry && (
                <button onClick={onRetry} className="btn btn-primary">
                    🔄 Tekrar Dene
                </button>
            )}
        </div>
    );
}

export function LoadingState({ text = 'Yükleniyor...' }) {
    return (
        <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>{text}</p>
        </div>
    );
}

export function EmptyState({
    icon = '📭',
    title = 'Henüz İçerik Yok',
    description,
    actionText,
    actionHref,
    onAction
}) {
    return (
        <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>{icon}</div>
            <h3>{title}</h3>
            {description && <p>{description}</p>}
            {(actionText && (actionHref || onAction)) && (
                actionHref ? (
                    <a href={actionHref} className="btn btn-primary">
                        {actionText}
                    </a>
                ) : (
                    <button onClick={onAction} className="btn btn-primary">
                        {actionText}
                    </button>
                )
            )}
        </div>
    );
}
