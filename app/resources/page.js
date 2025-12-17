"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './resources.module.css';

// Demo kaynaklar
const RESOURCE_CATEGORIES = [
    { id: 'all', name: 'Tümü', icon: '📚' },
    { id: 'tools', name: 'Araçlar', icon: '🛠️' },
    { id: 'templates', name: 'Şablonlar', icon: '📋' },
    { id: 'guides', name: 'Rehberler', icon: '📖' },
    { id: 'funding', name: 'Yatırım', icon: '💰' },
    { id: 'legal', name: 'Hukuki', icon: '⚖️' },
];

const DEMO_RESOURCES = [
    {
        id: 1,
        title: 'Pitch Deck Şablonu',
        description: 'Yatırımcılara sunum yapabileceğiniz profesyonel pitch deck şablonu. Canva ve PowerPoint formatında.',
        category: 'templates',
        type: 'Template',
        downloads: 2341,
        rating: 4.8,
        isFree: true,
        tags: ['pitch', 'yatırım', 'sunum'],
        icon: '📊'
    },
    {
        id: 2,
        title: 'Startup Validation Canvas',
        description: 'Fikrinizi test etmek için kullanabileceğiniz validation canvas. Problem-çözüm uyumunu doğrulayın.',
        category: 'templates',
        type: 'Template',
        downloads: 1876,
        rating: 4.9,
        isFree: true,
        tags: ['validation', 'canvas', 'lean'],
        icon: '✅'
    },
    {
        id: 3,
        title: 'İlk Yatırım Turuna Hazırlık Rehberi',
        description: 'Seed round öncesi yapmanız gerekenlerin kapsamlı listesi. Due diligence, term sheet ve daha fazlası.',
        category: 'funding',
        type: 'Guide',
        downloads: 3245,
        rating: 4.7,
        isFree: true,
        tags: ['seed', 'yatırım', 'due diligence'],
        icon: '💰'
    },
    {
        id: 4,
        title: 'Kurucu Ortaklık Sözleşmesi',
        description: 'Hukuki açıdan geçerli kurucu ortaklık sözleşmesi şablonu. Avukat onaylı.',
        category: 'legal',
        type: 'Document',
        downloads: 987,
        rating: 4.6,
        isFree: false,
        price: '₺199',
        tags: ['sözleşme', 'hukuki', 'kurucu'],
        icon: '📄'
    },
    {
        id: 5,
        title: 'Ücretsiz Startup Araçları Listesi',
        description: '100+ ücretsiz araç ve servis. AWS kredileri, tasarım araçları, analitik ve daha fazlası.',
        category: 'tools',
        type: 'List',
        downloads: 4521,
        rating: 4.9,
        isFree: true,
        tags: ['araçlar', 'ücretsiz', 'liste'],
        icon: '🧰'
    },
    {
        id: 6,
        title: 'Ekip Oluşturma Rehberi',
        description: 'İlk 10 çalışanınızı işe alırken dikkat etmeniz gerekenler ve interview soruları.',
        category: 'guides',
        type: 'Guide',
        downloads: 1234,
        rating: 4.5,
        isFree: true,
        tags: ['ekip', 'işe alım', 'hr'],
        icon: '👥'
    },
    {
        id: 7,
        title: 'Finansal Projeksiyon Tablosu',
        description: '5 yıllık finansal projeksiyon şablonu. Excel ve Google Sheets formatında.',
        category: 'templates',
        type: 'Spreadsheet',
        downloads: 2156,
        rating: 4.7,
        isFree: true,
        tags: ['finansal', 'excel', 'projeksiyon'],
        icon: '📈'
    },
    {
        id: 8,
        title: 'MVP Geliştirme Yol Haritası',
        description: 'Adım adım MVP geliştirme süreci. User story yazımından lansmana kadar.',
        category: 'guides',
        type: 'Guide',
        downloads: 1567,
        rating: 4.8,
        isFree: true,
        tags: ['mvp', 'geliştirme', 'agile'],
        icon: '🚀'
    },
];

function ResourceCard({ resource }) {
    return (
        <Link href={`/resources/${resource.id}`} className={styles.resourceCard}>
            <div className={styles.cardTop}>
                <span className={styles.resourceIcon}>{resource.icon}</span>
                <div className={styles.cardBadges}>
                    {resource.isFree ? (
                        <span className={styles.freeBadge}>Ücretsiz</span>
                    ) : (
                        <span className={styles.paidBadge}>{resource.price}</span>
                    )}
                    <span className={styles.typeBadge}>{resource.type}</span>
                </div>
            </div>

            <h3 className={styles.cardTitle}>{resource.title}</h3>
            <p className={styles.cardDesc}>{resource.description}</p>

            <div className={styles.tags}>
                {resource.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className={styles.tag}>#{tag}</span>
                ))}
            </div>

            <div className={styles.cardFooter}>
                <div className={styles.stats}>
                    <span>⬇️ {resource.downloads.toLocaleString()}</span>
                    <span>⭐ {resource.rating}</span>
                </div>
                <span className={styles.downloadBtn}>İndir →</span>
            </div>
        </Link>
    );
}

export default function ResourcesPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredResources = DEMO_RESOURCES.filter(resource => {
        const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Hero */}
                <div className={styles.hero}>
                    <h1 className={styles.title}>📚 Kaynak Merkezi</h1>
                    <p className={styles.subtitle}>
                        Startup'ınızı büyütmek için şablonlar, araçlar ve rehberler
                    </p>

                    <div className={styles.searchBox}>
                        <input
                            type="text"
                            placeholder="Şablon, araç veya rehber ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className={styles.categories}>
                    {RESOURCE_CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div className={styles.statsBar}>
                    <span>{filteredResources.length} kaynak</span>
                    <span>•</span>
                    <span>{DEMO_RESOURCES.filter(r => r.isFree).length} ücretsiz</span>
                </div>

                {/* Resources Grid */}
                <div className={styles.resourcesGrid}>
                    {filteredResources.map(resource => (
                        <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>

                {/* CTA */}
                <div className={styles.cta}>
                    <div className={styles.ctaContent}>
                        <h3>Paylaşacak bir kaynağınız mı var?</h3>
                        <p>Toplulukla paylaşın ve diğer girişimcilere yardımcı olun</p>
                    </div>
                    <Link href="/resources/submit" className={styles.ctaBtn}>
                        + Kaynak Paylaş
                    </Link>
                </div>
            </div>
        </div>
    );
}
