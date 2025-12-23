"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './dashboard.module.css';

// Fallback demo data (used when no real data)
const DEMO_STATS = {
    views: { value: 0, change: 0, label: 'Görüntülenme' },
    upvotes: { value: 0, change: 0, label: 'Toplam Oy' },
    comments: { value: 0, change: 0, label: 'Yorum' },
    followers: { value: 0, change: 0, label: 'Takipçi' }
};

const DEMO_CHART_DATA = [
    { day: 'Pzt', views: 0 },
    { day: 'Sal', views: 0 },
    { day: 'Çar', views: 0 },
    { day: 'Per', views: 0 },
    { day: 'Cum', views: 0 },
    { day: 'Cmt', views: 0 },
    { day: 'Paz', views: 0 },
];

function StatCard({ stat }) {
    const isPositive = stat.change >= 0;
    return (
        <div className={styles.statCard}>
            <div className={styles.statHeader}>
                <span className={styles.statLabel}>{stat.label}</span>
                {stat.change !== 0 && (
                    <span className={`${styles.statChange} ${isPositive ? styles.positive : styles.negative}`}>
                        {isPositive ? '↑' : '↓'} {Math.abs(stat.change)}%
                    </span>
                )}
            </div>
            <div className={styles.statValue}>{stat.value.toLocaleString()}</div>
        </div>
    );
}

function MiniChart({ data }) {
    const maxValue = Math.max(...data.map(d => d.views), 1);

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

function ContentTable({ content, userId }) {
    return (
        <div className={styles.contentTable}>
            <div className={styles.tableHeader}>
                <h3>İçeriklerim</h3>
            </div>
            {content.length === 0 ? (
                <div className={styles.emptyState}>
                    <span className={styles.emptyIcon}>📭</span>
                    <p>Henüz içerik eklemediniz</p>
                    <Link href="/submit-startup" className={styles.addBtn}>İlk Startup'ınızı Ekleyin</Link>
                </div>
            ) : (
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
                            <span>{(item.views || 0).toLocaleString()}</span>
                            <span>{item.upvotes || item.votes || 0}</span>
                            <span>{item.comments || 0}</span>
                            <span className={`${styles.status} ${item.status === 'active' || item.is_published !== false ? styles.active : styles.pending}`}>
                                {item.status === 'active' || item.is_published !== false ? 'Aktif' : 'Beklemede'}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

function ActivityFeed({ notifications }) {
    return (
        <div className={styles.activityFeed}>
            <h3>Son Aktiviteler</h3>
            {notifications.length === 0 ? (
                <p className={styles.emptyText}>Henüz aktivite yok</p>
            ) : (
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
            )}
        </div>
    );
}

function QuickActions({ userRole }) {
    const actions = userRole === 'investor' ? [
        { icon: '🔍', label: 'Startup Ara', href: '/startups' },
        { icon: '📊', label: 'Problemler', href: '/problems' },
        { icon: '👥', label: 'Mentörler', href: '/mentors' },
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

function ValidationScoreWidget({ profile }) {
    const score = profile?.validation_score || 0;
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    const getScoreLabel = (s) => {
        if (s >= 80) return 'Mükemmel';
        if (s >= 60) return 'İyi';
        if (s >= 40) return 'Orta';
        return 'Başlangıç';
    };

    return (
        <div className={styles.validationWidget}>
            <h3>Profil Puanı</h3>
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
                    <span className={styles.scoreLabel}>{getScoreLabel(score)}</span>
                </div>
            </div>
            <div className={styles.scoreTips}>
                <div className={styles.tipItem}>
                    <span className={styles.tipIcon}>💡</span>
                    <span>Profilinizi tamamlayın</span>
                </div>
            </div>
        </div>
    );
}

// Settings Content
function SettingsContent() {
    return (
        <div className={styles.settingsRedirect}>
            <div className={styles.settingsCard}>
                <span className={styles.settingsIcon}>⚙️</span>
                <h3>Ayarlar</h3>
                <p>Profil, gizlilik ve bildirim ayarlarınızı düzenleyin</p>
                <Link href="/settings" className={styles.settingsBtn}>Ayarlara Git →</Link>
            </div>
        </div>
    );
}

// My Content Section
function MyContentSection({ userContent, userId }) {
    return (
        <div className={styles.fullContentSection}>
            <h2>İçeriklerim</h2>
            <ContentTable content={userContent} userId={userId} />
        </div>
    );
}

// Notifications Section
function NotificationsSection({ notifications }) {
    return (
        <div className={styles.fullNotificationsSection}>
            <h2>Bildirimler</h2>
            <ActivityFeed notifications={notifications} />
        </div>
    );
}

// My Applications Section
function MyApplicationsSection({ applications, loading }) {
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Bugün';
        if (diffDays === 1) return 'Dün';
        if (diffDays < 7) return `${diffDays} gün önce`;
        return date.toLocaleDateString('tr-TR');
    };

    const getStatusInfo = (status) => {
        const map = {
            pending: { label: 'Değerlendiriliyor', class: 'statusPending' },
            interview: { label: 'Mülakat', class: 'statusInterview' },
            offer: { label: 'Teklif', class: 'statusOffer' },
            rejected: { label: 'Reddedildi', class: 'statusRejected' }
        };
        return map[status] || { label: status, class: 'statusPending' };
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    return (
        <div className={styles.applicationsSection}>
            <h2>📋 Başvurularım</h2>
            {applications.length === 0 ? (
                <div className={styles.emptyApplications}>
                    <span className={styles.emptyIcon}>📭</span>
                    <h3>Henüz başvuru yapmadınız</h3>
                    <p>İş ilanlarını keşfedin ve kariyer yolculuğunuza başlayın.</p>
                    <Link href="/jobs" className={styles.exploreBtn}>İlanları Keşfet</Link>
                </div>
            ) : (
                <div className={styles.applicationsList}>
                    {applications.map(app => {
                        const job = app.jobs;
                        const statusInfo = getStatusInfo(app.status);
                        return (
                            <Link key={app.id} href={`/jobs/${job?.id}`} className={styles.applicationCard}>
                                <div className={styles.appLogo}>
                                    {job?.company_logo ? (
                                        <img src={job.company_logo} alt={job.company} />
                                    ) : (
                                        <span>{job?.company?.charAt(0) || 'J'}</span>
                                    )}
                                </div>
                                <div className={styles.appInfo}>
                                    <h4>{job?.title || 'İlan'}</h4>
                                    <p>{job?.company}</p>
                                    <span className={styles.appDate}>{formatDate(app.applied_at)}</span>
                                </div>
                                <span className={`${styles.appStatus} ${styles[statusInfo.class]}`}>
                                    {statusInfo.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function DashboardPage() {
    const { user, profile, loading } = useAuth();
    const router = useRouter();
    const [activeSection, setActiveSection] = useState('overview');
    const [userContent, setUserContent] = useState([]);
    const [stats, setStats] = useState(DEMO_STATS);
    const [chartData, setChartData] = useState(DEMO_CHART_DATA);
    const [notifications, setNotifications] = useState([]);
    const [matchingJobs, setMatchingJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [applications, setApplications] = useState([]);
    const [applicationsLoading, setApplicationsLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    // Fetch user's real content
    useEffect(() => {
        async function fetchUserData() {
            if (!user?.id || !supabase) {
                setDataLoading(false);
                return;
            }

            try {
                // Fetch user's startups
                const { data: startups } = await supabase
                    .from('startups')
                    .select('id, name, likes, comments, views')
                    .eq('user_id', user.id);

                // Fetch user's problems
                const { data: problems } = await supabase
                    .from('problems')
                    .select('id, title, votes, comments, views')
                    .eq('author_id', user.id);

                // Combine content
                const content = [
                    ...(startups || []).map(s => ({
                        id: s.id,
                        type: 'startup',
                        title: s.name,
                        views: s.views || 0,
                        upvotes: s.likes || 0,
                        comments: s.comments || 0,
                        status: 'active'
                    })),
                    ...(problems || []).map(p => ({
                        id: p.id,
                        type: 'problem',
                        title: p.title,
                        views: p.views || 0,
                        upvotes: p.votes || 0,
                        comments: p.comments || 0,
                        status: 'active'
                    }))
                ];

                setUserContent(content);

                // Calculate stats
                const totalViews = content.reduce((acc, item) => acc + (item.views || 0), 0);
                const totalUpvotes = content.reduce((acc, item) => acc + (item.upvotes || 0), 0);
                const totalComments = content.reduce((acc, item) => acc + (item.comments || 0), 0);

                setStats({
                    views: { value: totalViews, change: 0, label: 'Görüntülenme' },
                    upvotes: { value: totalUpvotes, change: 0, label: 'Toplam Oy' },
                    comments: { value: totalComments, change: 0, label: 'Yorum' },
                    followers: { value: profile?.followers_count || 0, change: 0, label: 'Takipçi' }
                });

            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setDataLoading(false);
            }
        }

        fetchUserData();
    }, [user?.id, profile]);

    // Fetch matching jobs via RPC
    useEffect(() => {
        async function fetchMatchingJobs() {
            if (!user?.id || !supabase) {
                setJobsLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .rpc('get_matching_jobs', { user_uuid: user.id });

                if (error) {
                    console.error('RPC error:', error);
                    setMatchingJobs([]);
                } else {
                    setMatchingJobs(data || []);
                }
            } catch (error) {
                console.error('Error fetching matching jobs:', error);
                setMatchingJobs([]);
            } finally {
                setJobsLoading(false);
            }
        }

        fetchMatchingJobs();
    }, [user?.id]);

    // Fetch user's applications
    useEffect(() => {
        async function fetchApplications() {
            if (!user?.id || !supabase) {
                setApplicationsLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('applications')
                    .select(`
                        id,
                        status,
                        applied_at,
                        job_id,
                        jobs:job_id (
                            id,
                            title,
                            company,
                            company_logo,
                            location
                        )
                    `)
                    .eq('user_id', user.id)
                    .order('applied_at', { ascending: false });

                if (error) throw error;
                setApplications(data || []);
            } catch (error) {
                console.error('Error fetching applications:', error);
            } finally {
                setApplicationsLoading(false);
            }
        }

        fetchApplications();
    }, [user?.id]);

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
        { id: 'applications', icon: '📋', label: 'Başvurularım' },
        { id: 'analytics', icon: '📈', label: 'Analitik', href: '/dashboard/analytics' },
        { id: 'employer', icon: '💼', label: 'İşveren Paneli', href: '/dashboard/employer' },
        { id: 'notifications', icon: '🔔', label: 'Bildirimler' },
        { id: 'settings', icon: '⚙️', label: 'Ayarlar', href: '/settings' },
    ];

    const handleNavClick = (item) => {
        if (item.href) {
            router.push(item.href);
        } else {
            setActiveSection(item.id);
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'content':
                return <MyContentSection userContent={userContent} userId={user.id} />;
            case 'applications':
                return <MyApplicationsSection applications={applications} loading={applicationsLoading} />;
            case 'notifications':
                return <NotificationsSection notifications={notifications} />;
            case 'settings':
                return <SettingsContent />;
            default:
                return (
                    <>
                        {/* Stats Grid */}
                        <div className={styles.statsGrid}>
                            {Object.entries(stats).map(([key, stat]) => (
                                <StatCard key={key} stat={stat} />
                            ))}
                        </div>

                        {/* Content Grid */}
                        <div className={styles.contentGrid}>
                            <div className={styles.mainColumn}>
                                <MiniChart data={chartData} />
                                <ContentTable content={userContent.slice(0, 5)} userId={user.id} />
                            </div>
                            <div className={styles.sideColumn}>
                                <QuickActions userRole={profile?.role} />
                                <ValidationScoreWidget profile={profile} />
                                <ActivityFeed notifications={notifications} />
                            </div>
                        </div>

                        {/* Job Recommendations */}
                        <div className={styles.jobRecommendations}>
                            <div className={styles.sectionHeader}>
                                <h2>💼 Sizin İçin Önerilen İlanlar</h2>
                                <Link href="/jobs" className={styles.seeAllLink}>Tümünü Gör →</Link>
                            </div>

                            {jobsLoading ? (
                                <div className={styles.jobsLoading}>
                                    <div className={styles.spinner}></div>
                                    <p>İlanlar yükleniyor...</p>
                                </div>
                            ) : matchingJobs.length === 0 ? (
                                <div className={styles.noJobsCard}>
                                    <span className={styles.noJobsIcon}>🎯</span>
                                    <h3>Henüz eşleşen ilan yok</h3>
                                    <p>Profilinizdeki ilgi alanlarını güncelleyerek size özel iş fırsatlarını yakalayın.</p>
                                    <Link href="/settings" className={styles.updateProfileBtn}>Profili Güncelle</Link>
                                </div>
                            ) : (
                                <div className={styles.jobsGrid}>
                                    {matchingJobs.slice(0, 6).map((job) => (
                                        <Link key={job.id} href={`/jobs/${job.id}`} className={styles.jobCard}>
                                            <div className={styles.jobHeader}>
                                                <div className={styles.companyLogo}>
                                                    {job.company_logo ? (
                                                        <img src={job.company_logo} alt={job.company_name} />
                                                    ) : (
                                                        <span>{job.company_name?.charAt(0) || 'C'}</span>
                                                    )}
                                                </div>
                                                <div className={styles.matchScore}>
                                                    <span className={styles.scoreText}>
                                                        {job.match_score || 0}/{job.max_score || 5} uyumlu
                                                    </span>
                                                </div>
                                            </div>
                                            <h3 className={styles.jobTitle}>{job.title}</h3>
                                            <p className={styles.companyName}>{job.company_name}</p>
                                            <div className={styles.jobMeta}>
                                                <span className={styles.jobLocation}>
                                                    📍 {job.location || 'Uzaktan'}
                                                </span>
                                                <span className={styles.jobType}>
                                                    {job.job_type === 'full-time' ? 'Tam Zamanlı' :
                                                        job.job_type === 'part-time' ? 'Yarı Zamanlı' :
                                                            job.job_type === 'contract' ? 'Sözleşmeli' : 'Staj'}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                );
        }
    };

    return (
        <div className={styles.dashboardLayout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.userCard}>
                        <div className={styles.userAvatar}>
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt={user.name} className={styles.avatarImg} />
                            ) : (
                                user.name?.charAt(0).toUpperCase() || 'U'
                            )}
                        </div>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>{profile?.full_name || user.name}</span>
                            <span className={styles.userType}>
                                {profile?.role === 'investor' ? 'Yatırımcı' : profile?.role === 'entrepreneur' ? 'Girişimci' : 'Kullanıcı'}
                            </span>
                        </div>
                    </div>
                </div>

                <nav className={styles.sidebarNav}>
                    {sidebarItems.map(item => (
                        <button
                            key={item.id}
                            className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
                            onClick={() => handleNavClick(item)}
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
                            Hoş geldin, {(profile?.full_name || user.name)?.split(' ')[0]} 👋
                        </h1>
                        <p className={styles.pageSubtitle}>
                            {activeSection === 'overview' && 'İşte bugünkü performansınızın özeti'}
                            {activeSection === 'content' && 'Tüm içeriklerinizi buradan yönetin'}
                            {activeSection === 'applications' && 'İş başvurularınızı takip edin'}
                            {activeSection === 'notifications' && 'Son bildirimleriniz'}
                            {activeSection === 'settings' && 'Hesap ayarlarınız'}
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

                {dataLoading ? (
                    <div className={styles.loadingContainer}>
                        <div className={styles.spinner}></div>
                    </div>
                ) : renderContent()}
            </main>
        </div>
    );
}
