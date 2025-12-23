"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import styles from './employer.module.css';

export default function EmployerDashboardPage() {
    const router = useRouter();
    const { user, profile, loading } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [applicantsLoading, setApplicantsLoading] = useState(false);

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    // Fetch user's posted jobs
    useEffect(() => {
        async function fetchJobs() {
            if (!user?.id || !supabase) {
                setDataLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('jobs')
                    .select('id, title, company, location, job_type, created_at')
                    .eq('posted_by', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setJobs(data || []);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setDataLoading(false);
            }
        }

        fetchJobs();
    }, [user?.id]);

    // Fetch applicants for selected job
    const fetchApplicants = async (jobId) => {
        setApplicantsLoading(true);
        setSelectedJob(jobId);

        try {
            const { data, error } = await supabase
                .from('applications')
                .select(`
                    id,
                    status,
                    applied_at,
                    user_id,
                    profiles:user_id (
                        id,
                        full_name,
                        email,
                        avatar_url,
                        skills
                    )
                `)
                .eq('job_id', jobId)
                .order('applied_at', { ascending: false });

            if (error) throw error;
            setApplicants(data || []);
        } catch (error) {
            console.error('Error fetching applicants:', error);
            setApplicants([]);
        } finally {
            setApplicantsLoading(false);
        }
    };

    // Update applicant status
    const updateStatus = async (applicationId, newStatus) => {
        try {
            const { error } = await supabase
                .from('applications')
                .update({ status: newStatus })
                .eq('id', applicationId);

            if (error) throw error;

            // Optimistic UI update
            setApplicants(prev =>
                prev.map(app =>
                    app.id === applicationId
                        ? { ...app, status: newStatus }
                        : app
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Durum güncellenirken bir hata oluştu.');
        }
    };

    // Format date
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

    // Status badge
    const getStatusBadge = (status) => {
        const styles_map = {
            pending: { label: 'Beklemede', class: 'pending' },
            interview: { label: 'Mülakat', class: 'interview' },
            offer: { label: 'Teklif', class: 'offer' },
            rejected: { label: 'Reddedildi', class: 'rejected' }
        };
        return styles_map[status] || { label: status, class: 'pending' };
    };

    if (loading || dataLoading) {
        return (
            <div className={styles.page}>
                <div className="container">
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>Yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <h1>💼 İşveren Paneli</h1>
                    <p>Yayınladığınız ilanları ve başvuruları yönetin</p>
                </div>

                <div className={styles.layout}>
                    {/* Jobs List */}
                    <div className={styles.jobsList}>
                        <div className={styles.sectionHeader}>
                            <h2>İlanlarım</h2>
                            <Link href="/jobs/post" className={styles.newJobBtn}>
                                + Yeni İlan
                            </Link>
                        </div>

                        {jobs.length === 0 ? (
                            <div className={styles.emptyState}>
                                <span className={styles.emptyIcon}>📋</span>
                                <h3>Henüz ilan yok</h3>
                                <p>İlk iş ilanınızı oluşturun ve yetenekleri bulun.</p>
                                <Link href="/jobs/post" className={styles.createBtn}>
                                    İlan Oluştur
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.jobCards}>
                                {jobs.map(job => (
                                    <div
                                        key={job.id}
                                        className={`${styles.jobCard} ${selectedJob === job.id ? styles.selected : ''}`}
                                        onClick={() => fetchApplicants(job.id)}
                                    >
                                        <h3>{job.title}</h3>
                                        <p className={styles.company}>{job.company}</p>
                                        <div className={styles.jobMeta}>
                                            <span>📍 {job.location}</span>
                                            <span>{job.job_type}</span>
                                        </div>
                                        <span className={styles.jobDate}>{formatDate(job.created_at)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Applicants Panel */}
                    <div className={styles.applicantsPanel}>
                        {!selectedJob ? (
                            <div className={styles.selectPrompt}>
                                <span>👈</span>
                                <p>Başvuruları görmek için bir ilan seçin</p>
                            </div>
                        ) : applicantsLoading ? (
                            <div className={styles.loading}>
                                <div className={styles.spinner}></div>
                            </div>
                        ) : applicants.length === 0 ? (
                            <div className={styles.noApplicants}>
                                <span>📭</span>
                                <h3>Henüz başvuru yok</h3>
                                <p>Bu ilana henüz kimse başvurmadı.</p>
                            </div>
                        ) : (
                            <>
                                <div className={styles.applicantsHeader}>
                                    <h2>Başvuranlar ({applicants.length})</h2>
                                </div>
                                <div className={styles.applicantsList}>
                                    {applicants.map(app => {
                                        const profile = app.profiles;
                                        const statusInfo = getStatusBadge(app.status);

                                        return (
                                            <div key={app.id} className={styles.applicantCard}>
                                                <div className={styles.applicantInfo}>
                                                    <div className={styles.applicantAvatar}>
                                                        {profile?.avatar_url ? (
                                                            <img src={profile.avatar_url} alt={profile.full_name} />
                                                        ) : (
                                                            <span>{profile?.full_name?.charAt(0) || 'U'}</span>
                                                        )}
                                                    </div>
                                                    <div className={styles.applicantDetails}>
                                                        <h4>{profile?.full_name || 'İsimsiz Kullanıcı'}</h4>
                                                        <p className={styles.applicantEmail}>{profile?.email}</p>
                                                        {profile?.skills?.length > 0 && (
                                                            <div className={styles.skillsTags}>
                                                                {profile.skills.slice(0, 4).map((skill, i) => (
                                                                    <span key={i} className={styles.skillTag}>{skill}</span>
                                                                ))}
                                                                {profile.skills.length > 4 && (
                                                                    <span className={styles.moreSkills}>+{profile.skills.length - 4}</span>
                                                                )}
                                                            </div>
                                                        )}
                                                        <span className={styles.appliedDate}>Başvuru: {formatDate(app.applied_at)}</span>
                                                    </div>
                                                </div>

                                                <div className={styles.applicantActions}>
                                                    <span className={`${styles.statusBadge} ${styles[statusInfo.class]}`}>
                                                        {statusInfo.label}
                                                    </span>
                                                    <div className={styles.actionButtons}>
                                                        <button
                                                            className={`${styles.actionBtn} ${styles.interview}`}
                                                            onClick={() => updateStatus(app.id, 'interview')}
                                                            disabled={app.status === 'interview'}
                                                        >
                                                            📅 Mülakat
                                                        </button>
                                                        <button
                                                            className={`${styles.actionBtn} ${styles.offer}`}
                                                            onClick={() => updateStatus(app.id, 'offer')}
                                                            disabled={app.status === 'offer'}
                                                        >
                                                            ✅ Teklif
                                                        </button>
                                                        <button
                                                            className={`${styles.actionBtn} ${styles.reject}`}
                                                            onClick={() => updateStatus(app.id, 'rejected')}
                                                            disabled={app.status === 'rejected'}
                                                        >
                                                            ❌ Reddet
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
