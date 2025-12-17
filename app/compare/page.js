"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './compare.module.css';

// Demo startup'lar
const DEMO_STARTUPS = [
    {
        id: 1,
        name: 'PayFlex',
        tagline: 'Esnek ödeme çözümleri',
        category: 'Fintech',
        logo: 'PF',
        founded: '2022',
        team: 15,
        funding: '₺12M',
        stage: 'Series A',
        upvotes: 342,
        features: ['Mobil Uygulama', 'API Entegrasyonu', 'B2B & B2C', '7/24 Destek'],
        pricing: 'Freemium',
        metrics: { users: '50K+', growth: '+45%', retention: '85%' }
    },
    {
        id: 2,
        name: 'DataMind AI',
        tagline: 'AI-powered analytics',
        category: 'AI/ML',
        logo: 'DM',
        founded: '2023',
        team: 8,
        funding: '₺5M',
        stage: 'Seed',
        upvotes: 287,
        features: ['Dashboard', 'Real-time Analytics', 'API', 'Custom Reports'],
        pricing: 'Ücretli',
        metrics: { users: '10K+', growth: '+120%', retention: '78%' }
    },
    {
        id: 3,
        name: 'GreenDelivery',
        tagline: 'Sürdürülebilir teslimat',
        category: 'Lojistik',
        logo: 'GD',
        founded: '2021',
        team: 45,
        funding: '₺25M',
        stage: 'Series B',
        upvotes: 198,
        features: ['Elektrikli Araçlar', 'Carbon Tracking', 'B2B', 'API'],
        pricing: 'B2B Fiyatlandırma',
        metrics: { users: '200+ İşletme', growth: '+80%', retention: '92%' }
    },
    {
        id: 4,
        name: 'HealthTrack',
        tagline: 'Kişisel sağlık asistanı',
        category: 'HealthTech',
        logo: 'HT',
        founded: '2022',
        team: 12,
        funding: '₺8M',
        stage: 'Series A',
        upvotes: 256,
        features: ['iOS & Android', 'Wearable Entegrasyonu', 'AI Önerileri', 'Doktor Bağlantısı'],
        pricing: 'Freemium',
        metrics: { users: '100K+', growth: '+65%', retention: '72%' }
    }
];

function StartupSelector({ startups, selected, onSelect, label }) {
    return (
        <div className={styles.selector}>
            <label>{label}</label>
            <select value={selected} onChange={(e) => onSelect(e.target.value)} className={styles.select}>
                <option value="">Startup seçin</option>
                {startups.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                ))}
            </select>
        </div>
    );
}

function ComparisonTable({ startup1, startup2 }) {
    if (!startup1 || !startup2) {
        return (
            <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>⚖️</span>
                <h3>Karşılaştırmak için 2 startup seçin</h3>
                <p>Yukarıdaki seçicileri kullanarak karşılaştırmak istediğiniz startup'ları belirleyin</p>
            </div>
        );
    }

    const rows = [
        { label: 'Kategori', key: 'category' },
        { label: 'Kuruluş', key: 'founded' },
        { label: 'Ekip Boyutu', key: 'team', format: (v) => `${v} kişi` },
        { label: 'Toplam Yatırım', key: 'funding' },
        { label: 'Aşama', key: 'stage' },
        { label: 'Fiyatlandırma', key: 'pricing' },
        { label: 'Toplam Oy', key: 'upvotes' },
    ];

    const metricRows = [
        { label: 'Kullanıcı Sayısı', key: 'users' },
        { label: 'Büyüme', key: 'growth' },
        { label: 'Retention', key: 'retention' },
    ];

    return (
        <div className={styles.comparisonContainer}>
            {/* Header */}
            <div className={styles.comparisonHeader}>
                <div className={styles.headerEmpty}></div>
                <div className={styles.startupHeader}>
                    <div className={styles.logo}>{startup1.logo}</div>
                    <h3>{startup1.name}</h3>
                    <p>{startup1.tagline}</p>
                </div>
                <div className={styles.vs}>VS</div>
                <div className={styles.startupHeader}>
                    <div className={styles.logo}>{startup2.logo}</div>
                    <h3>{startup2.name}</h3>
                    <p>{startup2.tagline}</p>
                </div>
            </div>

            {/* Basic Info */}
            <div className={styles.section}>
                <h4 className={styles.sectionTitle}>📋 Genel Bilgiler</h4>
                {rows.map(row => (
                    <div key={row.key} className={styles.row}>
                        <div className={styles.rowLabel}>{row.label}</div>
                        <div className={styles.rowValue}>
                            {row.format ? row.format(startup1[row.key]) : startup1[row.key]}
                        </div>
                        <div className={styles.rowValue}>
                            {row.format ? row.format(startup2[row.key]) : startup2[row.key]}
                        </div>
                    </div>
                ))}
            </div>

            {/* Metrics */}
            <div className={styles.section}>
                <h4 className={styles.sectionTitle}>📊 Metrikler</h4>
                {metricRows.map(row => (
                    <div key={row.key} className={styles.row}>
                        <div className={styles.rowLabel}>{row.label}</div>
                        <div className={styles.rowValue}>{startup1.metrics[row.key]}</div>
                        <div className={styles.rowValue}>{startup2.metrics[row.key]}</div>
                    </div>
                ))}
            </div>

            {/* Features */}
            <div className={styles.section}>
                <h4 className={styles.sectionTitle}>✨ Özellikler</h4>
                <div className={styles.featuresRow}>
                    <div className={styles.rowLabel}>Özellikler</div>
                    <div className={styles.featuresList}>
                        {startup1.features.map((f, i) => (
                            <span key={i} className={styles.featureTag}>✓ {f}</span>
                        ))}
                    </div>
                    <div className={styles.featuresList}>
                        {startup2.features.map((f, i) => (
                            <span key={i} className={styles.featureTag}>✓ {f}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
                <Link href={`/startups/${startup1.id}`} className={styles.viewBtn}>
                    {startup1.name} Detayları →
                </Link>
                <Link href={`/startups/${startup2.id}`} className={styles.viewBtn}>
                    {startup2.name} Detayları →
                </Link>
            </div>
        </div>
    );
}

export default function ComparePage() {
    const [startup1Id, setStartup1Id] = useState('');
    const [startup2Id, setStartup2Id] = useState('');

    const startup1 = DEMO_STARTUPS.find(s => s.id === parseInt(startup1Id));
    const startup2 = DEMO_STARTUPS.find(s => s.id === parseInt(startup2Id));

    // startup2 için startup1'i hariç tut
    const startup2Options = DEMO_STARTUPS.filter(s => s.id !== parseInt(startup1Id));

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Header */}
                <div className={styles.header}>
                    <h1 className={styles.title}>⚖️ Startup Karşılaştırma</h1>
                    <p className={styles.subtitle}>
                        İki startup'ı yan yana karşılaştırın ve hangisinin size uygun olduğunu görün
                    </p>
                </div>

                {/* Selectors */}
                <div className={styles.selectors}>
                    <StartupSelector
                        startups={DEMO_STARTUPS}
                        selected={startup1Id}
                        onSelect={setStartup1Id}
                        label="1. Startup"
                    />
                    <div className={styles.vsIcon}>⚡</div>
                    <StartupSelector
                        startups={startup2Options}
                        selected={startup2Id}
                        onSelect={setStartup2Id}
                        label="2. Startup"
                    />
                </div>

                {/* Comparison */}
                <ComparisonTable startup1={startup1} startup2={startup2} />
            </div>
        </div>
    );
}
