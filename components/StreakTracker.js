"use client";

import { useState, useEffect } from 'react';
import styles from './StreakTracker.module.css';

export default function StreakTracker({ userId }) {
    const [streak, setStreak] = useState(0);
    const [lastVisit, setLastVisit] = useState(null);
    const [showCelebration, setShowCelebration] = useState(false);

    useEffect(() => {
        // localStorage'dan streak bilgisi al
        const storageKey = `streak_${userId || 'guest'}`;
        const savedData = localStorage.getItem(storageKey);

        if (savedData) {
            const data = JSON.parse(savedData);
            const lastDate = new Date(data.lastVisit);
            const today = new Date();
            const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 0) {
                // Bugün zaten giriş yapılmış
                setStreak(data.streak);
                setLastVisit(data.lastVisit);
            } else if (diffDays === 1) {
                // Dün giriş yapılmış, streak devam
                const newStreak = data.streak + 1;
                setStreak(newStreak);
                setLastVisit(today.toISOString());
                localStorage.setItem(storageKey, JSON.stringify({
                    streak: newStreak,
                    lastVisit: today.toISOString()
                }));

                // Milestone kutlaması
                if ([7, 14, 30, 60, 100].includes(newStreak)) {
                    setShowCelebration(true);
                    setTimeout(() => setShowCelebration(false), 3000);
                }
            } else {
                // Streak kırıldı
                setStreak(1);
                setLastVisit(today.toISOString());
                localStorage.setItem(storageKey, JSON.stringify({
                    streak: 1,
                    lastVisit: today.toISOString()
                }));
            }
        } else {
            // İlk ziyaret
            const today = new Date().toISOString();
            setStreak(1);
            setLastVisit(today);
            localStorage.setItem(storageKey, JSON.stringify({
                streak: 1,
                lastVisit: today
            }));
        }
    }, [userId]);

    const getStreakLevel = () => {
        if (streak >= 100) return { emoji: '🔥', color: '#EF4444', label: 'Efsane' };
        if (streak >= 60) return { emoji: '🔥', color: '#F97316', label: 'Süper' };
        if (streak >= 30) return { emoji: '🔥', color: '#FBBF24', label: 'Harika' };
        if (streak >= 14) return { emoji: '⚡', color: '#22C55E', label: 'İyi' };
        if (streak >= 7) return { emoji: '✨', color: '#3B82F6', label: 'Başlangıç' };
        return { emoji: '🌱', color: '#94A3B8', label: 'Yeni' };
    };

    const level = getStreakLevel();

    return (
        <div className={styles.streakTracker}>
            <div
                className={styles.streakBadge}
                style={{ borderColor: level.color }}
            >
                <span className={styles.emoji}>{level.emoji}</span>
                <div className={styles.info}>
                    <span className={styles.count}>{streak} Gün</span>
                    <span className={styles.label} style={{ color: level.color }}>
                        {level.label}
                    </span>
                </div>
            </div>

            {showCelebration && (
                <div className={styles.celebration}>
                    🎉 {streak} Günlük Seri! Tebrikler!
                </div>
            )}
        </div>
    );
}
