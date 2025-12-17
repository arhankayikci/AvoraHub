"use client";

import { useState } from 'react';
import styles from './StickyActionButton.module.css';

export default function StickyActionButton() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Show button after scrolling down
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            setIsVisible(window.scrollY > 300);
        });
    }

    const actions = [
        {
            label: 'Problem Paylaş',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
            ),
            href: '/submit-problem',
            color: '#ef4444'
        },
        {
            label: 'Startup Ekle',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
            ),
            href: '/submit-startup',
            color: '#3b82f6'
        },
        {
            label: 'Çözüm Öner',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4M12 8h.01"></path>
                </svg>
            ),
            href: '/solutions',
            color: '#10b981'
        }
    ];

    return (
        <div className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
            {isExpanded && (
                <div className={styles.actionsList}>
                    {actions.map((action, index) => (
                        <a
                            key={index}
                            href={action.href}
                            className={styles.actionItem}
                            style={{
                                '--delay': `${index * 0.05}s`,
                                '--color': action.color
                            }}
                        >
                            <span className={styles.actionLabel}>{action.label}</span>
                            <button className={styles.actionBtn}>
                                {action.icon}
                            </button>
                        </a>
                    ))}
                </div>
            )}

            <button
                className={`${styles.mainBtn} ${isExpanded ? styles.expanded : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label="Quick actions"
            >
                {isExpanded ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                )}
            </button>
        </div>
    );
}
