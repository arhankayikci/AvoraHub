"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './problem-detail.module.css';
import CommentSection from '@/components/CommentSection';
import VoteButton from '@/components/VoteButton';
import ShareButtons from '@/components/ShareButtons';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';

export default function ProblemDetailPage() {
    const params = useParams();
    const { id } = params;
    const { user } = useAuth();

    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showProposalModal, setShowProposalModal] = useState(false);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const res = await fetch(`/api/problems/${id}`);
                if (!res.ok) throw new Error('Problem not found');
                const data = await res.json();
                setProblem(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProblem();
    }, [id]);

    if (loading) return <div className={styles.loadingContainer}><LoadingSpinner /></div>;
    if (error) return (
        <div className={styles.errorContainer}>
            <h1>Problem Bulunamadı</h1>
            <Link href="/problems" className="btn btn-primary">Listeye Dön</Link>
        </div>
    );
    if (!problem) return null;

    return (
        <div className={styles.page}>
            {/* Hero Section - Compact */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.breadcrumb}>
                        <Link href="/">Ana Sayfa</Link>
                        <span>/</span>
                        <Link href="/problems">Problemler</Link>
                        <span>/</span>
                        <span>{problem.category}</span>
                    </div>

                    <div className={styles.heroContent}>
                        <span className={styles.categoryBadge}>{problem.category}</span>
                        <h1 className={styles.title}>{problem.title}</h1>

                        <div className={styles.heroMeta}>
                            <div className={styles.authorInfo}>
                                <div className={styles.avatar}>{problem.author?.[0] || 'A'}</div>
                                <div>
                                    <span className={styles.authorName}>{problem.author || 'Anonim'}</span>
                                    <span className={styles.date}>
                                        {new Date(problem.createdAt).toLocaleDateString('tr-TR')} • {problem.country}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.heroStats}>
                                <div className={styles.statBox}>
                                    <span className={styles.statNumber}>{problem.votes}</span>
                                    <span className={styles.statLabel}>Oy</span>
                                </div>
                                <div className={styles.statBox}>
                                    <span className={styles.statNumber}>{problem.comments || 0}</span>
                                    <span className={styles.statLabel}>Yorum</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content - Problem Description First */}
            <section className={styles.contentSection}>
                <div className="container">
                    <div className={styles.contentGrid}>
                        {/* Left: Problem Details */}
                        <div className={styles.mainContent}>
                            {/* Problem Description Card - TOP */}
                            <div className={styles.contentCard}>
                                <h2 className={styles.sectionTitle}>Problem Tanımı</h2>
                                <p className={styles.description}>{problem.description}</p>

                                {problem.detailedDescription && (
                                    <>
                                        <h3 className={styles.subTitle}>Detaylar</h3>
                                        <p className={styles.text}>{problem.detailedDescription}</p>
                                    </>
                                )}

                                <div className={styles.actions}>
                                    <VoteButton
                                        itemId={id}
                                        itemType="problem"
                                        initialCount={problem.votes}
                                    />
                                    <ShareButtons title={problem.title} />
                                </div>
                            </div>

                            {/* Info Cards - Below Description */}
                            <div className={styles.infoCards}>
                                {/* Team Roles */}
                                <div className={styles.infoCard}>
                                    <h3 className={styles.infoCardTitle}>
                                        <span>👥</span> Aranan Ekip Üyeleri
                                    </h3>
                                    <div className={styles.roleGrid}>
                                        <div className={styles.roleItem}>
                                            <span>💻</span>
                                            <span>Developer</span>
                                            <span className={styles.roleCount}>x2</span>
                                        </div>
                                        <div className={styles.roleItem}>
                                            <span>🎨</span>
                                            <span>Designer</span>
                                            <span className={styles.roleCount}>x1</span>
                                        </div>
                                        <div className={styles.roleItem}>
                                            <span>📊</span>
                                            <span>Market Planner</span>
                                            <span className={styles.roleCount}>x1</span>
                                        </div>
                                        <div className={styles.roleItem}>
                                            <span>👔</span>
                                            <span>Manager</span>
                                            <span className={styles.roleCount}>x1</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Budget */}
                                <div className={styles.infoCard}>
                                    <h3 className={styles.infoCardTitle}>
                                        <span>💰</span> Bütçe Tahmini
                                    </h3>
                                    <div className={styles.budgetList}>
                                        <div className={styles.budgetRow}>
                                            <span>Yazılım Geliştirme</span>
                                            <span>₺240.000</span>
                                        </div>
                                        <div className={styles.budgetRow}>
                                            <span>Tasarım</span>
                                            <span>₺192.000</span>
                                        </div>
                                        <div className={styles.budgetRow}>
                                            <span>Altyapı & Hosting</span>
                                            <span>₺150.000</span>
                                        </div>
                                        <div className={styles.budgetTotal}>
                                            <span>Toplam</span>
                                            <span>₺582.000</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Requirements */}
                                <div className={styles.infoCard}>
                                    <h3 className={styles.infoCardTitle}>
                                        <span>📋</span> Çözüm Gereksinimleri
                                    </h3>
                                    <div className={styles.reqList}>
                                        <div className={styles.reqItem}>
                                            <span>Bütçe Aralığı</span>
                                            <span>{problem.budgetMin ? `$${problem.budgetMin} - $${problem.budgetMax}` : '$50K - $200K'}</span>
                                        </div>
                                        <div className={styles.reqItem}>
                                            <span>Tahmini Süre</span>
                                            <span>{problem.timeline || '3-6 Ay'}</span>
                                        </div>
                                        <div className={styles.reqItem}>
                                            <span>Öncelik</span>
                                            <span>Yüksek</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className={styles.ctaCard}>
                                <div className={styles.ctaContent}>
                                    <h3>Bu Problemi Çözebilir misiniz?</h3>
                                    <p>Ekibinizle bu probleme çözüm önerisi sunun</p>
                                </div>
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={() => setShowProposalModal(true)}
                                >
                                    Çözüm Teklifinde Bulun →
                                </button>
                            </div>

                            {/* Comments */}
                            <CommentSection problemId={id} />
                        </div>

                        {/* Right Sidebar - Problem Owner & Similar at TOP */}
                        <aside className={styles.sidebar}>
                            {/* Problem Owner */}
                            <div className={styles.sidebarCard}>
                                <h4>Problem Sahibi</h4>
                                <div className={styles.ownerInfo}>
                                    <div className={styles.ownerAvatar}>{problem.author?.[0] || 'A'}</div>
                                    <div>
                                        <span className={styles.ownerName}>{problem.author || 'Anonim'}</span>
                                        <span className={styles.ownerMeta}>Problem Sahibi</span>
                                    </div>
                                </div>
                                <button className="btn btn-outline btn-full">Mesaj Gönder</button>
                            </div>

                            {/* Quick Stats - MOVED UP */}
                            <div className={styles.sidebarCard}>
                                <h4>Hızlı Bilgi</h4>
                                <div className={styles.quickStats}>
                                    <div className={styles.quickStatItem}>
                                        <span>💰</span>
                                        <div>
                                            <span className={styles.quickStatLabel}>Bütçe</span>
                                            <span className={styles.quickStatValue}>₺582K</span>
                                        </div>
                                    </div>
                                    <div className={styles.quickStatItem}>
                                        <span>⏱️</span>
                                        <div>
                                            <span className={styles.quickStatLabel}>Süre</span>
                                            <span className={styles.quickStatValue}>3-6 Ay</span>
                                        </div>
                                    </div>
                                    <div className={styles.quickStatItem}>
                                        <span>👥</span>
                                        <div>
                                            <span className={styles.quickStatLabel}>Ekip</span>
                                            <span className={styles.quickStatValue}>5 Kişi</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Similar Problems */}
                            <div className={styles.sidebarCard}>
                                <h4>Benzer Problemler</h4>
                                <div className={styles.similarList}>
                                    <Link href="/problems/2" className={styles.similarItem}>
                                        <span>E-Ticaret Lojistik Çözümü</span>
                                        <span className={styles.similarVotes}>↑ 89</span>
                                    </Link>
                                    <Link href="/problems/3" className={styles.similarItem}>
                                        <span>Ödeme Sistemi Entegrasyonu</span>
                                        <span className={styles.similarVotes}>↑ 67</span>
                                    </Link>
                                    <Link href="/problems/4" className={styles.similarItem}>
                                        <span>Müşteri Destek Otomasyonu</span>
                                        <span className={styles.similarVotes}>↑ 45</span>
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Proposal Modal */}
            {showProposalModal && (
                <div className={styles.modalOverlay} onClick={() => setShowProposalModal(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Çözüm Teklifi Gönder</h2>
                            <button onClick={() => setShowProposalModal(false)}>✕</button>
                        </div>
                        <form className={styles.modalForm}>
                            <div className={styles.formGroup}>
                                <label>Çözüm Açıklaması *</label>
                                <textarea placeholder="Bu problemi nasıl çözmeyi planlıyorsunuz?" rows={5}></textarea>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Tahmini Süre *</label>
                                <select>
                                    <option>Seçiniz</option>
                                    <option>1-3 ay</option>
                                    <option>3-6 ay</option>
                                    <option>6-12 ay</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Gerekli Ekip</label>
                                <div className={styles.checkboxGrid}>
                                    <label><input type="checkbox" /> 💻 Developer</label>
                                    <label><input type="checkbox" /> 🎨 Designer</label>
                                    <label><input type="checkbox" /> 📊 Market Planner</label>
                                    <label><input type="checkbox" /> 👔 Manager</label>
                                </div>
                            </div>
                            <div className={styles.modalActions}>
                                <button type="button" className="btn btn-ghost" onClick={() => setShowProposalModal(false)}>İptal</button>
                                <button type="submit" className="btn btn-primary">Teklif Gönder</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
