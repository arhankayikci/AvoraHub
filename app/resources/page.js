"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './resources.module.css';

const RESOURCE_CATEGORIES = [
    { id: 'all', name: 'Tümü', icon: '📚' },
    { id: 'tools', name: 'Araçlar', icon: '🛠️' },
    { id: 'templates', name: 'Şablonlar', icon: '📋' },
    { id: 'guides', name: 'Rehberler', icon: '📖' },
    { id: 'funding', name: 'Yatırım', icon: '💰' },
    { id: 'legal', name: 'Hukuki', icon: '⚖️' },
];

function ResourceCard({ resource }) {
    return (
        <Link href={`/resources/${resource.id}`} className={styles.resourceCard}>
            <div className={styles.cardHeader}>
                <span className={styles.resourceIcon}>{resource.icon}</span>
                <div className={styles.badges}>
                    {resource.isFree && <span className={styles.freeBadge}>Ücretsiz</span>}
                    <span className={styles.typeBadge}>{resource.type}</span>
                </div>
            </div>
            <h3 className={styles.resourceTitle}>{resource.title}</h3>
            <p className={styles.resourceDesc}>{resource.description}</p>
            <div className={styles.tags}>
                {resource.tags?.map((tag, i) => (
                    <span key={i} className={styles.tag}>#{tag}</span>
                ))}
            </div>
        </Link>
    );
}

export default function ResourcesPage() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const res = await fetch('/api/resources');
                if (res.ok) {
                    const data = await res.json();
                    setResources(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error('Error fetching resources:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

    const filteredResources = resources.filter(r => {
        const matchesCategory = activeCategory === 'all' || r.category === activeCategory;
        const matchesSearch = !searchQuery ||
            r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.title}>📚 Kaynak Merkezi</h1>
                    <p className={styles.subtitle}>
                        Startup&apos;ınızı büyütmek için şablonlar, araçlar ve rehberler.
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
            </section>

            <section className={styles.categories}>
                <div className="container">
                    <div className={styles.categoryTabs}>
                        {RESOURCE_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.active : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.resourcesSection}>
                <div className="container">
                    <div className={styles.statsBar}>
                        <span>{filteredResources.length} kaynak</span>
                    </div>

                    {loading ? (
                        <p>Yükleniyor...</p>
                    ) : filteredResources.length > 0 ? (
                        <div className={styles.resourcesGrid}>
                            {filteredResources.map(resource => (
                                <ResourceCard key={resource.id} resource={resource} />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <p>Henüz kaynak eklenmemiş.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
