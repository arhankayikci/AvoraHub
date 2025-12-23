import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './mentor-detail.module.css';
import MentorGatedContent, { MentorBookingCard } from './MentorGatedContent';

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

// Server Component with Soft Gating handled by Client Component
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
                            <MentorGatedContent mentor={mentor} mentorId={id} />
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.bookingCard}>
                            <h3>Görüşme Talebi</h3>
                            <MentorBookingCard mentor={mentor} />
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
