"use client";

import Link from 'next/link';
import styles from './collections.module.css';

// Demo koleksiyonlar
const COLLECTIONS = [
    {
        id: 1,
        title: "2024'ün En İyi Fintech'leri",
        description: "Türkiye'nin öne çıkan fintech startup'ları. Ödeme sistemlerinden kripto çözümlerine kadar geniş bir yelpaze.",
        icon: "💳",
        itemCount: 12,
        curator: "AvoraHub Editör",
        color: "#0B4F3B",
        items: [
            { id: 1, name: 'PayFlex', tagline: 'KOBİ\'ler için ödeme çözümleri' },
            { id: 2, name: 'CryptoTR', tagline: 'Kripto para cüzdanı' },
            { id: 3, name: 'FinBot', tagline: 'AI destekli finansal danışman' },
        ]
    },
    {
        id: 2,
        title: "Yapay Zeka Çözümleri",
        description: "AI tabanlı inovatif girişimler. Doğal dil işlemeden görüntü tanımaya kadar en son teknolojiler.",
        icon: "🤖",
        itemCount: 8,
        curator: "Tech Team",
        color: "#8B5CF6",
        items: [
            { id: 4, name: 'DataMind AI', tagline: 'Kurumsal veri analitiği' },
            { id: 5, name: 'ChatBot Pro', tagline: 'Müşteri hizmetleri botu' },
        ]
    },
    {
        id: 3,
        title: "Sürdürülebilirlik",
        description: "Çevre dostu ve yeşil startup'lar. Sürdürülebilir gelecek için çalışan girişimler.",
        icon: "🌱",
        itemCount: 15,
        curator: "Green Hub",
        color: "#22C55E",
        items: [
            { id: 6, name: 'GreenDelivery', tagline: 'Elektrikli araç ile teslimat' },
            { id: 7, name: 'EcoPackage', tagline: 'Biyobozunur ambalaj' },
        ]
    },
    {
        id: 4,
        title: "Sağlık Teknolojileri",
        description: "HealthTech alanında yenilikçi çözümler. Telemedikal'den sağlık takibine.",
        icon: "🏥",
        itemCount: 10,
        curator: "Health Desk",
        color: "#EF4444",
        items: [
            { id: 8, name: 'HealthTrack', tagline: 'Kişisel sağlık takibi' },
            { id: 9, name: 'DocOnline', tagline: 'Online doktor randevusu' },
        ]
    },
    {
        id: 5,
        title: "EdTech & Eğitim",
        description: "Eğitim teknolojileri alanındaki en iyi startup'lar.",
        icon: "📚",
        itemCount: 9,
        curator: "AvoraHub Editör",
        color: "#F59E0B",
        items: []
    },
    {
        id: 6,
        title: "E-Ticaret Çözümleri",
        description: "Online satış ve pazaryeri çözümleri sunan girişimler.",
        icon: "🛒",
        itemCount: 11,
        curator: "Commerce Team",
        color: "#EC4899",
        items: []
    }
];

export default function CollectionsPage() {
    return (
        <div className={styles.page}>
            <div className="container">
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <h1 className={styles.title}>📚 Koleksiyonlar</h1>
                        <p className={styles.subtitle}>
                            AvoraHub editörleri ve topluluk tarafından küratörlenen startup listeleri
                        </p>
                    </div>
                </div>

                {/* Collections Grid */}
                <div className={styles.grid}>
                    {COLLECTIONS.map((collection) => (
                        <Link
                            key={collection.id}
                            href={`/collections/${collection.id}`}
                            className={styles.card}
                        >
                            <div
                                className={styles.iconWrapper}
                                style={{ backgroundColor: `${collection.color}15` }}
                            >
                                <span className={styles.icon}>{collection.icon}</span>
                            </div>
                            <div className={styles.content}>
                                <h2 className={styles.cardTitle}>{collection.title}</h2>
                                <p className={styles.cardDescription}>{collection.description}</p>
                                <div className={styles.meta}>
                                    <span className={styles.count}>{collection.itemCount} startup</span>
                                    <span className={styles.curator}>@{collection.curator}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
