"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './MakerAMA.module.css';

// Demo AMA sessions
const DEMO_AMAS = [
    {
        id: 1,
        maker: {
            name: 'Ahmet Yıldız',
            avatar: 'AY',
            role: 'Kurucu & CEO',
            startup: 'PayFlex',
            verified: true
        },
        title: 'Fintech\'te 0\'dan 1M Kullanıcıya Nasıl Ulaştık?',
        description: 'PayFlex\'in kuruluşundan bugüne kadar olan yolculuğu, karşılaştığımız zorluklar ve öğrendiklerimiz.',
        status: 'live',
        startTime: '14:00',
        duration: '1 saat',
        participants: 234,
        questions: 45
    },
    {
        id: 2,
        maker: {
            name: 'Zeynep Kara',
            avatar: 'ZK',
            role: 'CTO',
            startup: 'DataMind AI',
            verified: true
        },
        title: 'Yapay Zeka Startup\'ı Kurmak: Teknik ve İş Perspektifi',
        description: 'AI ürünü geliştirirken dikkat edilmesi gerekenler, ekip yapısı ve pazar stratejisi.',
        status: 'upcoming',
        startTime: 'Yarın 15:00',
        duration: '45 dk',
        participants: 0,
        questions: 12
    },
    {
        id: 3,
        maker: {
            name: 'Can Öztürk',
            avatar: 'CÖ',
            role: 'Kurucu',
            startup: 'GreenDelivery',
            verified: false
        },
        title: 'Sürdürülebilir Lojistik: Elektrikli Filo ile Teslimat',
        description: 'Çevre dostu teslimat modelimiz ve sürdürülebilirlik odaklı iş yapma deneyimimiz.',
        status: 'ended',
        startTime: '12 Aralık',
        duration: '1.5 saat',
        participants: 189,
        questions: 67
    }
];

function AMACard({ ama }) {
    const statusConfig = {
        live: { label: '🔴 CANLI', class: styles.live },
        upcoming: { label: '📅 Yakında', class: styles.upcoming },
        ended: { label: '✓ Tamamlandı', class: styles.ended }
    };

    const status = statusConfig[ama.status];

    return (
        <Link href={`/ama/${ama.id}`} className={styles.card}>
            <div className={styles.cardHeader}>
                <span className={`${styles.status} ${status.class}`}>
                    {status.label}
                </span>
                <span className={styles.time}>{ama.startTime} • {ama.duration}</span>
            </div>

            <div className={styles.maker}>
                <div className={styles.avatar}>{ama.maker.avatar}</div>
                <div className={styles.makerInfo}>
                    <span className={styles.makerName}>
                        {ama.maker.name}
                        {ama.maker.verified && <span className={styles.verified}>✓</span>}
                    </span>
                    <span className={styles.makerRole}>
                        {ama.maker.role} @ {ama.maker.startup}
                    </span>
                </div>
            </div>

            <h3 className={styles.title}>{ama.title}</h3>
            <p className={styles.description}>{ama.description}</p>

            <div className={styles.stats}>
                <span>{ama.participants} katılımcı</span>
                <span>{ama.questions} soru</span>
            </div>

            {ama.status === 'live' && (
                <button className={styles.joinBtn}>Katıl</button>
            )}
            {ama.status === 'upcoming' && (
                <button className={styles.notifyBtn}>Hatırlat</button>
            )}
            {ama.status === 'ended' && (
                <button className={styles.watchBtn}>İzle</button>
            )}
        </Link>
    );
}

export default function MakerAMA({ amas = DEMO_AMAS }) {
    const [filter, setFilter] = useState('all');

    const filteredAMAs = filter === 'all'
        ? amas
        : amas.filter(a => a.status === filter);

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div>
                    <h2 className={styles.sectionTitle}>🎙️ Maker AMA</h2>
                    <p className={styles.sectionSubtitle}>Kurucularla canlı soru-cevap oturumları</p>
                </div>
                <div className={styles.filters}>
                    <button
                        className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        Tümü
                    </button>
                    <button
                        className={`${styles.filterBtn} ${filter === 'live' ? styles.active : ''}`}
                        onClick={() => setFilter('live')}
                    >
                        🔴 Canlı
                    </button>
                    <button
                        className={`${styles.filterBtn} ${filter === 'upcoming' ? styles.active : ''}`}
                        onClick={() => setFilter('upcoming')}
                    >
                        Yakında
                    </button>
                </div>
            </div>

            <div className={styles.grid}>
                {filteredAMAs.map(ama => (
                    <AMACard key={ama.id} ama={ama} />
                ))}
            </div>
        </section>
    );
}
