"use client";

import { use } from 'react';
import Link from 'next/link';
import styles from './collection-detail.module.css';

// Demo koleksiyonlar
const COLLECTIONS = {
    1: {
        id: 1,
        title: "2024'ün En İyi Fintech'leri",
        description: "Türkiye'nin öne çıkan fintech startup'ları. Ödeme sistemlerinden kripto çözümlerine, finansal teknoloji alanında inovasyon yaratan girişimler.",
        icon: "💳",
        curator: "AvoraHub Editör",
        curatorAvatar: "AE",
        color: "#0B4F3B",
        items: [
            { id: 1, name: 'PayFlex', tagline: 'KOBİ\'ler için ödeme çözümleri', votes: 342, logo: 'PF' },
            { id: 2, name: 'CryptoTR', tagline: 'Kripto para cüzdanı', votes: 287, logo: 'CT' },
            { id: 3, name: 'FinBot', tagline: 'AI destekli finansal danışman', votes: 234, logo: 'FB' },
            { id: 4, name: 'QuickPay', tagline: 'Hızlı para transferi', votes: 198, logo: 'QP' },
            { id: 5, name: 'InvestMate', tagline: 'Yatırım portföy yönetimi', votes: 176, logo: 'IM' },
        ]
    },
    2: {
        id: 2,
        title: "Yapay Zeka Çözümleri",
        description: "AI tabanlı inovatif girişimler. Doğal dil işlemeden görüntü tanımaya, makine öğrenmesi alanındaki en son teknolojiler.",
        icon: "🤖",
        curator: "Tech Team",
        curatorAvatar: "TT",
        color: "#8B5CF6",
        items: [
            { id: 6, name: 'DataMind AI', tagline: 'Kurumsal veri analitiği', votes: 412, logo: 'DM' },
            { id: 7, name: 'ChatBot Pro', tagline: 'Akıllı müşteri hizmetleri', votes: 356, logo: 'CB' },
            { id: 8, name: 'VisionAI', tagline: 'Görüntü tanıma API', votes: 289, logo: 'VA' },
        ]
    },
    3: {
        id: 3,
        title: "Sürdürülebilirlik",
        description: "Çevre dostu ve yeşil startup'lar. Sürdürülebilir gelecek için çalışan, karbon ayak izini azaltan girişimler.",
        icon: "🌱",
        curator: "Green Hub",
        curatorAvatar: "GH",
        color: "#22C55E",
        items: [
            { id: 9, name: 'GreenDelivery', tagline: 'Elektrikli araç ile teslimat', votes: 234, logo: 'GD' },
            { id: 10, name: 'EcoPackage', tagline: 'Biyobozunur ambalaj', votes: 198, logo: 'EP' },
            { id: 11, name: 'SolarHome', tagline: 'Ev tipi güneş enerjisi', votes: 167, logo: 'SH' },
        ]
    },
    4: {
        id: 4,
        title: "Sağlık Teknolojileri",
        description: "HealthTech alanında yenilikçi çözümler. Telemedikal'den sağlık takibine, dijital sağlık çözümleri.",
        icon: "🏥",
        curator: "Health Desk",
        curatorAvatar: "HD",
        color: "#EF4444",
        items: [
            { id: 12, name: 'HealthTrack', tagline: 'Kişisel sağlık takibi', votes: 312, logo: 'HT' },
            { id: 13, name: 'DocOnline', tagline: 'Online doktor randevusu', votes: 278, logo: 'DO' },
            { id: 14, name: 'MedReminder', tagline: 'İlaç hatırlatma uygulaması', votes: 156, logo: 'MR' },
        ]
    }
};

export default function CollectionDetailPage({ params }) {
    const { id } = use(params);
    const collection = COLLECTIONS[id];

    if (!collection) {
        return (
            <div className={styles.page}>
                <div className="container">
                    <div className={styles.notFound}>
                        <span className={styles.notFoundIcon}>📂</span>
                        <h1>Koleksiyon Bulunamadı</h1>
                        <p>Aradığınız koleksiyon mevcut değil veya kaldırılmış olabilir.</p>
                        <Link href="/collections" className={styles.backBtn}>
                            ← Tüm Koleksiyonlara Dön
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Breadcrumb */}
                <div className={styles.breadcrumb}>
                    <Link href="/">Ana Sayfa</Link>
                    <span>/</span>
                    <Link href="/collections">Koleksiyonlar</Link>
                    <span>/</span>
                    <span>{collection.title}</span>
                </div>

                {/* Header */}
                <div className={styles.header}>
                    <div
                        className={styles.iconWrapper}
                        style={{ backgroundColor: `${collection.color}15` }}
                    >
                        <span className={styles.icon}>{collection.icon}</span>
                    </div>
                    <div className={styles.headerContent}>
                        <h1 className={styles.title}>{collection.title}</h1>
                        <p className={styles.description}>{collection.description}</p>
                        <div className={styles.curatorInfo}>
                            <div className={styles.curatorAvatar}>{collection.curatorAvatar}</div>
                            <span>Küratör: <strong>@{collection.curator}</strong></span>
                            <span className={styles.dot}>•</span>
                            <span>{collection.items.length} startup</span>
                        </div>
                    </div>
                </div>

                {/* Startup List */}
                <div className={styles.list}>
                    {collection.items.map((item, index) => (
                        <Link
                            key={item.id}
                            href={`/startups/${item.id}`}
                            className={styles.item}
                        >
                            <span className={styles.rank}>#{index + 1}</span>
                            <div className={styles.logo}>{item.logo}</div>
                            <div className={styles.itemContent}>
                                <h3 className={styles.itemName}>{item.name}</h3>
                                <p className={styles.itemTagline}>{item.tagline}</p>
                            </div>
                            <div className={styles.votes}>
                                <span className={styles.voteIcon}>⬆️</span>
                                <span className={styles.voteCount}>{item.votes}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Back Link */}
                <div className={styles.footer}>
                    <Link href="/collections" className={styles.backLink}>
                        ← Tüm Koleksiyonlara Dön
                    </Link>
                </div>
            </div>
        </div>
    );
}
