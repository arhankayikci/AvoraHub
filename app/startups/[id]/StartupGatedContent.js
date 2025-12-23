"use client";

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import styles from './startup-detail.module.css';

export default function StartupGatedContent({ startup, startupId }) {
    const { user, loading } = useAuth();

    // Show gated content while loading to prevent flash
    if (loading) {
        return <GatedView startup={startup} startupId={startupId} />;
    }

    // Authenticated user sees full content
    if (user) {
        return (
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
        );
    }

    // Guest user sees gated view
    return <GatedView startup={startup} startupId={startupId} />;
}

function GatedView({ startup, startupId }) {
    const teaserDescription = startup.description?.substring(0, 300) || '';
    const hasMoreContent = startup.description?.length > 300;

    return (
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
                    <Link href={`/login?redirect=/startups/${startupId}`} className={styles.loginButton}>
                        Giriş Yap
                    </Link>
                    <Link href={`/register?redirect=/startups/${startupId}`} className={styles.registerButton}>
                        Ücretsiz Üye Ol
                    </Link>
                </div>
            </div>
        </div>
    );
}
