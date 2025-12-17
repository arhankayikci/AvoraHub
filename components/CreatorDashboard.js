"use client";

import styles from './CreatorDashboard.module.css';
import Link from 'next/link';

// Demo data
const DEMO_STATS = {
    totalViews: 12847,
    totalUpvotes: 892,
    totalComments: 156,
    followers: 234,
    weeklyGrowth: {
        views: 23,
        upvotes: 15,
        comments: 8,
        followers: 12
    }
};

const DEMO_CONTENT = [
    { id: 1, type: 'startup', title: 'PayFlex', views: 4521, upvotes: 342, comments: 45, trend: 'up' },
    { id: 2, type: 'problem', title: 'KOBİ\'ler için ödeme çözümleri', views: 2134, upvotes: 187, comments: 32, trend: 'up' },
    { id: 3, type: 'startup', title: 'DataMind AI', views: 1893, upvotes: 156, comments: 28, trend: 'stable' },
];

const DEMO_ACTIVITY = [
    { id: 1, icon: '⬆️', text: 'PayFlex 50 yeni oy aldı', time: '2 saat önce' },
    { id: 2, icon: '💬', text: 'Yeni yorum: "Harika bir çözüm!"', time: '5 saat önce' },
    { id: 3, icon: '👤', text: 'TechVC sizi takip etmeye başladı', time: 'Dün' },
    { id: 4, icon: '🏆', text: 'PayFlex trending listesine girdi', time: '2 gün önce' },
];

function StatCard({ label, value, growth, icon }) {
    return (
        <div className={styles.statCard}>
            <div className={styles.statIcon}>{icon}</div>
            <div className={styles.statInfo}>
                <span className={styles.statValue}>{value.toLocaleString()}</span>
                <span className={styles.statLabel}>{label}</span>
            </div>
            {growth !== undefined && (
                <span className={`${styles.growth} ${growth >= 0 ? styles.positive : styles.negative}`}>
                    {growth >= 0 ? '↑' : '↓'} {Math.abs(growth)}%
                </span>
            )}
        </div>
    );
}

function ContentRow({ item }) {
    return (
        <Link href={`/${item.type}s/${item.id}`} className={styles.contentRow}>
            <div className={styles.contentInfo}>
                <span className={styles.contentType}>{item.type === 'startup' ? '🚀' : '💡'}</span>
                <span className={styles.contentTitle}>{item.title}</span>
            </div>
            <div className={styles.contentStats}>
                <span>👁️ {item.views.toLocaleString()}</span>
                <span>⬆️ {item.upvotes}</span>
                <span>💬 {item.comments}</span>
                <span className={`${styles.trend} ${styles[item.trend]}`}>
                    {item.trend === 'up' ? '📈' : item.trend === 'down' ? '📉' : '➡️'}
                </span>
            </div>
        </Link>
    );
}

export default function CreatorDashboard({ stats = DEMO_STATS, content = DEMO_CONTENT, activity = DEMO_ACTIVITY }) {
    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>📊 Creator Dashboard</h1>
                <p className={styles.subtitle}>İçeriklerinizin performansını takip edin</p>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <StatCard label="Toplam Görüntülenme" value={stats.totalViews} growth={stats.weeklyGrowth.views} icon="👁️" />
                <StatCard label="Toplam Oy" value={stats.totalUpvotes} growth={stats.weeklyGrowth.upvotes} icon="⬆️" />
                <StatCard label="Toplam Yorum" value={stats.totalComments} growth={stats.weeklyGrowth.comments} icon="💬" />
                <StatCard label="Takipçi" value={stats.followers} growth={stats.weeklyGrowth.followers} icon="👥" />
            </div>

            <div className={styles.mainGrid}>
                {/* Content Performance */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>İçerik Performansı</h2>
                        <Link href="/dashboard/content" className={styles.viewAll}>Tümünü Gör →</Link>
                    </div>
                    <div className={styles.contentList}>
                        {content.map(item => (
                            <ContentRow key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Son Aktiviteler</h2>
                    </div>
                    <div className={styles.activityList}>
                        {activity.map(item => (
                            <div key={item.id} className={styles.activityItem}>
                                <span className={styles.activityIcon}>{item.icon}</span>
                                <div className={styles.activityContent}>
                                    <span className={styles.activityText}>{item.text}</span>
                                    <span className={styles.activityTime}>{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
                <Link href="/submit-problem" className={styles.actionBtn}>
                    💡 Yeni Problem Paylaş
                </Link>
                <Link href="/submit-startup" className={styles.actionBtn}>
                    🚀 Startup Ekle
                </Link>
                <Link href="/settings" className={styles.actionBtnSecondary}>
                    ⚙️ Ayarlar
                </Link>
            </div>
        </div>
    );
}
