"use client";

import { useState, useEffect } from 'react';
import styles from './BudgetCalculator.module.css';

export default function BudgetCalculator({ problem }) {
    const [teamSize, setTeamSize] = useState({
        developer: 1,
        designer: 1,
        marketPlanner: 0,
        manager: 0
    });
    const [duration, setDuration] = useState(3); // months
    const [region, setRegion] = useState('turkey');
    const [budget, setBudget] = useState(null);

    // Hourly rates by region and role (in TL)
    const rates = {
        turkey: {
            developer: 500,
            designer: 400,
            marketPlanner: 450,
            manager: 550
        },
        global: {
            developer: 1200,
            designer: 900,
            marketPlanner: 1000,
            manager: 1300
        }
    };

    const calculateBudget = () => {
        const monthlyHours = 160; // ~20 days * 8 hours
        const regionRates = rates[region];

        const breakdown = {
            development: teamSize.developer * regionRates.developer * monthlyHours * duration,
            design: teamSize.designer * regionRates.designer * monthlyHours * duration,
            marketing: teamSize.marketPlanner * regionRates.marketPlanner * monthlyHours * duration,
            management: teamSize.manager * regionRates.manager * monthlyHours * duration,
            infrastructure: 50000 * duration, // Fixed monthly cost
            misc: 0
        };

        const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);
        breakdown.misc = total * 0.1; // 10% contingency

        setBudget({
            breakdown,
            total: total + breakdown.misc
        });
    };

    useEffect(() => {
        setTimeout(() => {
            calculateBudget();
        }, 0);
    }, [teamSize, duration, region]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className={styles.section}>
            <div className={styles.header}>
                <div className={styles.icon}>💰</div>
                <div>
                    <h3 className={styles.title}>Bütçe Hesaplayıcı</h3>
                    <p className={styles.subtitle}>
                        Projeniz için tahmini maliyet hesaplayın
                    </p>
                </div>
            </div>

            <div className={styles.calculator}>
                {/* Team Size */}
                <div className={styles.inputGroup}>
                    <label>Ekip Üyesi Sayısı</label>
                    <div className={styles.roleInputs}>
                        <div className={styles.roleInput}>
                            <span>💻 Developer</span>
                            <input
                                type="number"
                                min="0"
                                max="10"
                                value={teamSize.developer}
                                onChange={(e) => setTeamSize({ ...teamSize, developer: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div className={styles.roleInput}>
                            <span>🎨 Designer</span>
                            <input
                                type="number"
                                min="0"
                                max="10"
                                value={teamSize.designer}
                                onChange={(e) => setTeamSize({ ...teamSize, designer: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div className={styles.roleInput}>
                            <span>📊 Market Planner</span>
                            <input
                                type="number"
                                min="0"
                                max="10"
                                value={teamSize.marketPlanner}
                                onChange={(e) => setTeamSize({ ...teamSize, marketPlanner: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div className={styles.roleInput}>
                            <span>👔 Manager</span>
                            <input
                                type="number"
                                min="0"
                                max="10"
                                value={teamSize.manager}
                                onChange={(e) => setTeamSize({ ...teamSize, manager: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                    </div>
                </div>

                {/* Duration */}
                <div className={styles.inputGroup}>
                    <label>Proje Süresi: {duration} ay</label>
                    <input
                        type="range"
                        min="1"
                        max="24"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        className={styles.slider}
                    />
                    <div className={styles.sliderLabels}>
                        <span>1 ay</span>
                        <span>24 ay</span>
                    </div>
                </div>

                {/* Region */}
                <div className={styles.inputGroup}>
                    <label>Pazar Bölgesi</label>
                    <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className={styles.select}
                    >
                        <option value="turkey">Türkiye</option>
                        <option value="global">Global</option>
                    </select>
                </div>
            </div>

            {/* Budget Breakdown */}
            {budget && (
                <div className={styles.results}>
                    <h4 className={styles.resultsTitle}>Tahmini Maliyet Analizi</h4>
                    <div className={styles.breakdown}>
                        {budget.breakdown.development > 0 && (
                            <div className={styles.breakdownItem}>
                                <span>Yazılım Geliştirme</span>
                                <span className={styles.amount}>
                                    {formatCurrency(budget.breakdown.development)}
                                </span>
                            </div>
                        )}
                        {budget.breakdown.design > 0 && (
                            <div className={styles.breakdownItem}>
                                <span>Tasarım</span>
                                <span className={styles.amount}>
                                    {formatCurrency(budget.breakdown.design)}
                                </span>
                            </div>
                        )}
                        {budget.breakdown.marketing > 0 && (
                            <div className={styles.breakdownItem}>
                                <span>Pazarlama & Planlama</span>
                                <span className={styles.amount}>
                                    {formatCurrency(budget.breakdown.marketing)}
                                </span>
                            </div>
                        )}
                        {budget.breakdown.management > 0 && (
                            <div className={styles.breakdownItem}>
                                <span>Proje Yönetimi</span>
                                <span className={styles.amount}>
                                    {formatCurrency(budget.breakdown.management)}
                                </span>
                            </div>
                        )}
                        <div className={styles.breakdownItem}>
                            <span>Altyapı & Hosting</span>
                            <span className={styles.amount}>
                                {formatCurrency(budget.breakdown.infrastructure)}
                            </span>
                        </div>
                        <div className={styles.breakdownItem}>
                            <span>Beklenmedik Giderler (%10)</span>
                            <span className={styles.amount}>
                                {formatCurrency(budget.breakdown.misc)}
                            </span>
                        </div>
                    </div>

                    <div className={styles.total}>
                        <span className={styles.totalLabel}>Toplam Tahmini Bütçe</span>
                        <span className={styles.totalAmount}>
                            {formatCurrency(budget.total)}
                        </span>
                    </div>

                    <p className={styles.disclaimer}>
                        * Bu hesaplama tahminidir ve gerçek maliyetler değişiklik gösterebilir.
                    </p>
                </div>
            )}
        </div>
    );
}
