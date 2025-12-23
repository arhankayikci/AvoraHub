import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './problem-detail.module.css';
import ProblemGatedContent from './ProblemGatedContent';

// SEO: Generate dynamic metadata
export async function generateMetadata({ params }) {
    const { id } = await params;

    if (!supabase) {
        return { title: 'Problem | AvoraHub' };
    }

    const { data: problem } = await supabase
        .from('problems')
        .select('title, category')
        .eq('id', id)
        .single();

    if (!problem) {
        return { title: 'Problem Bulunamadı | AvoraHub' };
    }

    return {
        title: `${problem.title} | AvoraHub`,
        description: `${problem.title} - ${problem.category} kategorisinde çözüm bekleyen problem. AvoraHub'da girişimciler için fırsatlar.`,
        openGraph: {
            title: problem.title,
            description: `${problem.category} kategorisinde problem`,
            type: 'website',
        },
    };
}

// Server Component - SEO optimized, soft gating handled by client component
export default async function ProblemDetailPage({ params }) {
    const { id } = await params;

    if (!supabase) {
        notFound();
    }

    const { data: problem, error } = await supabase
        .from('problems')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !problem) {
        notFound();
    }

    // Format date
    const postedDate = problem.created_at
        ? new Date(problem.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'Bilinmiyor';

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Breadcrumb */}
                <div className={styles.breadcrumb}>
                    <Link href="/">Ana Sayfa</Link>
                    <span>/</span>
                    <Link href="/problems">Problemler</Link>
                    <span>/</span>
                    <span>{problem.title}</span>
                </div>

                <div className={styles.layout}>
                    {/* Main Content */}
                    <main className={styles.main}>
                        {/* Header - Always Public */}
                        <header className={styles.header}>
                            <div className={styles.categoryIcon}>
                                <span>💡</span>
                            </div>
                            <div className={styles.headerInfo}>
                                <span className={styles.categoryBadge}>{problem.category}</span>
                                <h1 className={styles.title}>{problem.title}</h1>
                                <div className={styles.meta}>
                                    <span className={styles.author}>
                                        👤 {problem.author || 'Anonim'}
                                    </span>
                                    <span className={styles.location}>📍 {problem.country_name}</span>
                                    <span className={styles.date}>📅 {postedDate}</span>
                                </div>
                            </div>
                        </header>

                        {/* Description Section - Client-side Soft Gating */}
                        <section className={styles.descriptionSection}>
                            <h2>Problem Açıklaması</h2>
                            <ProblemGatedContent problem={problem} problemId={id} />
                        </section>
                    </main>

                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarCard}>
                            <h4>Problem Sahibi</h4>
                            <div className={styles.ownerInfo}>
                                <div className={styles.ownerAvatar}>{problem.author?.[0] || 'A'}</div>
                                <span>{problem.author || 'Anonim'}</span>
                            </div>
                            <div className={styles.quickInfo}>
                                <div className={styles.infoRow}>
                                    <span>Kategori</span>
                                    <span>{problem.category}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span>Lokasyon</span>
                                    <span>{problem.country_name}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span>Yayın Tarihi</span>
                                    <span>{postedDate}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span>Destek</span>
                                    <span>{problem.votes || 0} oy</span>
                                </div>
                            </div>
                        </div>

                        {/* Share */}
                        <div className={styles.sidebarCard}>
                            <h4>Bu Problemi Paylaş</h4>
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
