"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './DailyFeatured.module.css';
import { FeaturedBadge } from './UserBadge';

// Demo veriler (gerçek uygulamada API'den gelecek)
const DEMO_FEATURED = {
    startup: {
        id: 1,
        name: "ChargeHub Brasil",
        tagline: "Brezilya genelinde akıllı EV şarj ağı",
        category: "Ulaşım",
        likes: 892,
        logo: "CH"
    },
    problem: {
        id: 2,
        title: "Uygun fiyatlı sağlık hizmeti erişimi",
        category: "Sağlık",
        votes: 567,
        author: "Raj Patel"
    }
};

export function DailyFeaturedStartup({ startup = DEMO_FEATURED.startup }) {
    return (
        <Link href={`/startups/${startup.id}`} className={styles.card}>
            <div className={styles.cardHeader}>
                <FeaturedBadge type="STARTUP_OF_DAY" />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.logo}>
                    {startup.logo || startup.name.substring(0, 2).toUpperCase()}
                </div>
                <div className={styles.info}>
                    <h3 className={styles.name}>{startup.name}</h3>
                    <p className={styles.tagline}>{startup.tagline}</p>
                    <div className={styles.meta}>
                        <span className={styles.category}>{startup.category}</span>
                        <span className={styles.likes}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 19l-7-7 7-7M5 12h14" transform="rotate(-90 12 12)" />
                            </svg>
                            {startup.likes}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export function DailyFeaturedProblem({ problem = DEMO_FEATURED.problem }) {
    return (
        <Link href={`/problems/${problem.id}`} className={styles.card}>
            <div className={styles.cardHeader}>
                <FeaturedBadge type="PROBLEM_OF_DAY" />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.problemIcon}>💡</div>
                <div className={styles.info}>
                    <h3 className={styles.name}>{problem.title}</h3>
                    <div className={styles.meta}>
                        <span className={styles.category}>{problem.category}</span>
                        <span className={styles.votes}>
                            {problem.votes} oy
                        </span>
                        <span className={styles.author}>@{problem.author}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function DailyFeatured() {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>🏆 Bugün Öne Çıkanlar</h2>
                <p className={styles.subtitle}>Günün en çok ilgi gören startup ve problemi</p>
            </div>
            <div className={styles.grid}>
                <DailyFeaturedStartup />
                <DailyFeaturedProblem />
            </div>
        </section>
    );
}
