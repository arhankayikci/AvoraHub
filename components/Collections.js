"use client";

import Link from 'next/link';
import styles from './Collections.module.css';

// Demo koleksiyonlar
const DEMO_COLLECTIONS = [
    {
        id: 1,
        title: "2024'ün En İyi Fintech'leri",
        description: "Türkiye'nin öne çıkan fintech startup'ları",
        icon: "💳",
        itemCount: 12,
        curator: "AvoraHub Editör",
        color: "#0B4F3B"
    },
    {
        id: 2,
        title: "Yapay Zeka Çözümleri",
        description: "AI tabanlı inovatif girişimler",
        icon: "🤖",
        itemCount: 8,
        curator: "Tech Team",
        color: "#8B5CF6"
    },
    {
        id: 3,
        title: "Sürdürülebilirlik",
        description: "Çevre dostu ve yeşil startup'lar",
        icon: "🌱",
        itemCount: 15,
        curator: "Green Hub",
        color: "#22C55E"
    },
    {
        id: 4,
        title: "Sağlık Teknolojileri",
        description: "HealthTech alanında yenilikçi çözümler",
        icon: "🏥",
        itemCount: 10,
        curator: "Health Desk",
        color: "#EF4444"
    }
];

export function CollectionCard({ collection }) {
    return (
        <Link href={`/collections/${collection.id}`} className={styles.card}>
            <div
                className={styles.iconWrapper}
                style={{ backgroundColor: `${collection.color}15` }}
            >
                <span className={styles.icon}>{collection.icon}</span>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{collection.title}</h3>
                <p className={styles.description}>{collection.description}</p>
                <div className={styles.meta}>
                    <span className={styles.count}>{collection.itemCount} startup</span>
                    <span className={styles.curator}>@{collection.curator}</span>
                </div>
            </div>
        </Link>
    );
}

export default function Collections({ collections = DEMO_COLLECTIONS, title = "Koleksiyonlar" }) {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.sectionTitle}>📚 {title}</h2>
                <Link href="/collections" className={styles.viewAll}>
                    Tümünü Gör →
                </Link>
            </div>
            <div className={styles.grid}>
                {collections.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
            </div>
        </section>
    );
}
