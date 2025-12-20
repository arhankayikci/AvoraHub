"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './jobs.module.css';
import { formatCurrency, formatRelativeTime } from '@/utils/formatters';
import { useAuth } from '@/contexts/AuthContext';
import FreemiumGate from '@/components/FreemiumGate';
import { filterItemsForGuests } from '@/utils/visibilityHelpers';

function JobCard({ job }) {
    return (
        <Link href={`/jobs/${job.id}`} className={styles.jobCard}>
            <div className={styles.cardHeader}>
                <div className={styles.companyLogo}>
                    {job.company_logo ? (
                        <img src={job.company_logo} alt={job.company} />
                    ) : (
                        job.company.charAt(0)
                    )}
                </div>
                <div className={styles.jobInfo}>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <div className={styles.company}>{job.company}</div>
                </div>
            </div>

            <p className={styles.description}>
                {job.description?.substring(0, 120) || 'Açıklama yok'}...
            </p>

            {job.tags && job.tags.length > 0 && (
                <div className={styles.tags}>
                    {job.tags.slice(0, 4).map((tag, i) => (
                        <span key={i} className={styles.tag}>{tag}</span>
                    ))}
                </div>
            )}

            <div className={styles.cardFooter}>
                <div className={styles.meta}>
                    {job.location && <span className={styles.location}>{job.location}</span>}
                    {job.type && <span className={styles.type}>{job.type}</span>}
                </div>
                {job.salary_min && job.salary_max && (
                    <div className={styles.salary}>
                        {formatCurrency(job.salary_min)} - {formatCurrency(job.salary_max)}
                    </div>
                )}
            </div>

            {job.created_at && (
                <span className={styles.posted}>{formatRelativeTime(job.created_at)}</span>
            )}
        </Link>
    );
}

function FreemiumGateWrapper({ jobs }) {
    const { user } = useAuth();
    const { displayedItems } = filterItemsForGuests(jobs, !!user, 3);

    return (
        <FreemiumGate
            isAuthenticated={!!user}
            items={jobs}
            listType="iş ilanı"
        >
            <div className={styles.grid}>
                {displayedItems.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </FreemiumGate>
    );
}

export default function JobsPage() {
    const [filters, setFilters] = useState({
        type: 'all',
        location: 'all',
        search: ''
    });
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (filters.type !== 'all') params.append('type', filters.type);
                if (filters.location !== 'all') params.append('location', filters.location);
                if (filters.search) params.append('search', filters.search);

                const res = await fetch(`/api/jobs?${params.toString()}`);
                const data = await res.json();
                setJobs(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchJobs, 300);
        return () => clearTimeout(timeoutId);
    }, [filters]);

    const filteredJobs = jobs.filter(job => {
        if (filters.type !== 'all' && job.type !== filters.type) return false;
        if (filters.location !== 'all' && !job.location?.includes(filters.location)) return false;
        if (filters.search) {
            const search = filters.search.toLowerCase();
            return (
                job.title?.toLowerCase().includes(search) ||
                job.company?.toLowerCase().includes(search) ||
                job.description?.toLowerCase().includes(search)
            );
        }
        return true;
    });

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.title}>Kariyer Fırsatları</h1>
                    <p className={styles.subtitle}>Türkiye'nin en heyecan verici startup'larında çalış</p>
                </div>
            </section>

            {/* Filters */}
            <section className={styles.filtersSection}>
                <div className="container">
                    <div className={styles.filters}>
                        <input
                            type="text"
                            placeholder="İş ara..."
                            className={styles.searchInput}
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                        <select
                            className={styles.select}
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        >
                            <option value="all">Tüm Pozisyonlar</option>
                            <option value="Tam Zamanlı">Tam Zamanlı</option>
                            <option value="Yarı Zamanlı">Yarı Zamanlı</option>
                            <option value="Staj">Staj</option>
                            <option value="Uzaktan">Uzaktan</option>
                        </select>
                        <select
                            className={styles.select}
                            value={filters.location}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        >
                            <option value="all">Tüm Lokasyonlar</option>
                            <option value="İstanbul">İstanbul</option>
                            <option value="Ankara">Ankara</option>
                            <option value="İzmir">İzmir</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Jobs Grid */}
            <section className={styles.jobsSection}>
                <div className="container">
                    {loading ? (
                        <div className={styles.loading}>Yükleniyor...</div>
                    ) : filteredJobs.length > 0 ? (
                        <FreemiumGateWrapper jobs={filteredJobs} />
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>💼</div>
                            <h3>Henüz İş İlanı Yok</h3>
                            <p>Şu an aktif iş ilanı bulunmamaktadır.</p>
                            <Link href="/jobs/new" className="btn btn-primary">
                                İlk İlanı Siz Verin
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
