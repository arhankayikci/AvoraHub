"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './TrendingWidget.module.css';
import EmpathyButton from './EmpathyButton';

const mockTrendingProblems = [
    {
        id: 1,
        title: 'Üniversite öğrencileri için uygun fiyatlı konaklama',
        category: 'Housing',
        empathyCount: 234,
        commentCount: 45,
        trendScore: 892,
        trending: 'up'
    },
    {
        id: 2,
        title: 'Yerel üreticiler için dijital pazar yeri eksikliği',
        category: 'Agriculture',
        empathyCount: 187,
        commentCount: 32,
        trendScore: 756,
        trending: 'up'
    },
    {
        id: 3,
        title: 'Şehir içi ulaşımda karbon ayak izi',
        category: 'Transport',
        empathyCount: 156,
        commentCount: 28,
        trendScore: 624,
        trending: 'same'
    },
    {
        id: 4,
        title: 'Gıda israfını azaltma platformu ihtiyacı',
        category: 'Food',
        empathyCount: 142,
        commentCount: 23,
        trendScore: 567,
        trending: 'up'
    },
    {
        id: 5,
        title: 'Freelancerlar için güvenli ödeme sistemi',
        category: 'Finance',
        empathyCount: 128,
        commentCount: 19,
        trendScore: 512,
        trending: 'down'
    }
];

export default function TrendingWidget({ maxItems = 5 }) {
    const [problems, setProblems] = useState(mockTrendingProblems.slice(0, maxItems));

    const getTrendIcon = (trend) => {
        if (trend === 'up') {
            return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
            );
        }
        if (trend === 'down') {
            return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                    <polyline points="17 18 23 18 23 12"></polyline>
                </svg>
            );
        }
        return (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
        );
    };

    return (
        <div className={styles.widget}>
            <div className={styles.header}>
                <h3 className={styles.title}>
                    Trending Problems
                </h3>
                <span className={styles.subtitle}>Last 24 hours</span>
            </div>

            <div className={styles.problemList}>
                {problems.map((problem, index) => (
                    <Link
                        key={problem.id}
                        href={`/problems/${problem.id}`}
                        className={styles.problemItem}
                        style={{ '--delay': `${index * 0.05}s` }}
                    >
                        <div className={styles.rank}>
                            <span className={styles.rankNumber}>#{index + 1}</span>
                            <span className={`${styles.trendIcon} ${styles[problem.trending]}`}>
                                {getTrendIcon(problem.trending)}
                            </span>
                        </div>

                        <div className={styles.problemContent}>
                            <h4 className={styles.problemTitle}>{problem.title}</h4>
                            <div className={styles.meta}>
                                <span className={styles.category}>{problem.category}</span>
                                <div className={styles.stats}>
                                    <span className={styles.stat}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                        </svg>
                                        {problem.empathyCount}
                                    </span>
                                    <span className={styles.stat}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                        {problem.commentCount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <Link href="/problems?sort=trending" className={styles.viewMore}>
                View All Trending →
            </Link>
        </div>
    );
}
