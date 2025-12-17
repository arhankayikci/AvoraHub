"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './forum.module.css';

// Demo forum verileri
const DEMO_CATEGORIES = [
    { id: 'general', name: 'Genel', color: '#3b82f6' },
    { id: 'startups', name: 'Startup\'lar', color: '#10b981' },
    { id: 'funding', name: 'Yatırım & Fonlama', color: '#f59e0b' },
    { id: 'tech', name: 'Teknoloji', color: '#8b5cf6' },
    { id: 'marketing', name: 'Pazarlama & Growth', color: '#ec4899' },
    { id: 'hiring', name: 'İşe Alım', color: '#06b6d4' },
];

const DEMO_TOPICS = [
    {
        id: 1,
        title: 'İlk yatırımcı görüşmesine nasıl hazırlanılır?',
        category: 'funding',
        author: { name: 'Ahmet Yılmaz', avatar: 'AY' },
        replies: 24,
        views: 456,
        lastActivity: '2 saat önce',
        isPinned: true,
        tags: ['yatırım', 'pitch']
    },
    {
        id: 2,
        title: 'React vs Next.js - 2024 için hangisi daha iyi?',
        category: 'tech',
        author: { name: 'Can Demir', avatar: 'CD' },
        replies: 38,
        views: 892,
        lastActivity: '3 saat önce',
        isPinned: true,
        tags: ['react', 'nextjs', 'frontend']
    },
    {
        id: 3,
        title: 'Startup\'ımı nasıl validation yapabilirim?',
        category: 'startups',
        author: { name: 'Elif Kaya', avatar: 'EK' },
        replies: 15,
        views: 234,
        lastActivity: '5 saat önce',
        isPinned: false,
        tags: ['validation', 'mvp']
    },
    {
        id: 4,
        title: 'LinkedIn organik büyüme stratejileri',
        category: 'marketing',
        author: { name: 'Murat Öz', avatar: 'MÖ' },
        replies: 42,
        views: 1203,
        lastActivity: 'Dün',
        isPinned: false,
        tags: ['linkedin', 'growth', 'b2b']
    },
    {
        id: 5,
        title: 'Remote developer maaşları 2024',
        category: 'hiring',
        author: { name: 'Selin A.', avatar: 'SA' },
        replies: 67,
        views: 2341,
        lastActivity: 'Dün',
        isPinned: false,
        tags: ['remote', 'maaş', 'developer']
    },
    {
        id: 6,
        title: 'AvoraHub\'da startup paylaşırken dikkat edilmesi gerekenler',
        category: 'general',
        author: { name: 'AvoraHub Team', avatar: 'AH' },
        replies: 8,
        views: 567,
        lastActivity: '2 gün önce',
        isPinned: false,
        tags: ['rehber', 'avorahub']
    },
];

function TopicCard({ topic }) {
    const category = DEMO_CATEGORIES.find(c => c.id === topic.category);

    return (
        <Link href={`/forum/${topic.id}`} className={`${styles.topicCard} ${topic.isPinned ? styles.pinned : ''}`}>
            {topic.isPinned && <span className={styles.pinnedBadge}>Sabitlenmiş</span>}

            <div className={styles.topicLeft}>
                <div className={styles.avatar}>{topic.author.avatar}</div>
            </div>

            <div className={styles.topicContent}>
                <h3 className={styles.topicTitle}>{topic.title}</h3>
                <div className={styles.topicMeta}>
                    <span
                        className={styles.categoryBadge}
                        style={{ background: `${category?.color}20`, color: category?.color }}
                    >
                        {category?.name}
                    </span>
                    <span className={styles.author}>@{topic.author.name}</span>
                </div>
                <div className={styles.tags}>
                    {topic.tags.map((tag, i) => (
                        <span key={i} className={styles.tag}>#{tag}</span>
                    ))}
                </div>
            </div>

            <div className={styles.topicStats}>
                <div className={styles.stat}>
                    <span className={styles.statValue}>{topic.replies}</span>
                    <span className={styles.statLabel}>yanıt</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.statValue}>{topic.views}</span>
                    <span className={styles.statLabel}>görüntülenme</span>
                </div>
                <div className={styles.lastActivity}>
                    {topic.lastActivity}
                </div>
            </div>
        </Link>
    );
}

export default function ForumPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('recent');

    const filteredTopics = DEMO_TOPICS.filter(topic =>
        selectedCategory === 'all' || topic.category === selectedCategory
    );

    const sortedTopics = [...filteredTopics].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        if (sortBy === 'popular') return b.views - a.views;
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
                        + Yeni Konu Aç
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
                                <span className={styles.count}>{DEMO_TOPICS.length}</span>
                            </button>
                            {DEMO_CATEGORIES.map(cat => {
                                const count = DEMO_TOPICS.filter(t => t.category === cat.id).length;
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
                            {sortedTopics.map(topic => (
                                <TopicCard key={topic.id} topic={topic} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
