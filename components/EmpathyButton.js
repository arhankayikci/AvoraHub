"use client";

import { useState } from 'react';
import styles from './EmpathyButton.module.css';

export default function EmpathyButton({
    initialCount = 0,
    hasEmpathized = false,
    onToggle,
    size = 'medium'
}) {
    const [count, setCount] = useState(initialCount);
    const [isActive, setIsActive] = useState(hasEmpathized);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        setIsActive(!isActive);
        setCount(isActive ? count - 1 : count + 1);

        setTimeout(() => setIsAnimating(false), 300);

        if (onToggle) {
            onToggle(!isActive);
        }
    };

    return (
        <button
            className={`${styles.empathyBtn} ${styles[size]} ${isActive ? styles.active : ''} ${isAnimating ? styles.animating : ''}`}
            onClick={handleClick}
            aria-label={isActive ? "Remove empathy" : "I have this problem too"}
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isActive ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {count > 0 && (
                <span className={styles.count}>
                    {count > 999 ? `${(count / 1000).toFixed(1)}k` : count}
                </span>
            )}
        </button>
    );
}
