"use client";

import { useState } from 'react';
import CategoryBar from '@/components/CategoryBar';
import styles from './news.module.css';
import Link from 'next/link';

export default function NewsPage() {
    const [activeCategory, setActiveCategory] = useState('all');

    // Mock News Data
    const news = [
        {
            id: 1,
            title: "Avora Product Hunter Lansmanı Gerçekleşti",
            excerpt: "Türkiye'nin en kapsamlı girişimcilik ve problem çözme platformu Avora, bugün itibarıyla yayın hayatına başladı.",
            category: "Platform",
            date: "27 Ocak 2025",
            readTime: "3 dk",
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1000",
            featured: true
        },
        {
            id: 2,
            title: "2025'in En Çok Yatırım Alan Sektörleri",
            excerpt: "Yapay zeka ve sürdürülebilirlik odaklı girişimler, 2025 yılının ilk çeyreğinde yatırım rekorları kırdı.",
            category: "Yatırım",
            date: "26 Ocak 2025",
            readTime: "5 dk",
            image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800",
            featured: false
        },
        {
            id: 3,
            title: "Yerli Girişim 'VergiBot' Global Pazara Açılıyor",
            excerpt: "Avora platformunda keşfedilen VergiBot, aldığı tohum yatırımla Avrupa pazarına açılmaya hazırlanıyor.",
            category: "Startup",
            date: "25 Ocak 2025",
            readTime: "4 dk",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
            featured: false
        },
        {
            id: 4,
            title: "Girişimciler İçin Hukuk Rehberi Yayınlandı",
            excerpt: "Şirket kuruluşundan fikri mülkiyet haklarına kadar bilmeniz gereken her şey bu rehberde.",
            category: "Rehber",
            date: "24 Ocak 2025",
            readTime: "8 dk",
            image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
            featured: false
        },
        {
            id: 5,
            title: "Teknoloji Dünyasında Kadın Girişimcilerin Yükselişi",
            excerpt: "Son raporda kadın kuruculu startup sayısında %40 artış gözlemlendi.",
            category: "Teknoloji",
            date: "23 Ocak 2025",
            readTime: "4 dk",
            image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
            featured: false
        },
        {
            id: 6,
            title: "Avora Topluluk Buluşmaları Başlıyor",
            excerpt: "İstanbul, Ankara ve İzmir'de düzenlenecek networking etkinliklerinin takvimi açıklandı.",
            category: "Etkinlik",
            date: "22 Ocak 2025",
            readTime: "2 dk",
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
            featured: false
        }
    ];

    const featuredNews = news.find(n => n.featured);
    const otherNews = news.filter(n => !n.featured && (activeCategory === 'all' || n.category.toLowerCase() === activeCategory.toLowerCase()));

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

            {/* Featured News */}
            {activeCategory === 'all' && featuredNews && (
                <section className={styles.featuredSection}>
                    <div className="container">
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
                    </div>
                </section>
            )}

            {/* News Grid */}
            <section className={styles.newsSection}>
                <div className="container">
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
                </div>
            </section>
        </div>
    );
}
