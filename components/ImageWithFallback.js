"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function ImageWithFallback({
    src,
    alt,
    fallbackText,
    className,
    width,
    height,
    priority = false
}) {
    const [error, setError] = useState(false);

    if (!src || error) {
        // Fallback: Show first letter or icon
        return (
            <div
                className={`${className} image-fallback`}
                style={{
                    width: width || '100%',
                    height: height || '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    borderRadius: '8px'
                }}
            >
                {fallbackText?.charAt(0).toUpperCase() || '?'}
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt || fallbackText || 'Image'}
            width={width}
            height={height}
            className={className}
            onError={() => setError(true)}
            priority={priority}
        />
    );
}

// Simple version for regular img tags
export function ImgWithFallback({ src, alt, fallbackText, className, style }) {
    const [error, setError] = useState(false);

    if (!src || error) {
        return (
            <div
                className={`${className || ''} img-fallback`}
                style={{
                    ...style,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    borderRadius: '8px'
                }}
            >
                {fallbackText?.charAt(0).toUpperCase() || '?'}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt || fallbackText || 'Image'}
            className={className}
            style={style}
            onError={() => setError(true)}
        />
    );
}
