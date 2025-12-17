"use client";

import { useState } from 'react';
import styles from './FollowButton.module.css';

// Standalone Follow Button (context olmadan da çalışır)
export default function FollowButton({
    entityType = 'user',
    entityId,
    entityName = '',
    initialFollowing = false,
    size = 'md',
    onFollow,
    onUnfollow
}) {
    const [isFollowing, setIsFollowing] = useState(initialFollowing);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsLoading(true);

        // Simüle API call
        await new Promise(resolve => setTimeout(resolve, 300));

        if (isFollowing) {
            setIsFollowing(false);
            onUnfollow?.(entityType, entityId);
        } else {
            setIsFollowing(true);
            onFollow?.(entityType, entityId, entityName);
        }

        setIsLoading(false);
    };

    const sizeClass = styles[size] || styles.md;

    return (
        <button
            className={`${styles.button} ${sizeClass} ${isFollowing ? styles.following : ''}`}
            onClick={handleClick}
            disabled={isLoading}
            aria-label={isFollowing ? 'Takibi bırak' : 'Takip et'}
        >
            {isLoading ? (
                <span className={styles.spinner}></span>
            ) : isFollowing ? (
                <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Takip Ediliyor</span>
                </>
            ) : (
                <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Takip Et</span>
                </>
            )}
        </button>
    );
}
