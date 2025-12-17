"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './funding.module.css';

// Demo funding data
const DEMO_FUNDING_ROUNDS = [
    {
        id: 1,
        company: 'PayFlex',
        logo: 'PF',
        amount: '₺12M',
        round: 'Series A',
        date: '2024-12-15',
        investors: ['TechVentures', 'Seed Capital'],
        category: 'Fintech',
        description: 'Esnek ödeme çözümleri sunan fintech startup\'ı Series A turunu kapattı.',
        leadInvestor: 'TechVentures',
        isHot: true
    },
    {
        id: 2,
        company: 'DataMind AI',
        logo: 'DM',
        amount: '₺5M',
        round: 'Seed',
        date: '2024-12-10',
        investors: ['AI Fund', 'Angel Network TR'],
        category: 'AI/ML',
        description: 'AI destekli analitik platformu ilk yatırımını aldı.',
        leadInvestor: 'AI Fund',
        isHot: true
    },
    {
        id: 3,
        company: 'GreenDelivery',
        logo: 'GD',
        amount: '₺25M',
        round: 'Series B',
        date: '2024-12-01',
        investors: ['Green Fund', 'Impact Ventures', 'Corporate VC'],
        category: 'Lojistik',
        description: 'Sürdürülebilir teslimat şirketi büyüme için yeni yatırım aldı.',
        leadInvestor: 'Green Fund',
        isHot: false
    },
    {
        id: 4,
        company: 'HealthTrack',
        logo: 'HT',
        amount: '₺8M',
        round: 'Series A',
        date: '2024-11-28',
        investors: ['Health Capital', 'Digital Health Fund'],
        category: 'HealthTech',
        description: 'Sağlık takip uygulaması Series A turunu tamamladı.',
        leadInvestor: 'Health Capital',
        isHot: false
    },
    {
        id: 5,
        company: 'CryptoTR',
        logo: 'CT',
        amount: '₺18M',
        round: 'Series A',
        date: '2024-11-20',
        investors: ['Blockchain Capital', 'Crypto Fund'],
        category: 'Blockchain',
        description: 'Türk kripto platformu büyük yatırım aldı.',
        leadInvestor: 'Blockchain Capital',
        isHot: false
    },
    {
        id: 6,
        company: 'EduTech Pro',
        logo: 'EP',
        amount: '₺3M',
        round: 'Seed',
        date: '2024-11-15',
        investors: ['EdTech Angels'],
        category: 'EdTech',
        description: 'Online eğitim platformu seed yatırımı aldı.',
        leadInvestor: 'EdTech Angels',
        isHot: false
    }
];

const STATS = {
    totalRounds: 47,
    totalAmount: '₺285M',
    avgDealSize: '₺6.1M',
    topCategory: 'Fintech'
};

const ROUND_TYPES = ['Tümü', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+'];
const CATEGORIES = ['Tümü', 'Fintech', 'AI/ML', 'HealthTech', 'Lojistik', 'EdTech', 'Blockchain'];

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
}

function FundingCard({ funding }) {
    return (
        <Link href={`/startups/${funding.id}`} className={`${styles.fundingCard} ${funding.isHot ? styles.hot : ''}`}>
            {funding.isHot && <span className={styles.hotBadge}>Sıcak</span>}

            <div className={styles.cardHeader}>
                <div className={styles.logo}>{funding.logo}</div>
                <div className={styles.headerInfo}>
                    <h3 className={styles.companyName}>{funding.company}</h3>
                    <span className={styles.category}>{funding.category}</span>
                </div>
                <div className={styles.amountBox}>
                    <span className={styles.amount}>{funding.amount}</span>
                    <span className={styles.round}>{funding.round}</span>
                </div>
            </div>

            <p className={styles.description}>{funding.description}</p>

            <div className={styles.investors}>
                <span className={styles.investorsLabel}>Yatırımcılar:</span>
                <div className={styles.investorsList}>
                    {funding.investors.map((inv, i) => (
                        <span key={i} className={`${styles.investor} ${inv === funding.leadInvestor ? styles.lead : ''}`}>
                            {inv === funding.leadInvestor && '👑 '}{inv}
                        </span>
                    ))}
                </div>
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.date}>📅 {formatDate(funding.date)}</span>
                <span className={styles.viewLink}>Detaylar →</span>
            </div>
        </Link>
    );
}

export default function FundingPage() {
    const [selectedRound, setSelectedRound] = useState('Tümü');
    const [selectedCategory, setSelectedCategory] = useState('Tümü');

    const filteredFunding = DEMO_FUNDING_ROUNDS.filter(f => {
        const matchesRound = selectedRound === 'Tümü' || f.round === selectedRound;
        const matchesCategory = selectedCategory === 'Tümü' || f.category === selectedCategory;
        return matchesRound && matchesCategory;
    });

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
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>{STATS.totalRounds}</span>
                        <span className={styles.statLabel}>2024 Tur Sayısı</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>{STATS.totalAmount}</span>
                        <span className={styles.statLabel}>Toplam Yatırım</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>{STATS.avgDealSize}</span>
                        <span className={styles.statLabel}>Ortalama Deal</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>{STATS.topCategory}</span>
                        <span className={styles.statLabel}>En Aktif Sektör</span>
                    </div>
                </div>

                {/* Filters */}
                <div className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <label>Tur Tipi</label>
                        <div className={styles.filterBtns}>
                            {ROUND_TYPES.map(round => (
                                <button
                                    key={round}
                                    className={`${styles.filterBtn} ${selectedRound === round ? styles.active : ''}`}
                                    onClick={() => setSelectedRound(round)}
                                >
                                    {round}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={styles.filterGroup}>
                        <label>Sektör</label>
                        <div className={styles.filterBtns}>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ''}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className={styles.resultsHeader}>
                    <span>{filteredFunding.length} yatırım turu</span>
                </div>

                {/* Funding List */}
                <div className={styles.fundingList}>
                    {filteredFunding.map(funding => (
                        <FundingCard key={funding.id} funding={funding} />
                    ))}
                </div>

                {/* CTA */}
                <div className={styles.cta}>
                    <div className={styles.ctaContent}>
                        <h3>Yatırım aldınız mı?</h3>
                        <p>Yatırım turunuzu ekosistemle paylaşın</p>
                    </div>
                    <Link href="/funding/submit" className={styles.ctaBtn}>
                        + Yatırım Duyur
                    </Link>
                </div>
            </div>
        </div>
    );
}
