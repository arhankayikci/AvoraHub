"use client";

import styles from './MilestoneTimeline.module.css';

const MILESTONE_ICONS = {
    launch: '🚀',
    funding: '💰',
    team: '👥',
    product: '📦',
    partnership: '🤝',
    award: '🏆',
    growth: '📈',
    feature: '✨',
    user: '👤',
    press: '📰',
    pivot: '🔄',
    acquisition: '💎'
};

export default function MilestoneTimeline({ milestones = [] }) {
    if (!milestones || milestones.length === 0) {
        // Demo milestones
        milestones = [
            { type: 'launch', title: 'Ürün Lansmanı', date: '2024-01', description: 'Beta sürümü yayınlandı' },
            { type: 'funding', title: 'Pre-Seed Yatırım', date: '2024-03', description: '500K TL yatırım alındı' },
            { type: 'team', title: 'Ekip Genişledi', date: '2024-05', description: '5 yeni takım üyesi' },
            { type: 'product', title: 'v1.0 Çıkışı', date: '2024-07', description: 'Tam sürüm yayınlandı' },
            { type: 'growth', title: '10K Kullanıcı', date: '2024-09', description: 'Kullanıcı hedefi aşıldı' }
        ];
    }

    const formatDate = (dateStr) => {
        const [year, month] = dateStr.split('-');
        const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
        return `${months[parseInt(month) - 1]} ${year}`;
    };

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>Yolculuk</h4>
            <div className={styles.timeline}>
                {milestones.map((milestone, index) => (
                    <div key={index} className={styles.item}>
                        <div className={styles.line}>
                            <div className={styles.dot}>
                                <span>{MILESTONE_ICONS[milestone.type] || '📍'}</span>
                            </div>
                            {index < milestones.length - 1 && <div className={styles.connector} />}
                        </div>
                        <div className={styles.content}>
                            <span className={styles.date}>{formatDate(milestone.date)}</span>
                            <h5 className={styles.milestoneTitle}>{milestone.title}</h5>
                            {milestone.description && (
                                <p className={styles.description}>{milestone.description}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
