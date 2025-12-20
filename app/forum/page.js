"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './forum.module.css';

const DEMO_CATEGORIES = [
    { id: 'general', name: 'Genel', color: '#3b82f6' },
    { id: 'startups', name: 'Startup\'lar', color: '#10b981' },
    { id: 'funding', name: 'Yatırım & Fonlama', color: '#f59e0b' },
    { id: 'tech', name: 'Teknoloji', color: '#8b5cf6' },
    { id: 'marketing', name: 'Pazarlama & Growth', color: '#ec4899' },
    { id: 'hiring', name: 'İşe Alım', color: '#06b6d4' },
];

function TopicCard({ topic }) {
    const category = DEMO_CATEGORIES.find(c => c.id === topic.category);

    return (
        <Link href={`/forum/${topic.id}`} className={`${styles.topicCard} ${topic.is_pinned ? styles.pinned : ''}`}>
            {topic.is_pinned && <span className={styles.pinnedBadge}>Sabitlenmiş</span>}

            <div className={styles.topicLeft}>
                <div className={styles.avatar}>{topic.author_avatar || topic.author?.slice(0, 2).toUpperCase()}</div>
            </div>

            <div className={styles.topicContent}>
                <h3 className={styles.topicTitle}>{topic.title}</h3>
                <div className={styles.topicMeta}>
                    <span
                        className={styles.categoryBadge}
                        style={{ background: `${category?.color}20`, color: category?.color }}
                    >
                        {category?.name || topic.category}
                    </span>
                    <span className={styles.author}>@{topic.author}</span>
                </div>
                <div className={styles.tags}>
                    {topic.tags?.map((tag, i) => (
                        <span key={i} className={styles.tag}>#{tag}</span>
                    ))}
                </div>
            </div>

            <div className={styles.topicStats}>
                <div className={styles.stat}>
                    <span className={styles.statValue}>{topic.replies || 0}</span>
                    <span className={styles.statLabel}>yanıt</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.statValue}>{topic.views || 0}</span>
                    <span className={styles.statLabel}>görüntülenme</span>
                </div>
            </div>
        </Link>
    );
}

export default function ForumPage() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('recent');

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await fetch('/api/forum');
                if (res.ok) {
                    const data = await res.json();
                    setTopics(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error('Error fetching topics:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTopics();
    }, []);

    const filteredTopics = topics.filter(topic =>
        selectedCategory === 'all' || topic.category === selectedCategory
    );

    const sortedTopics = [...filteredTopics].sort((a, b) => {
        if (a.is_pinned && !b.is_pinned) return -1;
        if (!a.is_pinned && b.is_pinned) return 1;
        if (sortBy === 'popular') return (b.views || 0) - (a.views || 0);
        return 0;
    });

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <h1 className={styles.title}>Forum</h1>
                        <p className={styles.subtitle}>
                            Girişimcilik, teknoloji ve yatırım hakkında tartışmalar
                        </p>
                    </div>
                    <Link href="/forum/new" className={styles.newTopicBtn}>
                        Yeni Konu Aç
                    </Link>
                </div>

                {/* Layout */}
                <div className={styles.layout}>
                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.categoriesCard}>
                            <h3>Kategoriler</h3>
                            <button
                                className={`${styles.categoryBtn} ${selectedCategory === 'all' ? styles.active : ''}`}
                                onClick={() => setSelectedCategory('all')}
                            >
                                <span>Tümü</span>
                                <span className={styles.count}>{topics.length}</span>
                            </button>
                            {DEMO_CATEGORIES.map(cat => {
                                const count = topics.filter(t => t.category === cat.id).length;
                                return (
                                    <button
                                        key={cat.id}
                                        className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
                                        onClick={() => setSelectedCategory(cat.id)}
                                    >
                                        <span className={styles.catDot} style={{ background: cat.color }}></span>
                                        <span>{cat.name}</span>
                                        <span className={styles.count}>{count}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className={styles.rulesCard}>
                            <h3>Forum Kuralları</h3>
                            <ul>
                                <li>Saygılı ve yapıcı olun</li>
                                <li>Spam yapmayın</li>
                                <li>Doğru kategori seçin</li>
                                <li>Arama yapın, sonra sorun</li>
                            </ul>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className={styles.main}>
                        {/* Sort Bar */}
                        <div className={styles.sortBar}>
                            <span>{filteredTopics.length} konu</span>
                            <div className={styles.sortOptions}>
                                <button
                                    className={`${styles.sortBtn} ${sortBy === 'recent' ? styles.active : ''}`}
                                    onClick={() => setSortBy('recent')}
                                >
                                    En Yeni
                                </button>
                                <button
                                    className={`${styles.sortBtn} ${sortBy === 'popular' ? styles.active : ''}`}
                                    onClick={() => setSortBy('popular')}
                                >
                                    En Popüler
                                </button>
                            </div>
                        </div>

                        {/* Topics List */}
                        <div className={styles.topicsList}>
                            {loading ? (
                                <p>Yükleniyor...</p>
                            ) : sortedTopics.length > 0 ? (
                                sortedTopics.map(topic => (
                                    <TopicCard key={topic.id} topic={topic} />
                                ))
                            ) : (
                                <div className={styles.emptyState}>
                                    <p>Henüz konu eklenmemiş. İlk konuyu siz açın!</p>
                                    <Link href="/forum/new" className="btn btn-primary">Yeni Konu Aç</Link>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
