"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './LazyImage.module.css';

export default function LazyImage({
    src,
    alt,
    className = '',
    placeholder = '/placeholder.jpg',
    aspectRatio = '16/9',
    fill = false,
    priority = false
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        if (priority) {
            if (!isInView) {
                setTimeout(() => setIsInView(true), 0);
            }
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '100px',
                threshold: 0.01
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [priority]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    return (
        <div
            ref={imgRef}
            className={`${styles.container} ${className}`}
            style={{ aspectRatio: fill ? 'auto' : aspectRatio }}
        >
            {/* Skeleton placeholder */}
            {!isLoaded && (
                <div className={styles.skeleton}>
                    <div className={styles.shimmer}></div>
                </div>
            )}

            {/* Error state */}
            {hasError && (
                <div className={styles.error}>
                    <span className={styles.errorIcon}>🖼️</span>
                    <span className={styles.errorText}>Görsel yüklenemedi</span>
                </div>
            )}

            {/* Actual image */}
            {isInView && !hasError && (
                <img
                    src={src}
                    alt={alt}
                    className={`${styles.image} ${isLoaded ? styles.loaded : ''}`}
                    onLoad={handleLoad}
                    onError={handleError}
                    loading={priority ? 'eager' : 'lazy'}
                />
            )}
        </div>
    );
}
