"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import styles from './job-detail.module.css';

export default function JobGatedContent({ job, jobId }) {
    const { user, loading } = useAuth();
    const [hasApplied, setHasApplied] = useState(false);
    const [applying, setApplying] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    // Check if user has already applied
    useEffect(() => {
        async function checkApplicationStatus() {
            if (!user?.id || !supabase) {
                setCheckingStatus(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('applications')
                    .select('id')
                    .eq('user_id', user.id)
                    .eq('job_id', jobId)
                    .single();

                if (data && !error) {
                    setHasApplied(true);
                }
            } catch (err) {
                // No application found - that's okay
            } finally {
                setCheckingStatus(false);
            }
        }

        if (user) {
            checkApplicationStatus();
        } else {
            setCheckingStatus(false);
        }
    }, [user, jobId]);

    // Handle apply action
    const handleApply = async () => {
        if (!user?.id || hasApplied || applying) return;

        setApplying(true);

        try {
            // Insert application record
            const { error } = await supabase
                .from('applications')
                .insert({
                    user_id: user.id,
                    job_id: jobId,
                    status: 'pending',
                    applied_at: new Date().toISOString()
                });

            if (error) {
                console.error('Application error:', error);
                alert('Başvuru sırasında bir hata oluştu.');
                setApplying(false);
                return;
            }

            // Optimistic UI update
            setHasApplied(true);

            // Open external application URL if available
            if (job.apply_url) {
                window.open(job.apply_url, '_blank', 'noopener,noreferrer');
            }
        } catch (err) {
            console.error('Apply error:', err);
            setApplying(false);
        }
    };

    // Show gated content while loading to prevent flash
    if (loading) {
        return <GatedView job={job} jobId={jobId} />;
    }

    // Authenticated user sees full content
    if (user) {
        return (
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

                {/* Smart Apply Button */}
                <div className={styles.applySection}>
                    {checkingStatus ? (
                        <button className={styles.applyButton} disabled>
                            Kontrol ediliyor...
                        </button>
                    ) : hasApplied ? (
                        <button className={`${styles.applyButton} ${styles.applied}`} disabled>
                            ✓ Başvuruldu
                        </button>
                    ) : (
                        <button
                            className={styles.applyButton}
                            onClick={handleApply}
                            disabled={applying}
                        >
                            {applying ? 'Başvuruluyor...' : 'Hemen Başvur →'}
                        </button>
                    )}
                </div>
            </>
        );
    }

    // Guest user sees gated view
    return <GatedView job={job} jobId={jobId} />;
}

function GatedView({ job, jobId }) {
    const teaserDescription = job.description?.substring(0, 300) || '';
    const hasMoreContent = job.description?.length > 300;

    return (
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
                    <Link href={`/login?redirect=/jobs/${jobId}`} className={styles.loginButton}>
                        Giriş Yap
                    </Link>
                    <Link href={`/register?redirect=/jobs/${jobId}`} className={styles.registerButton}>
                        Ücretsiz Üye Ol
                    </Link>
                </div>
            </div>
        </div>
    );
}
