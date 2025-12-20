"use client";

import { useState, useEffect } from 'react';
import CategoryBar from '@/components/CategoryBar';
import styles from './news.module.css';
import Link from 'next/link';

export default function NewsPage() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch('/api/news');
                if (res.ok) {
                    const data = await res.json();
                    setNews(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const featuredNews = news.find(n => n.featured);
    const otherNews = news.filter(n => !n.featured && (activeCategory === 'all' || n.category?.toLowerCase() === activeCategory.toLowerCase()));

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className={styles.title}>Haberler</h1>
                        <p className={styles.subtitle}>
                            Girişimcilik ekosisteminden en son haberler, başarı hikayeleri ve analizler
                        </p>
                    </div>
                </div>
            </section>

            {/* Category Bar */}
            <CategoryBar
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            {/* Content */}
            <section className={styles.newsSection}>
                <div className="container">
                    {loading ? (
                        <p>Yükleniyor...</p>
                    ) : news.length > 0 ? (
                        <>
                            {/* Featured News */}
                            {activeCategory === 'all' && featuredNews && (
                                <Link href={`/news/${featuredNews.id}`} className={styles.featuredCard}>
                                    <div className={styles.featuredImage}>
                                        <img src={featuredNews.image} alt={featuredNews.title} />
                                    </div>
                                    <div className={styles.featuredContent}>
                                        <span className={styles.badge}>{featuredNews.category}</span>
                                        <h2 className={styles.featuredTitle}>{featuredNews.title}</h2>
                                        <p className={styles.featuredExcerpt}>{featuredNews.excerpt}</p>
                                        <div className={styles.meta}>
                                            <span>{featuredNews.date}</span>
                                            <span>•</span>
                                            <span>{featuredNews.readTime} okuma</span>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* News Grid */}
                            <div className={styles.grid}>
                                {otherNews.map(item => (
                                    <Link key={item.id} href={`/news/${item.id}`} className={styles.newsCard}>
                                        <div className={styles.cardImage}>
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div className={styles.cardContent}>
                                            <span className={styles.badge}>{item.category}</span>
                                            <h3 className={styles.cardTitle}>{item.title}</h3>
                                            <p className={styles.cardExcerpt}>{item.excerpt}</p>
                                            <div className={styles.meta}>
                                                <span>{item.date}</span>
                                                <span>•</span>
                                                <span>{item.readTime}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className={styles.emptyState}>
                            <p>Henüz haber eklenmemiş.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
