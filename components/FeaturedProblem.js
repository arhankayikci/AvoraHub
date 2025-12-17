'use client';

import Link from 'next/link';
import styles from './FeaturedProblem.module.css';
import EmpathyButton from './EmpathyButton';

export default function FeaturedProblem() {
    const featured = {
        id: 1,
        title: 'Elektrikli araç şarj istasyonu eksikliği',
        description: 'Türkiye\'nin büyük şehirlerinde elektrikli araçların şarj edilebileceği yeterli istasyon yok. Bu durum EV benimsenmesini engelliyor ve çevresel hedeflere ulaşmayı zorlaştırıyor.',
        category: 'Ulaşım',
        empathyCount: 342,
        comments: 56,
        author: 'Ayşe Demir',
        badge: 'Problem of the Day',
        trending: '+125% today'
    };

    return (
        <div className={styles.featuredCard}>
            <div className={styles.badge}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                {featured.badge}
            </div>

            <Link href={`/problems/${featured.id}`} className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{featured.title}</h3>
                    <span className={styles.trending}>{featured.trending}</span>
                </div>

                <p className={styles.description}>{featured.description}</p>

                <div className={styles.footer}>
                    <div className={styles.meta}>
                        <span className={styles.category}>{featured.category}</span>
                        <span className={styles.author}>by {featured.author}</span>
                    </div>

                    <div className={styles.stats}>
                        <EmpathyButton
                            initialCount={featured.empathyCount}
                            size="small"
                        />
                        <span className={styles.comments}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            {featured.comments}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
