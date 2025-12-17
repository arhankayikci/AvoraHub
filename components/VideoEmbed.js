"use client";

import { useState } from 'react';
import styles from './VideoEmbed.module.css';

// YouTube URL'sinden video ID çıkar
function extractVideoId(url) {
    if (!url) return null;

    // youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) return watchMatch[1];

    // youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) return shortMatch[1];

    // youtube.com/embed/VIDEO_ID
    const embedMatch = url.match(/embed\/([^?]+)/);
    if (embedMatch) return embedMatch[1];

    return null;
}

// Vimeo URL'sinden video ID çıkar
function extractVimeoId(url) {
    if (!url) return null;
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
}

export default function VideoEmbed({ url, title = "Demo Video", autoplay = false }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showVideo, setShowVideo] = useState(autoplay);

    const youtubeId = extractVideoId(url);
    const vimeoId = extractVimeoId(url);

    if (!youtubeId && !vimeoId) {
        return (
            <div className={styles.placeholder}>
                <span className={styles.icon}>🎬</span>
                <span>Video URL geçersiz</span>
            </div>
        );
    }

    const thumbnailUrl = youtubeId
        ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
        : `https://vumbnail.com/${vimeoId}.jpg`;

    const embedUrl = youtubeId
        ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`
        : `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;

    if (!showVideo) {
        return (
            <div className={styles.container}>
                <div
                    className={styles.thumbnail}
                    onClick={() => setShowVideo(true)}
                    style={{ backgroundImage: `url(${thumbnailUrl})` }}
                >
                    <div className={styles.overlay}>
                        <button className={styles.playButton} aria-label="Video oynat">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </button>
                        <span className={styles.label}>{title}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.videoWrapper}>
                {!isLoaded && (
                    <div className={styles.loading}>
                        <span className={styles.spinner}></span>
                        <span>Yükleniyor...</span>
                    </div>
                )}
                <iframe
                    src={embedUrl}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => setIsLoaded(true)}
                    className={isLoaded ? styles.visible : styles.hidden}
                />
            </div>
        </div>
    );
}
