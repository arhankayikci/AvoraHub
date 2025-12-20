"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './admin.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const ADMIN_EMAILS = [
    'admin@avorahub.com',
    'ayse@avorahub.com',
    'arhankayikci@gmail.com',
];

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [adminEmails, setAdminEmails] = useState(ADMIN_EMAILS);
    const [newAdminEmail, setNewAdminEmail] = useState('');

    // Real stats from API (empty for now)
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        totalProblems: 0,
        totalStartups: 0,
        totalMentors: 0,
        pendingApprovals: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [pendingItems, setPendingItems] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('adminEmails');
        if (stored) {
            setTimeout(() => {
                setAdminEmails(JSON.parse(stored));
            }, 0);
        }
    }, []);

    const addAdmin = () => {
        if (newAdminEmail && !adminEmails.includes(newAdminEmail)) {
            const updated = [...adminEmails, newAdminEmail];
            setAdminEmails(updated);
            localStorage.setItem('adminEmails', JSON.stringify(updated));
            setNewAdminEmail('');
        }
    };

    const removeAdmin = (email) => {
        if (email === user?.email) {
            alert('Kendinizi admin listesinden kaldıramazsınız!');
            return;
        }
        const updated = adminEmails.filter(e => e !== email);
        setAdminEmails(updated);
        localStorage.setItem('adminEmails', JSON.stringify(updated));
    };

    useEffect(() => {
        if (!loading) {
            const storedAdmins = localStorage.getItem('adminEmails');
            const currentAdminList = storedAdmins ? JSON.parse(storedAdmins) : ADMIN_EMAILS;
            const isAdmin = user && (user.isAdmin || currentAdminList.includes(user.email));
            if (!isAdmin) {
                router.push('/');
            } else {
                setTimeout(() => {
                    setIsAuthorized(true);
                }, 0);
            }
        }
    }, [user, loading, router]);

    if (loading || !isAuthorized) {
        return (
            <div className={styles.loadingPage}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    const menuItems = [
        { id: 'overview', label: 'Genel Bakış', icon: '📊' },
        { id: 'users', label: 'Kullanıcılar', icon: '👥' },
        { id: 'content', label: 'İçerik', icon: '📝' },
        { id: 'analytics', label: 'Analitik', icon: '📈' },
        { id: 'settings', label: 'Ayarlar', icon: '⚙️' },
    ];

    return (
        <div className={styles.dashboardContainer}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ''}`}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>🎯</span>
                        {!isSidebarCollapsed && <span className={styles.logoText}>AvoraHub Admin</span>}
                    </div>
                    <button
                        className={styles.collapseBtn}
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    >
                        {isSidebarCollapsed ? '→' : '←'}
                    </button>
                </div>

                <nav className={styles.sidebarNav}>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            {!isSidebarCollapsed && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <Link href="/" className={styles.backLink}>
                        <span>🏠</span>
                        {!isSidebarCollapsed && <span>Site'ye Dön</span>}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <div className={styles.topBar}>
                    <h1 className={styles.pageTitle}>
                        {menuItems.find(m => m.id === activeTab)?.label}
                    </h1>
                    <div className={styles.userInfo}>
                        <span>Hoş geldin, <strong>{user?.email || 'arhankayikci'}</strong></span>
                        <div className={styles.userAvatar}>
                            {user?.email?.charAt(0).toUpperCase() || 'A'}
                        </div>
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className={styles.overview}>
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon} style={{ background: '#E3F2FD' }}>👤</div>
                                <div className={styles.statContent}>
                                    <span className={styles.statLabel}>Toplam Kullanıcı</span>
                                    <span className={styles.statValue}>{stats.totalUsers}</span>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon} style={{ background: '#E8F5E9' }}>✅</div>
                                <div className={styles.statContent}>
                                    <span className={styles.statLabel}>Aktif Kullanıcı</span>
                                    <span className={styles.statValue}>{stats.activeUsers}</span>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon} style={{ background: '#FFF9C4' }}>🚀</div>
                                <div className={styles.statContent}>
                                    <span className={styles.statLabel}>Startup'lar</span>
                                    <span className={styles.statValue}>{stats.totalStartups}</span>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon} style={{ background: '#FFE0B2' }}>⚡</div>
                                <div className={styles.statContent}>
                                    <span className={styles.statLabel}>Onay Bekleyen</span>
                                    <span className={styles.statValue}>{stats.pendingApprovals}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.contentGrid}>
                            <div className={styles.card}>
                                <h3>Son Aktiviteler</h3>
                                {recentActivity.length > 0 ? (
                                    <div className={styles.activityList}>
                                        {recentActivity.map(activity => (
                                            <div key={activity.id} className={styles.activityItem}>
                                                <span>{activity.user}: {activity.action}</span>
                                                <span className={styles.activityTime}>{activity.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className={styles.emptyState}>Henüz aktivite yok</p>
                                )}
                            </div>

                            <div className={styles.card}>
                                <h3>Onay Bekleyenler</h3>
                                {pendingItems.length > 0 ? (
                                    <div className={styles.pendingList}>
                                        {pendingItems.map(item => (
                                            <div key={item.id} className={styles.pendingItem}>
                                                <div>
                                                    <span className={styles.pendingType}>{item.type}</span>
                                                    <span>{item.title}</span>
                                                </div>
                                                <div className={styles.pendingActions}>
                                                    <button className={styles.approveBtn}>✓</button>
                                                    <button className={styles.rejectBtn}>✗</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className={styles.emptyState}>Onay bekleyen içerik yok</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className={styles.settings}>
                        <div className={styles.settingsCard}>
                            <h3>Admin Yönetimi</h3>
                            <p>Admin yetkisine sahip email adresleri:</p>
                            <div className={styles.adminList}>
                                {adminEmails.map(email => (
                                    <div key={email} className={styles.adminItem}>
                                        <span>{email}</span>
                                        {email !== user?.email && (
                                            <button onClick={() => removeAdmin(email)} className={styles.removeBtn}>
                                                Kaldır
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.addAdminForm}>
                                <input
                                    type="email"
                                    placeholder="Yeni admin email"
                                    value={newAdminEmail}
                                    onChange={(e) => setNewAdminEmail(e.target.value)}
                                    className={styles.adminInput}
                                />
                                <button onClick={addAdmin} className={styles.addBtn}>Ekle</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Other tabs show empty state */}
                {['users', 'content', 'analytics'].includes(activeTab) && (
                    <div className={styles.emptyTab}>
                        <p>Bu bölüm henüz geliştirilme aşamasında.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
