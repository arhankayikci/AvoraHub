"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './funding.module.css';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { ImgWithFallback } from '@/components/ImageWithFallback';
import { LoadingState, EmptyState, ErrorState } from '@/components/StateComponents';

function FundingCard({ funding }) {
    const startup = funding.startups || {};

    return (
        <Link href={`/startups/${startup.id || funding.startup_id}`} className={styles.fundingCard}>
            <div className={styles.cardHeader}>
                <div className={styles.logo}>
                    <ImgWithFallback
                        src={startup.logo_url}
                        alt={startup.name}
                        fallbackText={startup.name}
                        className={styles.logoImg}
                        style={{ width: '60px', height: '60px' }}
                    />
                </div>
                <div className={styles.headerInfo}>
                    <h3 className={styles.companyName}>{startup.name || 'Unknown'}</h3>
                    {startup.category && <span className={styles.category}>{startup.category}</span>}
                </div>
                <div className={styles.amountBox}>
                    <span className={styles.amount}>{formatCurrency(funding.amount)}</span>
                    <span className={styles.round}>{funding.round_type}</span>
                </div>
            </div>

            {startup.tagline && <p className={styles.description}>{startup.tagline}</p>}

            {funding.investors && funding.investors.length > 0 && (
                <div className={styles.investors}>
                    <span className={styles.investorsLabel}>Yatırımcılar:</span>
                    <div className={styles.investorsList}>
                        {funding.investors.map((inv, i) => (
                            <span
                                key={i}
                                className={`${styles.investor} ${inv === funding.lead_investor ? styles.lead : ''}`}
                            >
                                {inv === funding.lead_investor && '👑 '}{inv}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.cardFooter}>
                {funding.announced_date && (
                    <span className={styles.date}>📅 {formatDate(funding.announced_date)}</span>
                )}
                <span className={styles.viewLink}>Detaylar →</span>
            </div>
        </Link>
    );
}

export default function FundingPage() {
    const [filters, setFilters] = useState({
        round: 'all',
        category: 'all'
    });
    const [funding, setFunding] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFunding = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/funding');
            const data = await res.json();
            setFunding(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching funding:', err);
            setError('Yatırım bilgileri yüklenirken hata oluştu');
            setFunding([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFunding();
    }, []);

    const filteredFunding = funding.filter(f => {
        if (filters.round !== 'all' && f.round_type !== filters.round) return false;
        if (filters.category !== 'all' && f.startups?.category !== filters.category) return false;
        return true;
    });

    // Calculate stats from real data
    const stats = {
        totalRounds: funding.length,
        totalAmount: funding.reduce((sum, f) => sum + (f.amount || 0), 0),
        avgDealSize: funding.length > 0 ? Math.floor(funding.reduce((sum, f) => sum + (f.amount || 0), 0) / funding.length) : 0,
        topCategory: 'Fintech' // Could calculate from data
    };

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Hero */}
                <div className={styles.hero}>
                    <h1 className={styles.title}>💰 Yatırım Takibi</h1>
                    <p className={styles.subtitle}>
                        Türkiye startup ekosistemindeki son yatırım turlarını takip edin
                    </p>
                </div>

                {/* Stats */}
                {!loading && funding.length > 0 && (
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>{stats.totalRounds}</span>
                            <span className={styles.statLabel}>Toplam Tur</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>{formatCurrency(stats.totalAmount)}</span>
                            <span className={styles.statLabel}>Toplam Yatırım</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>{formatCurrency(stats.avgDealSize)}</span>
                            <span className={styles.statLabel}>Ortalama Deal</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>{stats.topCategory}</span>
                            <span className={styles.statLabel}>En Aktif Sektör</span>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className={styles.filters}>
                    <select
                        className={styles.select}
                        value={filters.round}
                        onChange={(e) => setFilters({ ...filters, round: e.target.value })}
                    >
                        <option value="all">Tüm Turlar</option>
                        <option value="Pre-Seed">Pre-Seed</option>
                        <option value="Seed">Seed</option>
                        <option value="Series A">Series A</option>
                        <option value="Series B">Series B</option>
                        <option value="Series C+">Series C+</option>
                    </select>
                </div>

                {/* Content */}
                {loading ? (
                    <LoadingState text="Yatırım turları yükleniyor..." />
                ) : error ? (
                    <ErrorState error={error} onRetry={fetchFunding} />
                ) : filteredFunding.length > 0 ? (
                    <>
                        <div className={styles.resultsHeader}>
                            <span>{filteredFunding.length} yatırım turu</span>
                        </div>
                        <div className={styles.fundingList}>
                            {filteredFunding.map(f => (
                                <FundingCard key={f.id} funding={f} />
                            ))}
                        </div>
                    </>
                ) : (
                    <EmptyState
                        icon="💰"
                        title="Henüz Yatırım Turu Yok"
                        description="Şu an ekosistemde duyurulan yatırım turu bulunmamaktadır."
                        actionText="Yatırımını Duyur"
                        actionHref="/funding/submit"
                    />
                )}

                {/* CTA */}
                {!loading && funding.length > 0 && (
                    <div className={styles.cta}>
                        <div className={styles.ctaContent}>
                            <h3>Yatırım aldınız mı?</h3>
                            <p>Yatırım turunuzu ekosistemle paylaşın</p>
                        </div>
                        <Link href="/funding/submit" className={styles.ctaBtn}>
                            + Yatırım Duyur
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
