import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cookies } from 'next/headers';
import styles from './job-detail.module.css';

// SEO: Generate dynamic metadata
export async function generateMetadata({ params }) {
    const { id } = await params;

    if (!supabase) {
        return { title: 'İş İlanı | AvoraHub' };
    }

    const { data: job } = await supabase
        .from('jobs')
        .select('title, company, description, location')
        .eq('id', id)
        .single();

    if (!job) {
        return { title: 'İş İlanı Bulunamadı | AvoraHub' };
    }

    const description = job.description
        ? job.description.substring(0, 150) + '...'
        : `${job.company} şirketinde ${job.title} pozisyonu için başvuru yapın.`;

    return {
        title: `${job.title} @ ${job.company} | AvoraHub`,
        description,
        keywords: ['iş ilanı', 'kariyer', job.title, job.company, job.location, 'startup', 'Türkiye'].filter(Boolean),
        openGraph: {
            title: `${job.title} @ ${job.company}`,
            description,
            type: 'website',
            url: `https://avorahub.com.tr/jobs/${id}`,
            siteName: 'AvoraHub',
        },
        twitter: {
            card: 'summary',
            title: `${job.title} @ ${job.company}`,
            description,
        },
        alternates: {
            canonical: `https://avorahub.com.tr/jobs/${id}`,
        },
    };
}

// Server Component with Soft Gating
export default async function JobDetailPage({ params }) {
    const { id } = await params;

    // Fetch job data (always - for SEO)
    if (!supabase) {
        notFound();
    }

    const { data: job, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !job) {
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
        // Not authenticated
        isAuthenticated = false;
    }

    // Format date
    const postedDate = job.created_at
        ? new Date(job.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'Bilinmiyor';

    // Teaser description (first 300 chars)
    const teaserDescription = job.description?.substring(0, 300) || '';
    const hasMoreContent = job.description?.length > 300;

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Breadcrumb */}
                <div className={styles.breadcrumb}>
                    <Link href="/">Ana Sayfa</Link>
                    <span>/</span>
                    <Link href="/jobs">İş İlanları</Link>
                    <span>/</span>
                    <span>{job.title}</span>
                </div>

                <div className={styles.layout}>
                    {/* Main Content */}
                    <main className={styles.main}>
                        {/* Header - Always Public */}
                        <header className={styles.header}>
                            <div className={styles.companyLogo}>
                                {job.company_logo ? (
                                    <img src={job.company_logo} alt={job.company} />
                                ) : (
                                    <span>{job.company?.[0] || 'J'}</span>
                                )}
                            </div>
                            <div className={styles.headerInfo}>
                                <h1 className={styles.title}>{job.title}</h1>
                                <p className={styles.company}>{job.company}</p>
                                <div className={styles.meta}>
                                    <span className={styles.location}>📍 {job.location}</span>
                                    <span className={styles.type}>{job.job_type}</span>
                                    <span className={styles.date}>📅 {postedDate}</span>
                                </div>
                            </div>
                        </header>

                        {/* Description Section with Soft Gating */}
                        <section className={styles.descriptionSection}>
                            <h2>Pozisyon Açıklaması</h2>

                            {isAuthenticated ? (
                                // Full content for authenticated users
                                <>
                                    <div className={styles.description}>
                                        <p>{job.description}</p>
                                    </div>

                                    {/* Salary - Authenticated Only */}
                                    {job.salary_range && (
                                        <div className={styles.salaryBox}>
                                            <span className={styles.salaryLabel}>💰 Maaş Aralığı</span>
                                            <span className={styles.salaryValue}>{job.salary_range}</span>
                                        </div>
                                    )}

                                    {/* Requirements */}
                                    {job.requirements?.length > 0 && (
                                        <div className={styles.requirements}>
                                            <h3>Aranan Nitelikler</h3>
                                            <ul>
                                                {job.requirements.map((req, i) => (
                                                    <li key={i}>{req}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Benefits */}
                                    {job.benefits?.length > 0 && (
                                        <div className={styles.benefits}>
                                            <h3>Yan Haklar</h3>
                                            <ul>
                                                {job.benefits.map((benefit, i) => (
                                                    <li key={i}>{benefit}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Apply Button - Authenticated Only */}
                                    <div className={styles.applySection}>
                                        <a
                                            href={job.apply_url || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.applyButton}
                                        >
                                            Başvuru Yap →
                                        </a>
                                    </div>
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
                                        <h3>Bu ilanın tüm detaylarını görün</h3>
                                        <p>Maaş bilgisi, aranan nitelikler ve başvuru butonu için üye olun.</p>
                                        <div className={styles.loginWallButtons}>
                                            <Link href={`/login?redirect=/jobs/${id}`} className={styles.loginButton}>
                                                Giriş Yap
                                            </Link>
                                            <Link href={`/register?redirect=/jobs/${id}`} className={styles.registerButton}>
                                                Ücretsiz Üye Ol
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>
                    </main>

                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarCard}>
                            <h4>Şirket Bilgileri</h4>
                            <div className={styles.companyInfo}>
                                <div className={styles.companyLogoSmall}>
                                    {job.company?.[0] || 'J'}
                                </div>
                                <span>{job.company}</span>
                            </div>
                            <div className={styles.quickInfo}>
                                <div className={styles.infoRow}>
                                    <span>Lokasyon</span>
                                    <span>{job.location}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span>Çalışma Şekli</span>
                                    <span>{job.job_type}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span>İlan Tarihi</span>
                                    <span>{postedDate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Share */}
                        <div className={styles.sidebarCard}>
                            <h4>Bu İlanı Paylaş</h4>
                            <div className={styles.shareButtons}>
                                <button className={styles.shareBtn}>LinkedIn</button>
                                <button className={styles.shareBtn}>Twitter</button>
                                <button className={styles.shareBtn}>Kopyala</button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
