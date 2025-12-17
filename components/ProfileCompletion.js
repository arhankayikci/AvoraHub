import { useEffect, useState } from 'react';
import styles from './ProfileCompletion.module.css';

const completionSteps = [
    { id: 'avatar', label: 'Add profile photo', labelTr: 'Profil fotoğrafı ekle', points: 15 },
    { id: 'bio', label: 'Write bio', labelTr: 'Hakkında yaz', points: 15 },
    { id: 'social', label: 'Add social links', labelTr: 'Sosyal medya linkleri', points: 20 },
    { id: 'problem', label: 'Share first problem', labelTr: 'İlk problemi paylaş', points: 25 },
    { id: 'comment', label: 'Make first comment', labelTr: 'İlk yorumu yap', points: 15 },
    { id: 'verified', label: 'Verify email', labelTr: 'E-posta doğrula', points: 10 }
];

export default function ProfileCompletion({
    completedSteps = [],
    locale = 'en',
    showDetails = true
}) {
    const [percentage, setPercentage] = useState(0);
    const totalPoints = 100;
    const earnedPoints = completionSteps
        .filter(step => completedSteps.includes(step.id))
        .reduce((sum, step) => sum + step.points, 0);

    useEffect(() => {
        // Animate percentage
        const timer = setTimeout(() => {
            setPercentage(earnedPoints);
        }, 100);
        return () => clearTimeout(timer);
    }, [earnedPoints]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>
                    {locale === 'tr' ? 'Profil Tamamlama' : 'Profile Completion'}
                </h3>
                <span className={styles.percentage}>{percentage}%</span>
            </div>

            <div className={styles.progressBar}>
                <div
                    className={styles.progress}
                    style={{ width: `${percentage}%` }}
                >
                    <span className={styles.glow}></span>
                </div>
            </div>

            {showDetails && (
                <div className={styles.steps}>
                    {completionSteps.map((step) => {
                        const isCompleted = completedSteps.includes(step.id);
                        const label = locale === 'tr' ? step.labelTr : step.label;

                        return (
                            <div
                                key={step.id}
                                className={`${styles.step} ${isCompleted ? styles.completed : ''}`}
                            >
                                <div className={styles.checkbox}>
                                    {isCompleted && (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    )}
                                </div>
                                <span className={styles.stepLabel}>{label}</span>
                                <span className={styles.points}>+{step.points}%</span>
                            </div>
                        );
                    })}
                </div>
            )}

            {percentage === 100 && (
                <div className={styles.celebration}>
                    🎉 {locale === 'tr' ? 'Profil tamamlandı!' : 'Profile completed!'}
                </div>
            )}
        </div>
    );
}
