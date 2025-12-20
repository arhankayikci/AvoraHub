"use client";

import { useState } from 'react';
import styles from './analytics.module.css';

const METRICS = [
    {
        id: 'views',
        label: 'Toplam Görüntülenme',
        value: '47,892',
        change: '+12.5%',
        positive: true,
        icon: '👁️',
    },
    {
        id: 'votes',
        label: 'Toplam Oy',
        value: '3,456',
        change: '+8.3%',
        positive: true,
        icon: '🔥',
    },
    {
        id: 'users',
        label: 'Aktif Kullanıcı',
        value: '1,234',
        change: '+23.1%',
        positive: true,
        icon: '👥',
    },
    {
        id: 'growth',
        label: 'Haftalık Büyüme',
        value: '%15.7',
        change: '-2.4%',
        positive: false,
        icon: '📈',
    },
];

const WEEKLY_DATA = [
    { day: 'Pzt', views: 1200, votes: 89 },
    { day: 'Sal', views: 1800, votes: 124 },
    { day: 'Çar', views: 1400, votes: 98 },
    { day: 'Per', views: 2200, votes: 156 },
    { day: 'Cum', views: 2800, votes: 187 },
    { day: 'Cmt', views: 1600, votes: 112 },
    { day: 'Paz', views: 1100, votes: 76 },
];

const TRAFFIC_SOURCES = [
    { label: 'Organik Arama', value: 42, color: '#6366F1' },
    { label: 'Sosyal Medya', value: 28, color: '#10B981' },
    { label: 'Direkt', value: 18, color: '#F59E0B' },
    { label: 'Referans', value: 12, color: '#EC4899' },
];

const RECENT_ACTIVITY = [
    { type: 'vote', user: 'Ahmet Y.', action: 'startup\'ınıza oy verdi', startup: 'PayFlex', time: '2 dk önce' },
    { type: 'comment', user: 'Elif D.', action: 'yorum yaptı', startup: 'PayFlex', time: '15 dk önce' },
    { type: 'follow', user: 'Can Ö.', action: 'sizi takip etti', startup: '', time: '32 dk önce' },
    { type: 'share', user: 'Selin A.', action: 'startup\'ınızı paylaştı', startup: 'PayFlex', time: '1 saat önce' },
    { type: 'vote', user: 'Murat K.', action: 'probleminize +1 verdi', startup: '', time: '2 saat önce' },
];

const TOP_PERFORMERS = [
    { id: 1, name: 'PayFlex', category: 'Fintech', avatar: 'PF', color: '#6366F1', score: 2847 },
    { id: 2, name: 'DataMind AI', category: 'AI/ML', avatar: 'DM', color: '#8B5CF6', score: 2654 },
    { id: 3, name: 'HealthTrack', category: 'HealthTech', avatar: 'HT', color: '#10B981', score: 2398 },
    { id: 4, name: 'GreenDelivery', category: 'Lojistik', avatar: 'GD', color: '#22C55E', score: 2156 },
    { id: 5, name: 'EduLearn', category: 'EdTech', avatar: 'EL', color: '#F59E0B', score: 1987 },
];

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState('week');

    const maxViews = Math.max(...WEEKLY_DATA.map(d => d.views));

    // Calculate donut chart
    const radius = 55;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <h1 className={styles.title}>
                            📊 Analytics Dashboard
                        </h1>
                        <div className={styles.dateRange}>
                            {['day', 'week', 'month', 'year'].map(range => (
                                <button
                                    key={range}
                                    className={`${styles.rangeBtn} ${dateRange === range ? styles.active : ''}`}
                                    onClick={() => setDateRange(range)}
                                >
                                    {range === 'day' ? 'Bugün' :
                                        range === 'week' ? 'Bu Hafta' :
                                            range === 'month' ? 'Bu Ay' : 'Bu Yıl'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className={styles.metricsGrid}>
                    {METRICS.map(metric => (
                        <div key={metric.id} className={styles.metricCard}>
                            <div className={styles.metricHeader}>
                                <div className={`${styles.metricIcon} ${styles[metric.id]}`}>
                                    {metric.icon}
                                </div>
                                <span className={`${styles.metricChange} ${metric.positive ? styles.positive : styles.negative}`}>
                                    {metric.positive ? '↑' : '↓'} {metric.change}
                                </span>
                            </div>
                            <div className={styles.metricValue}>{metric.value}</div>
                            <div className={styles.metricLabel}>{metric.label}</div>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className={styles.chartsGrid}>
                    {/* Bar Chart - Weekly Activity */}
                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <h3 className={styles.chartTitle}>Haftalık Aktivite</h3>
                            <div className={styles.chartLegend}>
                                <div className={styles.legendItem}>
                                    <span className={styles.legendDot} style={{ background: '#6366F1' }}></span>
                                    Görüntülenme
                                </div>
                                <div className={styles.legendItem}>
                                    <span className={styles.legendDot} style={{ background: '#10B981' }}></span>
                                    Oylar
                                </div>
                            </div>
                        </div>
                        <div className={styles.barChart}>
                            {WEEKLY_DATA.map((data, i) => (
                                <div key={i} className={styles.barGroup}>
                                    <div
                                        className={styles.bar}
                                        style={{
                                            height: `${(data.views / maxViews) * 150}px`,
                                            background: 'linear-gradient(180deg, #6366F1 0%, #8B5CF6 100%)'
                                        }}
                                        title={`${data.views} görüntülenme`}
                                    ></div>
                                    <span className={styles.barLabel}>{data.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Donut Chart - Traffic Sources */}
                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <h3 className={styles.chartTitle}>Trafik Kaynakları</h3>
                        </div>
                        <div className={styles.donutChart}>
                            <svg className={styles.donutSvg} viewBox="0 0 150 150">
                                {TRAFFIC_SOURCES.reduce((acc, source, i) => {
                                    const strokeDasharray = (source.value / 100) * circumference;
                                    const currentOffset = acc.offset;
                                    const strokeDashoffset = -currentOffset;

                                    acc.elements.push(
                                        <circle
                                            key={i}
                                            className={styles.donutCircle}
                                            cx="75"
                                            cy="75"
                                            r={radius}
                                            stroke={source.color}
                                            strokeDasharray={`${strokeDasharray} ${circumference}`}
                                            strokeDashoffset={strokeDashoffset}
                                        />
                                    );
                                    acc.offset += strokeDasharray;
                                    return acc;
                                }, { offset: 0, elements: [] }).elements}
                            </svg>
                            <div className={styles.donutLegend}>
                                {TRAFFIC_SOURCES.map((source, i) => (
                                    <div key={i} className={styles.donutItem}>
                                        <span className={styles.donutColor} style={{ background: source.color }}></span>
                                        <span className={styles.donutLabel}>{source.label}</span>
                                        <span className={styles.donutValue}>{source.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Grid */}
                <div className={styles.bottomGrid}>
                    {/* Recent Activity */}
                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <h3 className={styles.chartTitle}>Son Aktiviteler</h3>
                        </div>
                        <div className={styles.activityList}>
                            {RECENT_ACTIVITY.map((activity, i) => (
                                <div key={i} className={styles.activityItem}>
                                    <div className={`${styles.activityIcon} ${styles[activity.type]}`}>
                                        {activity.type === 'vote' && '🔥'}
                                        {activity.type === 'comment' && '💬'}
                                        {activity.type === 'follow' && '👤'}
                                        {activity.type === 'share' && '🔗'}
                                    </div>
                                    <div className={styles.activityContent}>
                                        <p className={styles.activityText}>
                                            <strong>{activity.user}</strong> {activity.action}
                                            {activity.startup && <strong> {activity.startup}</strong>}
                                        </p>
                                        <span className={styles.activityTime}>{activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Performers */}
                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <h3 className={styles.chartTitle}>En İyi Performans</h3>
                        </div>
                        <div className={styles.performersList}>
                            {TOP_PERFORMERS.map((performer, i) => (
                                <div key={performer.id} className={styles.performerItem}>
                                    <span className={`${styles.performerRank} ${i === 0 ? styles.gold : i === 1 ? styles.silver : i === 2 ? styles.bronze : styles.normal}`}>
                                        {i + 1}
                                    </span>
                                    <div
                                        className={styles.performerAvatar}
                                        style={{ background: performer.color }}
                                    >
                                        {performer.avatar}
                                    </div>
                                    <div className={styles.performerInfo}>
                                        <div className={styles.performerName}>{performer.name}</div>
                                        <div className={styles.performerCategory}>{performer.category}</div>
                                    </div>
                                    <span className={styles.performerScore}>
                                        {performer.score.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
