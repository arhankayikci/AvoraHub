"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import styles from './problem-detail.module.css';
import ContactModal from '@/components/ContactModal';

// Client component for gated content - uses AuthContext for real-time auth check
export default function ProblemGatedContent({ problem, problemId }) {
    const { user, loading } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // While loading, show the gated content initially (prevents flash)
    if (loading) {
        return <GatedView problem={problem} problemId={problemId} />;
    }

    // User is authenticated - show full content
    if (user) {
        return (
            <>
                <div className={styles.description}>
                    <p>{problem.description}</p>
                </div>

                {/* Stats Box */}
                <div className={styles.statsBox}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>👍 Destekleyenler</span>
                        <span className={styles.statValue}>{problem.votes || 0} oy</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>💬 Yorumlar</span>
                        <span className={styles.statValue}>{problem.comments || 0} yorum</span>
                    </div>
                </div>

                {/* CTA */}
                <div className={styles.ctaSection}>
                    <button
                        className={styles.proposalButton}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Çözüm Teklifinde Bulun →
                    </button>
                </div>

                {/* Contact Modal */}
                <ContactModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Çözüm Teklifinizi Gönderin"
                    problemTitle={problem.title}
                    problemId={problemId}
                />
            </>
        );
    }

    // Not authenticated - show gated view
    return <GatedView problem={problem} problemId={problemId} />;
}

// Gated view component
function GatedView({ problem, problemId }) {
    const teaserDescription = problem.description?.substring(0, 300) || '';
    const hasMoreContent = problem.description?.length > 300;

    return (
        <div className={styles.gatedContent}>
            <div className={styles.teaserDescription}>
                <p>{teaserDescription}{hasMoreContent && '...'}</p>
                <div className={styles.fadeOverlay}></div>
            </div>

            {/* Login Wall CTA */}
            <div className={styles.loginWall}>
                <div className={styles.loginWallIcon}>🔒</div>
                <h3>Problemin tüm detaylarını görün</h3>
                <p>Bütçe bilgisi, gereksinimler ve çözüm teklifi için üye olun.</p>
                <div className={styles.loginWallButtons}>
                    <Link href={`/login?redirect=/problems/${problemId}`} className={styles.loginButton}>
                        Giriş Yap
                    </Link>
                    <Link href={`/register?redirect=/problems/${problemId}`} className={styles.registerButton}>
                        Ücretsiz Üye Ol
                    </Link>
                </div>
            </div>
        </div>
    );
}
