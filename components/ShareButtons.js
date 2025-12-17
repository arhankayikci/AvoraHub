"use client";

import { useState } from 'react';
import styles from './ShareButtons.module.css';

export default function ShareButtons({ url, title, description }) {
    const [showTooltip, setShowTooltip] = useState(false);

    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareTitle = title || 'Avora Product Hunter';
    const shareDescription = description || 'Discover innovative solutions and startups';

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`,
    };

    return (
        <div className={styles.container}>
            <button
                onClick={handleCopyLink}
                className={styles.shareBtn}
                title="Copy link"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                {showTooltip && <span className={styles.tooltip}>Copied!</span>}
            </button>

            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
                title="Share on Twitter"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
            </a>

            <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
                title="Share on LinkedIn"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                    <circle cx="4" cy="4" r="2"></circle>
                </svg>
            </a>

            <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
                title="Share on Facebook"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
            </a>

            <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
                title="Share on WhatsApp"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
            </a>
        </div>
    );
}
