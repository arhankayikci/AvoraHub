"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import styles from './analytics.module.css';

// Static traffic sources (would need analytics tracking to be real)
const TRAFFIC_SOURCES = [
    { label: 'Organik Arama', value: 42, color: '#6366F1' },
    { label: 'Sosyal Medya', value: 28, color: '#10B981' },
    { label: 'Direkt', value: 18, color: '#F59E0B' },
    { label: 'Referans', value: 12, color: '#EC4899' },
];

export default function AnalyticsPage() {
    const { user, profile } = useAuth();
    const [dateRange, setDateRange] = useState('week');
    const [loading, setLoading] = useState(true);
    const [metrics, setMetrics] = useState([
        { id: 'views', label: 'Toplam Görüntülenme', value: '-', change: '-', positive: true, icon: '👁️' },
        { id: 'votes', label: 'Toplam Oy', value: '-', change: '-', positive: true, icon: '🔥' },
        { id: 'startups', label: 'Startup Sayısı', value: '-', change: '-', positive: true, icon: '🚀' },
        { id: 'problems', label: 'Problem Sayısı', value: '-', change: '-', positive: true, icon: '💡' },
    ]);
    const [topPerformers, setTopPerformers] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        if (user) {
            fetchAnalyticsData();
        }
    }, [user]);

    async function fetchAnalyticsData() {
        if (!user) return;
        setLoading(true);

        try {
            // Fetch user's startups
            const { data: startups, error: startupError } = await supabase
                .from('startups')
                .select('id, name, tagline, views, likes, comments, created_at, category')
                .eq('user_id', user.id)
                .order('likes', { ascending: false });

            // Fetch user's problems
            const { data: problems, error: problemError } = await supabase
                .from('problems')
                .select('id, title, content, views, votes, comments, created_at, category')
                .eq('user_id', user.id)
                .order('votes', { ascending: false });

            const userStartups = startups || [];
            const userProblems = problems || [];

            // Calculate aggregates
            const totalViews = userStartups.reduce((sum, s) => sum + (s.views || 0), 0) +
                userProblems.reduce((sum, p) => sum + (p.views || 0), 0);
            const totalVotes = userStartups.reduce((sum, s) => sum + (s.likes || 0), 0) +
                userProblems.reduce((sum, p) => sum + (p.votes || 0), 0);

            setMetrics([
                {
                    id: 'views',
                    label: 'Toplam Görüntülenme',
                    value: totalViews.toLocaleString('tr-TR'),
                    change: '-',
                    positive: true,
                    icon: '👁️'
                },
                {
                    id: 'votes',
                    label: 'Toplam Oy',
                    value: totalVotes.toLocaleString('tr-TR'),
                    change: '-',
                    positive: true,
                    icon: '🔥'
                },
                {
                    id: 'startups',
                    label: 'Startup Sayısı',
                    value: userStartups.length.toString(),
                    change: '-',
                    positive: true,
                    icon: '🚀'
                },
                {
                    id: 'problems',
                    label: 'Problem Sayısı',
                    value: userProblems.length.toString(),
                    change: '-',
                    positive: true,
                    icon: '💡'
                },
            ]);

            // Top performers - combine and sort
            const allContent = [
                ...userStartups.map(s => ({
                    id: s.id,
                    name: s.name,
                    category: s.category || 'Startup',
                    avatar: s.name?.substring(0, 2).toUpperCase() || 'ST',
                    color: '#6366F1',
                    score: s.likes || 0,
                    type: 'startup'
                })),
                ...userProblems.map(p => ({
                    id: p.id,
                    name: p.title,
                    category: p.category || 'Problem',
                    avatar: p.title?.substring(0, 2).toUpperCase() || 'PR',
                    color: '#10B981',
                    score: p.votes || 0,
                    type: 'problem'
                }))
            ];
            const sortedPerformers = allContent.sort((a, b) => b.score - a.score).slice(0, 5);
            setTopPerformers(sortedPerformers);

            // Recent activity - latest created items
            const recentItems = [
                ...userStartups.slice(0, 3).map(s => ({
                    type: 'startup',
                    title: s.name,
                    action: 'eklendi',
                    time: formatTimeAgo(s.created_at)
                })),
                ...userProblems.slice(0, 2).map(p => ({
                    type: 'problem',
                    title: p.title,
                    action: 'paylaşıldı',
                    time: formatTimeAgo(p.created_at)
                }))
            ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);

            setRecentActivity(recentItems);

        } catch (error) {
            console.error('Analytics fetch error:', error);
        } finally {
            setLoading(false);
        }
    }

    function formatTimeAgo(dateString) {
        if (!dateString) return 'yakın zamanda';
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'az önce';
        if (diffMins < 60) return `${diffMins} dk önce`;
        if (diffHours < 24) return `${diffHours} saat önce`;
        if (diffDays < 7) return `${diffDays} gün önce`;
        return date.toLocaleDateString('tr-TR');
    }

    // Static weekly data (would need tracking to be real)
    const WEEKLY_DATA = [
        { day: 'Pzt', views: 0, votes: 0 },
        { day: 'Sal', views: 0, votes: 0 },
        { day: 'Çar', views: 0, votes: 0 },
        { day: 'Per', views: 0, votes: 0 },
        { day: 'Cum', views: 0, votes: 0 },
        { day: 'Cmt', views: 0, votes: 0 },
        { day: 'Paz', views: 0, votes: 0 },
    ];

    const maxViews = Math.max(...WEEKLY_DATA.map(d => d.views), 1);

    // Calculate donut chart
    const radius = 55;
    const circumference = 2 * Math.PI * radius;

    if (loading) {
        return (
            <div className={styles.page}>
                <div className="container">
                    <div className={styles.loadingState}>
                        <div className={styles.spinner}></div>
                        <p>Veriler yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

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
                    {metrics.map(metric => (
                        <div key={metric.id} className={styles.metricCard}>
                            <div className={styles.metricHeader}>
                                <div className={`${styles.metricIcon} ${styles[metric.id]}`}>
                                    {metric.icon}
                                </div>
                                {metric.change !== '-' && (
                                    <span className={`${styles.metricChange} ${metric.positive ? styles.positive : styles.negative}`}>
                                        {metric.positive ? '↑' : '↓'} {metric.change}
                                    </span>
                                )}
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
                                            height: `${Math.max((data.views / maxViews) * 150, 4)}px`,
                                            background: 'linear-gradient(180deg, #6366F1 0%, #8B5CF6 100%)'
                                        }}
                                        title={`${data.views} görüntülenme`}
                                    ></div>
                                    <span className={styles.barLabel}>{data.day}</span>
                                </div>
                            ))}
                        </div>
                        <p className={styles.noDataHint}>Haftalık aktivite verisi için analytics takibi gereklidir.</p>
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
                        <p className={styles.noDataHint}>Örnek değerler - gerçek veriler için analytics takibi gereklidir.</p>
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
                            {recentActivity.length === 0 ? (
                                <p className={styles.emptyState}>Henüz aktivite yok. Startup veya problem ekleyerek başlayın!</p>
                            ) : (
                                recentActivity.map((activity, i) => (
                                    <div key={i} className={styles.activityItem}>
                                        <div className={`${styles.activityIcon} ${styles[activity.type]}`}>
                                            {activity.type === 'startup' && '🚀'}
                                            {activity.type === 'problem' && '💡'}
                                        </div>
                                        <div className={styles.activityContent}>
                                            <p className={styles.activityText}>
                                                <strong>{activity.title}</strong> {activity.action}
                                            </p>
                                            <span className={styles.activityTime}>{activity.time}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Top Performers */}
                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <h3 className={styles.chartTitle}>En İyi Performans</h3>
                        </div>
                        <div className={styles.performersList}>
                            {topPerformers.length === 0 ? (
                                <p className={styles.emptyState}>Henüz içerik yok. İlk startup veya probleminizi paylaşın!</p>
                            ) : (
                                topPerformers.map((performer, i) => (
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
                                            {performer.score.toLocaleString('tr-TR')} oy
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
