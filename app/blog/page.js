"use client";

import Link from 'next/link';
import styles from './blog.module.css';

const BLOG_POSTS = [
    {
        id: 1,
        title: 'Seed Yatırım Almak İçin 10 Altın Kural',
        excerpt: 'İlk yatırımınızı almak için bilmeniz gereken kritik noktalar ve yatırımcıları etkileme stratejileri.',
        category: 'Yatırım',
        author: 'Ahmet Yılmaz',
        date: '15 Aralık 2024',
        readTime: '8 dk',
        image: '💰',
        featured: true
    },
    {
        id: 2,
        title: 'Product-Market Fit Nasıl Bulunur?',
        excerpt: 'Ürün-pazar uyumunu bulmak için kullanabileceğiniz pratik yöntemler ve metrikler.',
        category: 'Strateji',
        author: 'Elif Demir',
        date: '12 Aralık 2024',
        readTime: '6 dk',
        image: '🎯',
        featured: true
    },
    {
        id: 3,
        title: 'Türkiye\'de Startup Ekosistemi 2024 Raporu',
        excerpt: 'Yıllık ekosistemdeki gelişmeler, yatırım trendleri ve önümüzdeki dönem için beklentiler.',
        category: 'Analiz',
        author: 'AvoraHub Ekibi',
        date: '10 Aralık 2024',
        readTime: '12 dk',
        image: '📊',
        featured: false
    },
    {
        id: 4,
        title: 'Remote Takım Yönetiminde Başarının Sırları',
        excerpt: 'Dağıtık ekiplerinizi verimli bir şekilde yönetmek için ipuçları ve araç önerileri.',
        category: 'Yönetim',
        author: 'Can Öztürk',
        date: '8 Aralık 2024',
        readTime: '7 dk',
        image: '👥',
        featured: false
    },
    {
        id: 5,
        title: 'MVP\'den Ürün\'e: Geçiş Süreci',
        excerpt: 'Minimum Viable Product aşamasından tam teşekküllü ürüne geçiş stratejileri.',
        category: 'Ürün',
        author: 'Selin Arslan',
        date: '5 Aralık 2024',
        readTime: '9 dk',
        image: '🚀',
        featured: false
    },
    {
        id: 6,
        title: 'Startup Hukuku: Bilinmesi Gerekenler',
        excerpt: 'Şirket kuruluşu, ortaklık sözleşmeleri ve yasal konularda dikkat edilmesi gerekenler.',
        category: 'Hukuk',
        author: 'Zeynep Çelik',
        date: '1 Aralık 2024',
        readTime: '10 dk',
        image: '⚖️',
        featured: false
    }
];

const CATEGORIES = ['Tümü', 'Yatırım', 'Strateji', 'Ürün', 'Yönetim', 'Analiz', 'Hukuk'];

export default function BlogPage() {
    const featuredPosts = BLOG_POSTS.filter(p => p.featured);
    const regularPosts = BLOG_POSTS.filter(p => !p.featured);

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <h1 className={styles.title}>📝 Blog</h1>
                    <p className={styles.subtitle}>
                        Girişimcilik, startup ve ekosistem hakkında en güncel içerikler
                    </p>
                </div>

                {/* Featured Posts */}
                <div className={styles.featured}>
                    {featuredPosts.map(post => (
                        <Link key={post.id} href={`/blog/${post.id}`} className={styles.featuredCard}>
                            <span className={styles.featuredImage}>{post.image}</span>
                            <div className={styles.featuredContent}>
                                <span className={styles.category}>{post.category}</span>
                                <h2>{post.title}</h2>
                                <p>{post.excerpt}</p>
                                <div className={styles.meta}>
                                    <span>{post.author}</span>
                                    <span>•</span>
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime} okuma</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Categories */}
                <div className={styles.categories}>
                    {CATEGORIES.map(cat => (
                        <button key={cat} className={styles.catBtn}>{cat}</button>
                    ))}
                </div>

                {/* Posts Grid */}
                <div className={styles.grid}>
                    {regularPosts.map(post => (
                        <Link key={post.id} href={`/blog/${post.id}`} className={styles.card}>
                            <span className={styles.cardImage}>{post.image}</span>
                            <div className={styles.cardContent}>
                                <span className={styles.cardCategory}>{post.category}</span>
                                <h3>{post.title}</h3>
                                <p>{post.excerpt}</p>
                                <div className={styles.cardMeta}>
                                    <span>{post.author}</span>
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Newsletter */}
                <div className={styles.newsletter}>
                    <h3>📬 Haftalık Bülten</h3>
                    <p>En güncel içeriklerden haberdar olmak için abone olun</p>
                    <form className={styles.newsletterForm}>
                        <input type="email" placeholder="E-posta adresiniz" />
                        <button type="submit">Abone Ol</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
