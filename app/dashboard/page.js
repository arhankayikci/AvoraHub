"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './dashboard.module.css';

// Demo veriler
const DEMO_STATS = {
    views: { value: 12847, change: 23, label: 'Görüntülenme' },
    upvotes: { value: 892, change: 15, label: 'Toplam Oy' },
    comments: { value: 156, change: -3, label: 'Yorum' },
    followers: { value: 234, change: 12, label: 'Takipçi' }
};

const DEMO_CHART_DATA = [
    { day: 'Pzt', views: 420 },
    { day: 'Sal', views: 380 },
    { day: 'Çar', views: 520 },
    { day: 'Per', views: 480 },
    { day: 'Cum', views: 650 },
    { day: 'Cmt', views: 580 },
    { day: 'Paz', views: 720 },
];

const DEMO_CONTENT = [
    { id: 1, type: 'startup', title: 'PayFlex', views: 4521, upvotes: 342, comments: 45, trend: 'up', status: 'active' },
    { id: 2, type: 'problem', title: 'KOBİ Ödeme Sorunları', views: 2134, upvotes: 187, comments: 32, trend: 'up', status: 'active' },
    { id: 3, type: 'startup', title: 'DataMind AI', views: 1893, upvotes: 156, comments: 28, trend: 'stable', status: 'pending' },
];

const DEMO_NOTIFICATIONS = [
    { id: 1, icon: '🏆', text: 'PayFlex trending listesine girdi!', time: '2 saat önce', type: 'success' },
    { id: 2, icon: '⬆️', text: 'Probleminiz 50 oy aldı', time: '5 saat önce', type: 'info' },
    { id: 3, icon: '💬', text: 'Yeni yorum: "Harika bir çözüm!"', time: 'Dün', type: 'info' },
    { id: 4, icon: '👤', text: 'TechVC sizi takip etti', time: '2 gün önce', type: 'info' },
];

function StatCard({ stat }) {
    const isPositive = stat.change >= 0;
    return (
        <div className={styles.statCard}>
            <div className={styles.statHeader}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={`${styles.statChange} ${isPositive ? styles.positive : styles.negative}`}>
                    {isPositive ? '↑' : '↓'} {Math.abs(stat.change)}%
                </span>
            </div>
            <div className={styles.statValue}>{stat.value.toLocaleString()}</div>
        </div>
    );
}

function MiniChart({ data }) {
    const maxValue = Math.max(...data.map(d => d.views));

    return (
        <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
                <h3>Haftalık Görüntülenme</h3>
                <span className={styles.chartTotal}>Toplam: {data.reduce((a, b) => a + b.views, 0).toLocaleString()}</span>
            </div>
            <div className={styles.chart}>
                {data.map((item, index) => (
                    <div key={index} className={styles.chartBar}>
                        <div
                            className={styles.bar}
                            style={{ height: `${(item.views / maxValue) * 100}%` }}
                        >
                            <span className={styles.barTooltip}>{item.views}</span>
                        </div>
                        <span className={styles.barLabel}>{item.day}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ContentTable({ content }) {
    return (
        <div className={styles.contentTable}>
            <div className={styles.tableHeader}>
                <h3>İçerik Performansı</h3>
                <Link href="/dashboard/content" className={styles.viewAll}>Tümünü Gör →</Link>
            </div>
            <div className={styles.table}>
                <div className={styles.tableHead}>
                    <span>İçerik</span>
                    <span>Görüntülenme</span>
                    <span>Oy</span>
                    <span>Yorum</span>
                    <span>Durum</span>
                </div>
                {content.map(item => (
                    <Link key={item.id} href={`/${item.type}s/${item.id}`} className={styles.tableRow}>
                        <span className={styles.contentName}>
                            <span className={styles.contentIcon}>{item.type === 'startup' ? '🚀' : '💡'}</span>
                            {item.title}
                        </span>
                        <span>{item.views.toLocaleString()}</span>
                        <span>{item.upvotes}</span>
                        <span>{item.comments}</span>
                        <span className={`${styles.status} ${styles[item.status]}`}>
                            {item.status === 'active' ? 'Aktif' : 'Beklemede'}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function ActivityFeed({ notifications }) {
    return (
        <div className={styles.activityFeed}>
            <h3>Son Aktiviteler</h3>
            <div className={styles.activityList}>
                {notifications.map(item => (
                    <div key={item.id} className={`${styles.activityItem} ${styles[item.type]}`}>
                        <span className={styles.activityIcon}>{item.icon}</span>
                        <div className={styles.activityContent}>
                            <span className={styles.activityText}>{item.text}</span>
                            <span className={styles.activityTime}>{item.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function QuickActions({ userType }) {
    const actions = userType === 'investor' ? [
        { icon: '🔍', label: 'Startup Ara', href: '/startups' },
        { icon: '📊', label: 'Pipeline', href: '/dashboard/pipeline' },
        { icon: '📅', label: 'Görüşmeler', href: '/dashboard/meetings' },
    ] : [
        { icon: '🚀', label: 'Startup Ekle', href: '/submit-startup', primary: true },
        { icon: '💡', label: 'Problem Paylaş', href: '/submit-problem' },
        { icon: '📈', label: 'Analitik', href: '/dashboard/analytics' },
    ];

    return (
        <div className={styles.quickActions}>
            <h3>Hızlı Aksiyonlar</h3>
            <div className={styles.actionButtons}>
                {actions.map((action, index) => (
                    <Link
                        key={index}
                        href={action.href}
                        className={`${styles.actionBtn} ${action.primary ? styles.primaryAction : ''}`}
                    >
                        <span className={styles.actionIcon}>{action.icon}</span>
                        <span>{action.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function ValidationScoreWidget() {
    const score = 78;
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className={styles.validationWidget}>
            <h3>Validation Score</h3>
            <div className={styles.scoreCircle}>
                <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" className={styles.scoreBg} />
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className={styles.scoreProgress}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                    />
                </svg>
                <div className={styles.scoreValue}>
                    <span className={styles.scoreNumber}>{score}</span>
                    <span className={styles.scoreLabel}>İyi</span>
                </div>
            </div>
            <div className={styles.scoreTips}>
                <div className={styles.tipItem}>
                    <span className={styles.tipIcon}>💡</span>
                    <span>Traction metriklerini güncelle</span>
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [activeSection, setActiveSection] = useState('overview');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Yükleniyor...</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const sidebarItems = [
        { id: 'overview', icon: '📊', label: 'Genel Bakış' },
        { id: 'content', icon: '📝', label: 'İçeriklerim' },
        { id: 'analytics', icon: '📈', label: 'Analitik' },
        { id: 'notifications', icon: '🔔', label: 'Bildirimler' },
        { id: 'settings', icon: '⚙️', label: 'Ayarlar' },
    ];

    return (
        <div className={styles.dashboardLayout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.userCard}>
                        <div className={styles.userAvatar}>
                            {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>{user.name}</span>
                            <span className={styles.userType}>
                                {user.userType === 'investor' ? 'Yatırımcı' : 'Girişimci'}
                            </span>
                        </div>
                    </div>
                </div>

                <nav className={styles.sidebarNav}>
                    {sidebarItems.map(item => (
                        <button
                            key={item.id}
                            className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
                            onClick={() => setActiveSection(item.id)}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <Link href="/profile" className={styles.profileLink}>
                        Profili Görüntüle →
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <div className={styles.pageHeader}>
                    <div>
                        <h1 className={styles.pageTitle}>
                            Hoş geldin, {user.name?.split(' ')[0]} 👋
                        </h1>
                        <p className={styles.pageSubtitle}>
                            İşte bugünkü performansınızın özeti
                        </p>
                    </div>
                    <div className={styles.headerActions}>
                        <span className={styles.dateLabel}>
                            {new Date().toLocaleDateString('tr-TR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    {Object.entries(DEMO_STATS).map(([key, stat]) => (
                        <StatCard key={key} stat={stat} />
                    ))}
                </div>

                {/* Content Grid */}
                <div className={styles.contentGrid}>
                    <div className={styles.mainColumn}>
                        <MiniChart data={DEMO_CHART_DATA} />
                        <ContentTable content={DEMO_CONTENT} />
                    </div>
                    <div className={styles.sideColumn}>
                        <QuickActions userType={user.userType} />
                        <ValidationScoreWidget />
                        <ActivityFeed notifications={DEMO_NOTIFICATIONS} />
                    </div>
                </div>
            </main>
        </div>
    );
}
