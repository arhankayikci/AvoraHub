"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './admin.module.css';

const ADMIN_EMAILS = [
    'admin@avorahub.com',
    'ayse@avorahub.com',
    'arhankayikci@gmail.com',
];

const DEMO_STATS = {
    totalUsers: 1247,
    activeUsers: 892,
    totalProblems: 456,
    totalStartups: 189,
    totalMentors: 34,
    pendingApprovals: 12,
    totalRevenue: '₺425,000',
    monthlyGrowth: '+18%'
};

const RECENT_ACTIVITY = [
    { id: 1, user: 'Ahmet Yılmaz', action: 'Yeni startup ekledi', item: 'EcoTech Solutions', time: '5 dk önce', type: 'startup' },
    { id: 2, user: 'Elif Demir', action: 'Problem paylaştı', item: 'Ulaşım Sorunu', time: '12 dk önce', type: 'problem' },
    { id: 3, user: 'Can Öztürk', action: 'Hesap oluşturdu', item: '', time: '25 dk önce', type: 'user' },
    { id: 4, user: 'Zeynep Kaya', action: 'Startup\'a yatırım yaptı', item: 'HealthBridge', time: '1 saat önce', type: 'investment' },
];

const PENDING_ITEMS = [
    { id: 1, type: 'Startup', title: 'AI Healthcare Platform', author: 'mehmet@startup.com', submitted: '2 saat önce' },
    { id: 2, type: 'Problem', title: 'Sürdürülebilir Enerji', author: 'ayse@email.com', submitted: '3 saat önce' },
    { id: 3, type: 'Mentor', title: 'Dr. Ali Veli - Başvuru', author: 'ali@mentor.com', submitted: '5 saat önce' },
];

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [adminEmails, setAdminEmails] = useState(ADMIN_EMAILS);
    const [newAdminEmail, setNewAdminEmail] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('adminEmails');
        if (stored) {
            setAdminEmails(JSON.parse(stored));
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
                setIsAuthorized(true);
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
        <div className={styles.adminWrapper}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ''}`}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>🎯</span>
                        {!isSidebarCollapsed && <span className={styles.logoText}>AvoraHub Admin</span>}
                    </div>
                    <button
                        className={styles.toggleBtn}
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    >
                        {isSidebarCollapsed ? '→' : '←'}
                    </button>
                </div>

                <nav className={styles.menu}>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            className={`${styles.menuItem} ${activeTab === item.id ? styles.active : ''}`}
                            onClick={() => setActiveTab(item.id)}
                            title={isSidebarCollapsed ? item.label : ''}
                        >
                            <span className={styles.menuIcon}>{item.icon}</span>
                            {!isSidebarCollapsed && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <Link href="/" className={styles.exitBtn}>
                        <span>🏠</span>
                        {!isSidebarCollapsed && <span>Siteye Dön</span>}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <h1 className={styles.pageTitle}>{menuItems.find(m => m.id === activeTab)?.label}</h1>
                        <p className={styles.pageSubtitle}>Hoş geldin, {user?.name || 'Admin'}</p>
                    </div>
                    <div className={styles.headerRight}>
                        <div className={styles.userBadge}>
                            <div className={styles.avatar}>{user?.name?.charAt(0) || 'A'}</div>
                            <div className={styles.userInfo}>
                                <div className={styles.userName}>{user?.name || 'Admin'}</div>
                                <div className={styles.userRole}>Yönetici</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className={styles.contentArea}>
                    {activeTab === 'overview' && (
                        <>
                            {/* Stats Grid */}
                            <div className={styles.statsGrid}>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon} style={{ background: '#dbeafe' }}>
                                        <span style={{ color: '#1e40af' }}>👤</span>
                                    </div>
                                    <div className={styles.statContent}>
                                        <div className={styles.statValue}>{DEMO_STATS.totalUsers}</div>
                                        <div className={styles.statLabel}>Toplam Kullanıcı</div>
                                        <div className={styles.statChange}>↗ +12% bu ay</div>
                                    </div>
                                </div>

                                <div className={styles.statCard}>
                                    <div className={styles.statIcon} style={{ background: '#dcfce7' }}>
                                        <span style={{ color: '#15803d' }}>✓</span>
                                    </div>
                                    <div className={styles.statContent}>
                                        <div className={styles.statValue}>{DEMO_STATS.activeUsers}</div>
                                        <div className={styles.statLabel}>Aktif Kullanıcı</div>
                                        <div className={styles.statChange}>↗ +8% bu ay</div>
                                    </div>
                                </div>

                                <div className={styles.statCard}>
                                    <div className={styles.statIcon} style={{ background: '#fef3c7' }}>
                                        <span style={{ color: '#b45309' }}>🚀</span>
                                    </div>
                                    <div className={styles.statContent}>
                                        <div className={styles.statValue}>{DEMO_STATS.totalStartups}</div>
                                        <div className={styles.statLabel}>Startuplar</div>
                                        <div className={styles.statChange}>↗ +15% bu ay</div>
                                    </div>
                                </div>

                                <div className={styles.statCard}>
                                    <div className={styles.statIcon} style={{ background: '#fce7f3' }}>
                                        <span style={{ color: '#be185d' }}>⚡</span>
                                    </div>
                                    <div className={styles.statContent}>
                                        <div className={styles.statValue}>{DEMO_STATS.pendingApprovals}</div>
                                        <div className={styles.statLabel}>Onay Bekleyen</div>
                                        <div className={styles.statChange}>Acil</div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity and Pending */}
                            <div className={styles.gridTwo}>
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <h3>Son Aktiviteler</h3>
                                    </div>
                                    <div className={styles.activityList}>
                                        {RECENT_ACTIVITY.map(activity => (
                                            <div key={activity.id} className={styles.activityItem}>
                                                <div className={styles.activityIcon}>
                                                    {activity.type === 'startup' ? '🚀' : activity.type === 'problem' ? '💡' : activity.type === 'user' ? '👤' : '💰'}
                                                </div>
                                                <div className={styles.activityContent}>
                                                    <div className={styles.activityText}>
                                                        <strong>{activity.user}</strong> {activity.action}
                                                        {activity.item && <span className={styles.activityItem}> "{activity.item}"</span>}
                                                    </div>
                                                    <div className={styles.activityTime}>{activity.time}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <h3>Onay Bekleyenler</h3>
                                        <span className={styles.badge}>{PENDING_ITEMS.length}</span>
                                    </div>
                                    <div className={styles.pendingList}>
                                        {PENDING_ITEMS.map(item => (
                                            <div key={item.id} className={styles.pendingItem}>
                                                <div className={styles.pendingInfo}>
                                                    <span className={styles.pendingType}>{item.type}</span>
                                                    <div className={styles.pendingTitle}>{item.title}</div>
                                                    <div className={styles.pendingMeta}>{item.author} • {item.submitted}</div>
                                                </div>
                                                <div className={styles.pendingActions}>
                                                    <button className={styles.btnApprove}>✓</button>
                                                    <button className={styles.btnReject}>✕</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'users' && (
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3>Kullanıcı Yönetimi</h3>
                                <input type="text" placeholder="Ara..." className={styles.searchInput} />
                            </div>
                            <div className={styles.tableWrapper}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Kullanıcı</th>
                                            <th>E-posta</th>
                                            <th>Tür</th>
                                            <th>Durum</th>
                                            <th>Kayıt</th>
                                            <th>İşlem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Ahmet Yılmaz</strong></td>
                                            <td>ahmet@email.com</td>
                                            <td><span className={styles.typeBadge}>Girişimci</span></td>
                                            <td><span className={styles.statusActive}>Aktif</span></td>
                                            <td>2 saat önce</td>
                                            <td><button className={styles.btnAction}>Düzenle</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3>Admin Yönetimi</h3>
                            </div>
                            <div className={styles.adminEmailList}>
                                {adminEmails.map((email, i) => (
                                    <div key={i} className={styles.emailItem}>
                                        <span>{email}</span>
                                        <button onClick={() => removeAdmin(email)} className={styles.btnRemove}>Kaldır</button>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.addAdmin}>
                                <input
                                    type="email"
                                    placeholder="yeni@admin.com"
                                    value={newAdminEmail}
                                    onChange={(e) => setNewAdminEmail(e.target.value)}
                                    className={styles.emailInput}
                                />
                                <button onClick={addAdmin} className={styles.btnAdd}>Ekle</button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
