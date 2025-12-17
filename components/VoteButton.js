"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './VoteButton.module.css';

export default function VoteButton({ itemId, itemType, initialCount = 0 }) {
    const { user } = useAuth();
    const [hasVoted, setHasVoted] = useState(false);
    const [voteCount, setVoteCount] = useState(initialCount);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user && itemId) {
            checkVoteStatus();
        }
    }, [user, itemId]);

    const checkVoteStatus = async () => {
        try {
            const res = await fetch(
                `/api/votes?userId=${user.id}&itemId=${itemId}&itemType=${itemType}`
            );
            const data = await res.json();
            setHasVoted(data.hasVoted);

            // Also fetch current count
            const countRes = await fetch(`/api/votes?itemId=${itemId}&itemType=${itemType}`);
            const countData = await countRes.json();
            setVoteCount(countData.count);
        } catch (error) {
            console.error('Error checking vote status:', error);
        }
    };

    const toggleVote = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            alert('Oy vermek için giriş yapmalısınız');
            return;
        }

        setIsLoading(true);

        // Optimistic update
        const previousVoted = hasVoted;
        const previousCount = voteCount;

        // Update UI immediately
        setHasVoted(!previousVoted);
        setVoteCount(prev => previousVoted ? prev - 1 : prev + 1);

        try {
            if (previousVoted) {
                // Remove vote (user had voted before)
                const res = await fetch(
                    `/api/votes?userId=${user.id}&itemId=${itemId}&itemType=${itemType}`,
                    { method: 'DELETE' }
                );

                if (res.ok) {
                    const data = await res.json();
                    setVoteCount(data.count);
                    setHasVoted(false);
                } else {
                    // Revert on error
                    setHasVoted(previousVoted);
                    setVoteCount(previousCount);
                }
            } else {
                // Add vote (user hasn't voted)
                const res = await fetch('/api/votes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id, itemId, itemType })
                });

                if (res.ok) {
                    const data = await res.json();
                    setVoteCount(data.count);
                    setHasVoted(true);
                } else {
                    // Revert on error
                    setHasVoted(previousVoted);
                    setVoteCount(previousCount);
                }
            }
        } catch (error) {
            console.error('Error toggling vote:', error);
            // Revert on error
            setHasVoted(previousVoted);
            setVoteCount(previousCount);
        } finally {
            setIsLoading(false);
        }
    };

    const Icon = itemType === 'startup' ? HeartIcon : StarIcon;

    return (
        <button
            className={`${styles.voteButton} ${hasVoted ? styles.voted : ''}`}
            onClick={toggleVote}
            disabled={isLoading}
            title={hasVoted ? 'Oyunu Geri Al' : 'Oy Ver'}
        >
            <Icon filled={hasVoted} />
            <span className={styles.count}>{voteCount}</span>
        </button>
    );
}

// Star Icon for Problems
function StarIcon({ filled }) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill={filled ? 'currentColor' : 'none'} xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2L9.5451 5.87336L13.9021 6.52786L10.9511 9.37664L11.7093 13.708L8 11.8734L4.2907 13.708L5.0489 9.37664L2.0979 6.52786L6.4549 5.87336L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

// Heart Icon for Startups
function HeartIcon({ filled }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} xmlns="http://www.w3.org/2000/svg">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
