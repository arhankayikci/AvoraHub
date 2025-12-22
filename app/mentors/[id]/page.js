import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cookies } from 'next/headers';
import styles from './mentor-detail.module.css';

// SEO: Generate dynamic metadata
export async function generateMetadata({ params }) {
    const { id } = await params;

    if (!supabase) {
        return { title: 'Mentör | AvoraHub' };
    }

    const { data: mentor } = await supabase
        .from('investors')
        .select('name, role')
        .eq('id', id)
        .single();

    if (!mentor) {
        return { title: 'Mentör Bulunamadı | AvoraHub' };
    }

    return {
        title: `${mentor.name} | ${mentor.role} | AvoraHub`,
        description: `${mentor.name} - ${mentor.role}. AvoraHub topluluğunda girişimcilere mentorluk ve yatırım desteği sunuyor.`,
        openGraph: {
            title: mentor.name,
            description: mentor.role,
            type: 'website',
        },
    };
}

// Server Component with Soft Gating
export default async function MentorDetailPage({ params }) {
    const { id } = await params;

    if (!supabase) {
        notFound();
    }

    // Fetch mentor (investor) data
    const { data: mentor, error } = await supabase
        .from('investors')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !mentor) {
        notFound();
    }

    // Check user session for gating
    let isAuthenticated = false;
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('sb-access-token')?.value ||
            cookieStore.get('supabase-auth-token')?.value;
        isAuthenticated = !!token;
    } catch (e) {
        isAuthenticated = false;
    }

    // Teaser bio
    const teaserBio = mentor.bio?.substring(0, 300) || '';
    const hasMoreBio = mentor.bio?.length > 300;

    return (
        <div className={styles.page}>
            <div className="container">
                <Link href="/mentors" className={styles.backLink}>
                    ← Mentörlere Dön
                </Link>

                <div className={styles.layout}>
                    {/* Main Content */}
                    <main className={styles.main}>
                        {/* Header - Public */}
                        <div className={styles.header}>
                            <div className={styles.avatarWrapper}>
                                {mentor.avatar && mentor.avatar.length > 10 ? (
                                    <img src={mentor.avatar} alt={mentor.name} className={styles.avatarImg} />
                                ) : (
                                    <div className={styles.avatarPlaceholder}>{mentor.name?.[0] || 'M'}</div>
                                )}
                            </div>
                            <div className={styles.info}>
                                <div className={styles.nameRow}>
                                    <h1 className={styles.name}>{mentor.name}</h1>
                                    {mentor.verified && <span className={styles.verifiedBadge}>✓ Doğrulanmış</span>}
                                </div>
                                <p className={styles.role}>{mentor.role}</p>
                                <p className={styles.location}>📍 {mentor.location}</p>
                                <div className={styles.stats}>
                                    <div className={styles.stat}>
                                        <span className={styles.statLabel}>Yatırım</span>
                                        <span className={styles.statValue}>{mentor.total_investments || 0}</span>
                                    </div>
                                    <div className={styles.stat}>
                                        <span className={styles.statLabel}>Exit</span>
                                        <span className={styles.statValue}>{mentor.exits || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Expertise - Public */}
                        <div className={styles.section}>
                            <h2>Uzmanlık Alanları</h2>
                            <div className={styles.tags}>
                                {mentor.expertise?.map((exp, i) => (
                                    <span key={i} className={styles.tag}>{exp}</span>
                                ))}
                            </div>
                        </div>

                        {/* Bio with Soft Gating */}
                        <div className={styles.section}>
                            <h2>Hakkında</h2>
                            {isAuthenticated ? (
                                <p className={styles.fullBio}>{mentor.bio}</p>
                            ) : (
                                <div className={styles.gatedBio}>
                                    <p>{teaserBio}{hasMoreBio && '...'}</p>
                                    <div className={styles.fadeOverlay}></div>

                                    <div className={styles.loginWall}>
                                        <div className={styles.loginWallIcon}>🔒</div>
                                        <h3>Tam biyografiyi ve detayları görün</h3>
                                        <p>Mentörün tüm deneyimini ve iletişim bilgilerini görmek için üye olun.</p>
                                        <div className={styles.loginWallButtons}>
                                            <Link href={`/login?redirect=/mentors/${id}`} className={styles.loginButton}>
                                                Giriş Yap
                                            </Link>
                                            <Link href={`/register?redirect=/mentors/${id}`} className={styles.registerButton}>
                                                Üye Ol
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.bookingCard}>
                            <h3>Görüşme Talebi</h3>
                            {isAuthenticated ? (
                                <>
                                    <p className={styles.priceInfo}>Seans başı: {mentor.ticket_size || 'İletişime geçin'}</p>
                                    <button className={styles.bookBtn}>Takvimi Görüntüle →</button>
                                </>
                            ) : (
                                <div className={styles.bookingLocked}>
                                    <p>Randevu bilgilerini görmek için giriş yapmalısınız.</p>
                                    <Link href="/login" className={styles.bookBtnLocked}>Giriş Yap</Link>
                                </div>
                            )}
                        </div>

                        <div className={styles.detailsCard}>
                            <h4>Yatırım Odak Alanları</h4>
                            <div className={styles.sidebarDetails}>
                                <div className={styles.detailItem}>
                                    <span>Aşama</span>
                                    <span>{mentor.stage?.join(', ') || '-'}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span>Coğrafya</span>
                                    <span>{mentor.geography?.join(', ') || '-'}</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
