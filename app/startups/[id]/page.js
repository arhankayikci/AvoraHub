import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cookies } from 'next/headers';
import styles from './startup-detail.module.css';

// SEO: Generate dynamic metadata
export async function generateMetadata({ params }) {
    const { id } = await params;

    if (!supabase) {
        return { title: 'Startup | AvoraHub' };
    }

    const { data: startup } = await supabase
        .from('startups')
        .select('name, tagline, description, category')
        .eq('id', id)
        .single();

    if (!startup) {
        return { title: 'Startup Bulunamadı | AvoraHub' };
    }

    const description = startup.description
        ? startup.description.substring(0, 150) + '...'
        : startup.tagline || `${startup.name} - ${startup.category} kategorisinde Türk startup'ı`;

    return {
        title: `${startup.name} - ${startup.tagline || startup.category} | AvoraHub`,
        description,
        keywords: ['startup', startup.name, startup.category, 'Türkiye', 'girişim', 'yatırım'].filter(Boolean),
        openGraph: {
            title: startup.name,
            description,
            type: 'website',
            url: `https://avorahub.com.tr/startups/${id}`,
            siteName: 'AvoraHub',
        },
        twitter: {
            card: 'summary',
            title: startup.name,
            description,
        },
        alternates: {
            canonical: `https://avorahub.com.tr/startups/${id}`,
        },
    };
}

// Server Component with Soft Gating
export default async function StartupDetailPage({ params }) {
    const { id } = await params;

    // Fetch startup data (always - for SEO)
    if (!supabase) {
        notFound();
    }

    const { data: startup, error } = await supabase
        .from('startups')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !startup) {
        notFound();
    }

    // Check user session for gating
    let isAuthenticated = false;
    try {
        const cookieStore = await cookies();
        const allCookies = cookieStore.getAll();
        const supabaseCookie = allCookies.find(c =>
            c.name.startsWith('sb-') && c.name.includes('auth-token')
        );
        isAuthenticated = !!supabaseCookie;
    } catch (e) {
        isAuthenticated = false;
    }

    // Teaser description (first 300 chars)
    const teaserDescription = startup.description?.substring(0, 300) || '';
    const hasMoreContent = startup.description?.length > 300;

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Breadcrumb */}
                <div className={styles.breadcrumb}>
                    <Link href="/">Ana Sayfa</Link>
                    <span>/</span>
                    <Link href="/startups">Startup&apos;lar</Link>
                    <span>/</span>
                    <span>{startup.category}</span>
                </div>

                {/* Hero Section - Always Public */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <div className={styles.logoWrapper}>
                            {startup.logo_url ? (
                                <img src={startup.logo_url} alt={startup.name} className={styles.logo} />
                            ) : (
                                <div className={styles.logoPlaceholder}>{startup.name[0]}</div>
                            )}
                        </div>
                        <div className={styles.headerInfo}>
                            <span className={styles.categoryBadge}>{startup.category}</span>
                            <h1 className={styles.title}>{startup.name}</h1>
                            <p className={styles.tagline}>{startup.tagline}</p>
                            <div className={styles.meta}>
                                <span className={styles.stageBadge}>{startup.stage}</span>
                                <span className={styles.location}>📍 {startup.country}</span>
                                {startup.founded_year && (
                                    <span className={styles.year}>📅 {startup.founded_year}</span>
                                )}
                            </div>
                        </div>
                        <div className={styles.heroStats}>
                            <div className={styles.statBox}>
                                <span className={styles.statNumber}>{startup.likes || 0}</span>
                                <span className={styles.statLabel}>Beğeni</span>
                            </div>
                            <div className={styles.statBox}>
                                <span className={styles.statNumber}>{startup.comments || 0}</span>
                                <span className={styles.statLabel}>Yorum</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className={styles.contentGrid}>
                    {/* Main Content */}
                    <main className={styles.mainContent}>
                        {/* About Section */}
                        <div className={styles.contentCard}>
                            <h2 className={styles.sectionTitle}>Hakkında</h2>

                            {isAuthenticated ? (
                                // Full content for authenticated users
                                <>
                                    <p className={styles.description}>{startup.description}</p>

                                    {/* Funding Info */}
                                    {startup.funding && (
                                        <div className={styles.fundingBox}>
                                            <span className={styles.fundingLabel}>💰 Toplam Yatırım</span>
                                            <span className={styles.fundingValue}>{startup.funding}</span>
                                        </div>
                                    )}

                                    {/* Team Size */}
                                    {startup.team_size && (
                                        <div className={styles.infoRow}>
                                            <span>👥 Ekip Büyüklüğü:</span>
                                            <span>{startup.team_size} kişi</span>
                                        </div>
                                    )}

                                    {/* Website - Authenticated Only */}
                                    {startup.website && (
                                        <div className={styles.ctaSection}>
                                            <a
                                                href={startup.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.visitButton}
                                            >
                                                🌐 Web Sitesini Ziyaret Et
                                            </a>
                                        </div>
                                    )}
                                </>
                            ) : (
                                // Teaser content for guests
                                <div className={styles.gatedContent}>
                                    <div className={styles.teaserDescription}>
                                        <p>{teaserDescription}{hasMoreContent && '...'}</p>
                                        <div className={styles.fadeOverlay}></div>
                                    </div>

                                    {/* Login Wall CTA */}
                                    <div className={styles.loginWall}>
                                        <div className={styles.loginWallIcon}>🔒</div>
                                        <h3>Tüm detayları görün</h3>
                                        <p>Yatırım bilgileri, ekip detayları ve web sitesi için üye olun.</p>
                                        <div className={styles.loginWallButtons}>
                                            <Link href={`/login?redirect=/startups/${id}`} className={styles.loginButton}>
                                                Giriş Yap
                                            </Link>
                                            <Link href={`/register?redirect=/startups/${id}`} className={styles.registerButton}>
                                                Ücretsiz Üye Ol
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Info Cards - Public summary */}
                        <div className={styles.infoCards}>
                            <div className={styles.infoCard}>
                                <h3>📈 Aşama</h3>
                                <span className={styles.infoValue}>{startup.stage}</span>
                            </div>
                            <div className={styles.infoCard}>
                                <h3>🏷️ Kategori</h3>
                                <span className={styles.infoValue}>{startup.category}</span>
                            </div>
                            <div className={styles.infoCard}>
                                <h3>🌍 Lokasyon</h3>
                                <span className={styles.infoValue}>{startup.country}</span>
                            </div>
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarCard}>
                            <h4>Hızlı Bilgi</h4>
                            <div className={styles.quickStats}>
                                <div className={styles.quickStatItem}>
                                    <span>📊 Aşama</span>
                                    <span>{startup.stage}</span>
                                </div>
                                <div className={styles.quickStatItem}>
                                    <span>🏷️ Kategori</span>
                                    <span>{startup.category}</span>
                                </div>
                                <div className={styles.quickStatItem}>
                                    <span>🌍 Ülke</span>
                                    <span>{startup.country}</span>
                                </div>
                                {startup.founded_year && (
                                    <div className={styles.quickStatItem}>
                                        <span>📅 Kuruluş</span>
                                        <span>{startup.founded_year}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Share */}
                        <div className={styles.sidebarCard}>
                            <h4>Bu Startup&apos;ı Paylaş</h4>
                            <div className={styles.shareButtons}>
                                <button className={styles.shareBtn}>LinkedIn</button>
                                <button className={styles.shareBtn}>Twitter</button>
                            </div>
                        </div>

                        {/* Claim Profile */}
                        <div className={styles.sidebarCard}>
                            <h4>Bu Girişim Senin mi?</h4>
                            <p className={styles.claimText}>Profilini sahiplen ve bilgilerini güncelle</p>
                            <a href={`mailto:contact@avorahub.com.tr?subject=Sahiplendirme: ${startup.name}`} className={styles.claimButton}>
                                🏢 Sahiplen
                            </a>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
