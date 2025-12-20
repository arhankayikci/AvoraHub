"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './FavoriteButton.module.css';

export default function FavoriteButton({ itemId, itemType, initialFavorited = false }) {
    const { user } = useAuth();
    const [isFavorited, setIsFavorited] = useState(initialFavorited);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            checkFavoriteStatus();
        }
    }, [user, itemId]);

    const checkFavoriteStatus = async () => {
        try {
            const res = await fetch(
                `/api/favorites?userId=${user.id}&itemId=${itemId}&itemType=${itemType}`
            );
            const data = await res.json();
            setIsFavorited(data.isFavorited);
        } catch (error) {
            console.error('Error checking favorite status:', error);
        }
    };

    const toggleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            alert('Favorilere eklemek için giriş yapmalısınız');
            return;
        }

        setIsLoading(true);

        try {
            if (isFavorited) {
                // Remove favorite
                const res = await fetch(
                    `/api/favorites?userId=${user.id}&itemId=${itemId}&itemType=${itemType}`,
                    { method: 'DELETE' }
                );

                if (res.ok) {
                    setIsFavorited(false);
                }
            } else {
                // Add favorite
                const res = await fetch('/api/favorites', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id, itemId, itemType })
                });

                if (res.ok) {
                    setIsFavorited(true);
                }
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            className={`${styles.favoriteButton} ${isFavorited ? styles.favorited : ''}`}
            onClick={toggleFavorite}
            disabled={isLoading}
            aria-label={isFavorited ? 'Favorilerden çıkar' : 'Favorilere ekle'}
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isFavorited ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        </button>
    );
}
