"use client";

import styles from './InvestorDashboard.module.css';
import Link from 'next/link';

// Demo data
const DEMO_STATS = {
    dealFlow: 45,
    contacted: 12,
    meetings: 5,
    invested: 2
};

const DEMO_PIPELINE = [
    {
        id: 1,
        name: 'PayFlex',
        stage: 'Pre-Seed',
        sector: 'Fintech',
        asking: '₺2M',
        score: 92,
        status: 'reviewing',
        logo: 'PF'
    },
    {
        id: 2,
        name: 'DataMind AI',
        stage: 'Seed',
        sector: 'AI/ML',
        asking: '₺5M',
        score: 87,
        status: 'meeting',
        logo: 'DM'
    },
    {
        id: 3,
        name: 'GreenDelivery',
        stage: 'Pre-Seed',
        sector: 'Lojistik',
        asking: '₺1.5M',
        score: 78,
        status: 'new',
        logo: 'GD'
    },
    {
        id: 4,
        name: 'HealthTrack',
        stage: 'Seed',
        sector: 'HealthTech',
        asking: '₺3M',
        score: 85,
        status: 'contacted',
        logo: 'HT'
    },
];

const DEMO_TRENDING = [
    { id: 1, name: 'EduTech Pro', votes: 234, growth: 45 },
    { id: 2, name: 'CleanEnergy Hub', votes: 189, growth: 32 },
    { id: 3, name: 'RetailAI', votes: 156, growth: 28 },
];

const STATUS_CONFIG = {
    new: { label: 'Yeni', color: '#3b82f6', bg: '#dbeafe' },
    reviewing: { label: 'İnceleniyor', color: '#f59e0b', bg: '#fef3c7' },
    contacted: { label: 'İletişimde', color: '#8b5cf6', bg: '#ede9fe' },
    meeting: { label: 'Görüşme', color: '#10b981', bg: '#d1fae5' },
    passed: { label: 'Geçildi', color: '#6b7280', bg: '#f3f4f6' },
};

function PipelineCard({ startup }) {
    const status = STATUS_CONFIG[startup.status];

    return (
        <Link href={`/startups/${startup.id}`} className={styles.pipelineCard}>
            <div className={styles.cardTop}>
                <div className={styles.logo}>{startup.logo}</div>
                <span
                    className={styles.status}
                    style={{ color: status.color, background: status.bg }}
                >
                    {status.label}
                </span>
            </div>
            <h3 className={styles.startupName}>{startup.name}</h3>
            <div className={styles.startupMeta}>
                <span>{startup.stage}</span>
                <span>•</span>
                <span>{startup.sector}</span>
            </div>
            <div className={styles.cardBottom}>
                <span className={styles.asking}>{startup.asking}</span>
                <div className={styles.score}>
                    <span className={styles.scoreLabel}>Skor</span>
                    <span className={styles.scoreValue}>{startup.score}</span>
                </div>
            </div>
        </Link>
    );
}

export default function InvestorDashboard({ stats = DEMO_STATS, pipeline = DEMO_PIPELINE, trending = DEMO_TRENDING }) {
    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>💰 Investor Dashboard</h1>
                <p className={styles.subtitle}>Deal flow yönetimi ve startup keşfi</p>
            </div>

            {/* Funnel Stats */}
            <div className={styles.funnel}>
                <div className={styles.funnelStep}>
                    <span className={styles.funnelValue}>{stats.dealFlow}</span>
                    <span className={styles.funnelLabel}>Deal Flow</span>
                </div>
                <div className={styles.funnelArrow}>→</div>
                <div className={styles.funnelStep}>
                    <span className={styles.funnelValue}>{stats.contacted}</span>
                    <span className={styles.funnelLabel}>İletişim</span>
                </div>
                <div className={styles.funnelArrow}>→</div>
                <div className={styles.funnelStep}>
                    <span className={styles.funnelValue}>{stats.meetings}</span>
                    <span className={styles.funnelLabel}>Görüşme</span>
                </div>
                <div className={styles.funnelArrow}>→</div>
                <div className={styles.funnelStep}>
                    <span className={styles.funnelValue}>{stats.invested}</span>
                    <span className={styles.funnelLabel}>Yatırım</span>
                </div>
            </div>

            {/* Pipeline Grid */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Pipeline</h2>
                    <div className={styles.filters}>
                        <button className={`${styles.filterBtn} ${styles.active}`}>Tümü</button>
                        <button className={styles.filterBtn}>Yeni</button>
                        <button className={styles.filterBtn}>Görüşmede</button>
                    </div>
                </div>
                <div className={styles.pipelineGrid}>
                    {pipeline.map(startup => (
                        <PipelineCard key={startup.id} startup={startup} />
                    ))}
                </div>
            </div>

            {/* Trending */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Bu Hafta Trending</h2>
                    <Link href="/startups?sort=trending" className={styles.viewAll}>Tümünü Gör →</Link>
                </div>
                <div className={styles.trendingList}>
                    {trending.map((item, index) => (
                        <Link key={item.id} href={`/startups/${item.id}`} className={styles.trendingItem}>
                            <span className={styles.rank}>#{index + 1}</span>
                            <span className={styles.trendingName}>{item.name}</span>
                            <span className={styles.trendingVotes}>{item.votes} oy</span>
                            <span className={styles.trendingGrowth}>↑ {item.growth}%</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
