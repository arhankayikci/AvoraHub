"use client";

import styles from './ValidationScore.module.css';

// Validation kriterları
const CRITERIA = [
    { id: 'problem_clarity', label: 'Problem Netliği', weight: 20, description: 'Problemin açık ve anlaşılır tanımlanması' },
    { id: 'market_size', label: 'Pazar Büyüklüğü', weight: 20, description: 'Hedef pazarın potansiyel büyüklüğü' },
    { id: 'solution_fit', label: 'Çözüm Uyumu', weight: 20, description: 'Çözümün probleme ne kadar uygun olduğu' },
    { id: 'traction', label: 'Traction', weight: 15, description: 'Mevcut kullanıcı/gelir/büyüme metrikleri' },
    { id: 'team', label: 'Takım', weight: 15, description: 'Takımın deneyimi ve yetkinliği' },
    { id: 'competition', label: 'Rekabet Avantajı', weight: 10, description: 'Rakiplere göre farklılaşma' },
];

function getScoreColor(score) {
    if (score >= 80) return '#16a34a';
    if (score >= 60) return '#f59e0b';
    if (score >= 40) return '#f97316';
    return '#dc2626';
}

function getScoreLabel(score) {
    if (score >= 80) return 'Mükemmel';
    if (score >= 60) return 'İyi';
    if (score >= 40) return 'Orta';
    return 'Geliştirilmeli';
}

export function ValidationScoreCard({ score, size = 'md' }) {
    const color = getScoreColor(score);
    const label = getScoreLabel(score);
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className={`${styles.scoreCard} ${styles[size]}`}>
            <svg className={styles.circle} viewBox="0 0 100 100">
                <circle
                    className={styles.circleBg}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    strokeWidth="8"
                />
                <circle
                    className={styles.circleProgress}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    strokeWidth="8"
                    stroke={color}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <div className={styles.scoreInner}>
                <span className={styles.scoreValue} style={{ color }}>{score}</span>
                <span className={styles.scoreLabel}>{label}</span>
            </div>
        </div>
    );
}

export function ValidationBreakdown({ scores = {} }) {
    // Default scores
    const defaultScores = {
        problem_clarity: 85,
        market_size: 70,
        solution_fit: 90,
        traction: 45,
        team: 80,
        competition: 65,
    };

    const finalScores = { ...defaultScores, ...scores };

    // Calculate total
    const totalScore = Math.round(
        CRITERIA.reduce((acc, c) => acc + (finalScores[c.id] * c.weight / 100), 0)
    );

    return (
        <div className={styles.breakdown}>
            <div className={styles.breakdownHeader}>
                <ValidationScoreCard score={totalScore} size="lg" />
                <div className={styles.breakdownInfo}>
                    <h3>Validation Score</h3>
                    <p>Startup'ınızın pazar uyumu ve yatırım potansiyelini gösteren kapsamlı skor.</p>
                </div>
            </div>

            <div className={styles.criteriaList}>
                {CRITERIA.map(criterion => {
                    const score = finalScores[criterion.id];
                    const color = getScoreColor(score);

                    return (
                        <div key={criterion.id} className={styles.criteriaItem}>
                            <div className={styles.criteriaHeader}>
                                <span className={styles.criteriaLabel}>{criterion.label}</span>
                                <span className={styles.criteriaWeight}>Ağırlık: %{criterion.weight}</span>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${score}%`, background: color }}
                                />
                            </div>
                            <div className={styles.criteriaFooter}>
                                <span className={styles.criteriaDesc}>{criterion.description}</span>
                                <span className={styles.criteriaScore} style={{ color }}>{score}/100</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={styles.tips}>
                <h4>💡 İyileştirme Önerileri</h4>
                <ul>
                    {finalScores.traction < 60 && (
                        <li>Traction metriklerinizi güçlendirin - kullanıcı sayısı, gelir veya büyüme göstergelerini paylaşın.</li>
                    )}
                    {finalScores.competition < 70 && (
                        <li>Rekabet avantajınızı daha net tanımlayın - sizi farklı kılan nedir?</li>
                    )}
                    {finalScores.market_size < 70 && (
                        <li>Pazar araştırmanızı detaylandırın - TAM/SAM/SOM hesaplamalarını ekleyin.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default ValidationBreakdown;
