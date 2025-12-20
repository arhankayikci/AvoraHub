"use client";

import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './profile.module.css';
import ProblemCard from '@/components/ProblemCard';
import StartupCard from '@/components/StartupCard';

const profileTypeLabels = {
    'entrepreneur': 'Girişimci',
    'problem-owner': 'Problem Sahibi',
    'investor': 'Yatırımcı',
    'solution-seeker': 'Çözüm Arayan'
};

function ProfileContent() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState('overview');
    const [problems, setProblems] = useState([]);
    const [startups, setStartups] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    // Handle tab from URL query parameter
    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam && ['overview', 'problems', 'startups', 'favorites'].includes(tabParam)) {
            setActiveTab(tabParam);
        }
    }, [searchParams]);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            try {
                const [problemsRes, startupsRes, favoritesRes] = await Promise.all([
                    fetch('/api/problems'),
                    fetch('/api/startups'),
                    fetch(`/api/favorites?userId=${user.id}`)
                ]);

                const problemsData = await problemsRes.json();
                const startupsData = await startupsRes.json();
                const favoritesData = await favoritesRes.json();

                const userProblems = problemsData.filter(p => p.author === user.name || p.authorId === user.id);
                const userStartups = startupsData.filter(s => s.author === user.name || s.authorId === user.id);

                setProblems(userProblems);
                setStartups(userStartups);
                setFavorites(favoritesData);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    if (authLoading || !user) {
        return <div className="loading">Yükleniyor...</div>;
    }

    const totalEngagement = problems.reduce((acc, curr) => acc + (curr.votes || 0), 0) +
        startups.reduce((acc, curr) => acc + (curr.likes || 0), 0);

    const joinDate = new Date(user.createdAt || '2025-01-01');
    const joinDateFormatted = joinDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

    return (
        <div className={styles.container}>
            {/* Clean Header */}
            <div className={styles.header}>
                <div className={styles.mainContent}>
                    {/* Spacer for header */}
                </div>
            </div>

            <div className={styles.mainContent}>
                {/* Profile Header Card */}
                <div className={styles.profileHeader}>
                    <div className={styles.profileTop}>
                        <div className={styles.avatarWrapper}>
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className={styles.avatar} />
                            ) : (
                                <div className={styles.avatarPlaceholder}>
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <div className={styles.profileInfo}>
                            <div className={styles.nameRow}>
                                <h1 className={styles.name}>{user.name}</h1>
                                <div className={styles.roleBadge}>
                                    {profileTypeLabels[user.userType] || 'Kullanıcı'}
                                </div>
                            </div>

                            <p className={styles.bio}>
                                {user.bio || 'Avora topluluğunun aktif bir üyesi. Problemler ve çözümler üzerine çalışıyorum.'}
                            </p>

                            <div className={styles.profileMeta}>
                                <div className={styles.metaItem}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    <span>Türkiye</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>Katılış: {joinDateFormatted}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.profileActions}>
                            <Link href="/settings" className={`${styles.actionButton} ${styles.primaryButton}`}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                Düzenle
                            </Link>
                            <button className={`${styles.actionButton} ${styles.secondaryButton}`}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="18" cy="5" r="3"></circle>
                                    <circle cx="6" cy="12" r="3"></circle>
                                    <circle cx="18" cy="19" r="3"></circle>
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                </svg>
                                Paylaş
                            </button>
                        </div>
                    </div>

                    {/* Inline Stats Bar */}
                    <div className={styles.statsBar}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>{problems.length}</span>
                            <span className={styles.statLabel}>Problem</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>{startups.length}</span>
                            <span className={styles.statLabel}>Girişim</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>{totalEngagement}</span>
                            <span className={styles.statLabel}>Etkileşim</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>0</span>
                            <span className={styles.statLabel}>Takipçi</span>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className={styles.contentGrid}>
                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        {/* Interests Card */}
                        {user.interests && user.interests.length > 0 && (
                            <div className={styles.card}>
                                <h2 className={styles.cardTitle}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    İlgi Alanları
                                </h2>
                                <div className={styles.interestsList}>
                                    {user.interests.map((interest, index) => (
                                        <span key={index} className={styles.interestTag}>
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* About Card */}
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                                Hakkında
                            </h2>
                            <div className={styles.aboutList}>
                                <div className={styles.aboutItem}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="8.5" cy="7" r="4"></circle>
                                        <line x1="20" y1="8" x2="20" y2="14"></line>
                                        <line x1="23" y1="11" x2="17" y2="11"></line>
                                    </svg>
                                    <span>Yeni Üye</span>
                                </div>
                                <div className={styles.aboutItem}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <span>{joinDateFormatted} tarihinde katıldı</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className={styles.mainArea}>
                        <div className={styles.tabs}>
                            <button
                                className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                Genel Bakış
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === 'startups' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('startups')}
                            >
                                Girişimler
                                <span className={styles.tabBadge}>{startups.length}</span>
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === 'problems' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('problems')}
                            >
                                Problemler
                                <span className={styles.tabBadge}>{problems.length}</span>
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === 'favorites' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('favorites')}
                            >
                                Favoriler
                                <span className={styles.tabBadge}>{favorites.length}</span>
                            </button>
                        </div>

                        {activeTab === 'overview' && (
                            <div>
                                {(startups.length > 0 || problems.length > 0) ? (
                                    <div className={styles.contentItems}>
                                        {[...startups.slice(0, 2), ...problems.slice(0, 2)]
                                            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
                                            .map((item, idx) =>
                                                item.tagline ? (
                                                    <StartupCard key={`s-${idx}`} {...item} countryCode={item.country} />
                                                ) : (
                                                    <ProblemCard key={`p-${idx}`} {...item} countryCode={item.country} />
                                                )
                                            )}
                                    </div>
                                ) : (
                                    <div className={styles.emptyState}>
                                        <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                            <path d="M2 17l10 5 10-5"></path>
                                            <path d="M2 12l10 5 10-5"></path>
                                        </svg>
                                        <h3 className={styles.emptyTitle}>Henüz Aktivite Yok</h3>
                                        <p className={styles.emptyText}>
                                            İlk girişiminizi veya probleminizi paylaşarak başlayın!
                                        </p>
                                        <Link href="/submit-startup" className={styles.createButton}>
                                            Hemen Başla
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'startups' && (
                            startups.length > 0 ? (
                                <div className={styles.contentItems}>
                                    {startups.map(startup => (
                                        <StartupCard key={startup.id} {...startup} countryCode={startup.country} />
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.emptyState}>
                                    <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                        <path d="M2 17l10 5 10-5"></path>
                                        <path d="M2 12l10 5 10-5"></path>
                                    </svg>
                                    <h3 className={styles.emptyTitle}>Henüz Girişim Yok</h3>
                                    <p className={styles.emptyText}>
                                        Girişiminizi paylaşın ve yatırımcılarla buluşun.
                                    </p>
                                    <Link href="/submit-startup" className={styles.createButton}>
                                        Girişim Ekle
                                    </Link>
                                </div>
                            )
                        )}

                        {activeTab === 'problems' && (
                            problems.length > 0 ? (
                                <div className={styles.contentItems}>
                                    {problems.map(problem => (
                                        <ProblemCard key={problem.id} {...problem} countryCode={problem.country} />
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.emptyState}>
                                    <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m.343 3.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                    </svg>
                                    <h3 className={styles.emptyTitle}>Henüz Problem Yok</h3>
                                    <p className={styles.emptyText}>
                                        Çözmek istediğiniz problemleri toplulukla paylaşın.
                                    </p>
                                    <Link href="/submit-problem" className={styles.createButton}>
                                        Problem Paylaş
                                    </Link>
                                </div>
                            )
                        )}

                        {activeTab === 'favorites' && (
                            favorites.length > 0 ? (
                                <div className={styles.contentItems}>
                                    {favorites.map(fav => {
                                        if (fav.itemType === 'startup') {
                                            const startup = startups.find(s => s.id === fav.itemId);
                                            return startup ? <StartupCard key={fav.id} {...startup} countryCode={startup.country} /> : null;
                                        } else {
                                            const problem = problems.find(p => p.id === fav.itemId);
                                            return problem ? <ProblemCard key={fav.id} {...problem} countryCode={problem.country} /> : null;
                                        }
                                    })}
                                </div>
                            ) : (
                                <div className={styles.emptyState}>
                                    <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                    <h3 className={styles.emptyTitle}>Henüz Favori Yok</h3>
                                    <p className={styles.emptyText}>
                                        Beğendiğiniz girişimleri ve problemleri favorilere ekleyin.
                                    </p>
                                </div>
                            )
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

// Loading fallback for Suspense
function ProfileLoading() {
    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <div className="loading">Yükleniyor...</div>
            </div>
        </div>
    );
}

// Main export with Suspense boundary
export default function ProfilePage() {
    return (
        <Suspense fallback={<ProfileLoading />}>
            <ProfileContent />
        </Suspense>
    );
}
