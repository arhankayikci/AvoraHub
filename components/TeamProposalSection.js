"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './TeamProposalSection.module.css';

export default function TeamProposalSection({ problemId, problem }) {
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [proposal, setProposal] = useState({
        solution: '',
        timeline: '',
        teamMembers: [],
        requiredRoles: []
    });

    const roles = [
        { id: 'developer', label: 'Developer', icon: '💻' },
        { id: 'designer', label: 'Designer', icon: '🎨' },
        { id: 'market-planner', label: 'Market Planner', icon: '📊' },
        { id: 'manager', label: 'Project Manager', icon: '👔' },
        { id: 'data-scientist', label: 'Data Scientist', icon: '📈' },
        { id: 'sales', label: 'Sales', icon: '💼' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('Teklif göndermek için giriş yapmalısınız!');
            return;
        }

        try {
            const res = await fetch('/api/proposals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    problemId,
                    userId: user.id,
                    ...proposal
                })
            });

            if (res.ok) {
                alert('Teklifiniz başarıyla gönderildi!');
                setShowModal(false);
                setProposal({
                    solution: '',
                    timeline: '',
                    teamMembers: [],
                    requiredRoles: []
                });
            }
        } catch (error) {
            console.error('Proposal submission failed:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    const toggleRole = (roleId) => {
        setProposal(prev => ({
            ...prev,
            requiredRoles: prev.requiredRoles.includes(roleId)
                ? prev.requiredRoles.filter(r => r !== roleId)
                : [...prev.requiredRoles, roleId]
        }));
    };

    return (
        <>
            <div className={styles.section}>
                <div className={styles.header}>
                    <div className={styles.icon}>💡</div>
                    <div>
                        <h3 className={styles.title}>Bu Problemi Çözebilir misiniz?</h3>
                        <p className={styles.subtitle}>
                            Ekibinizle bu probleme çözüm önerisi sunun ve yatırımcıların dikkatini çekin
                        </p>
                    </div>
                </div>

                <div className={styles.rolesContainer}>
                    <p className={styles.rolesLabel}>Aranan Roller:</p>
                    <div className={styles.rolesGrid}>
                        {roles.slice(0, 4).map(role => (
                            <div key={role.id} className={styles.roleChip}>
                                <span>{role.icon}</span>
                                <span>{role.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-primary"
                >
                    Çözüm Teklifinde Bulun →
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Çözüm Teklifi Gönder</h2>
                            <button
                                className={styles.closeBtn}
                                onClick={() => setShowModal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Çözüm Açıklaması *</label>
                                <textarea
                                    value={proposal.solution}
                                    onChange={(e) => setProposal({ ...proposal, solution: e.target.value })}
                                    placeholder="Bu problemi nasıl çözmeyi planlıyorsunuz?"
                                    rows={5}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Tahmini Süre *</label>
                                <select
                                    value={proposal.timeline}
                                    onChange={(e) => setProposal({ ...proposal, timeline: e.target.value })}
                                    required
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="1-3">1-3 ay</option>
                                    <option value="3-6">3-6 ay</option>
                                    <option value="6-12">6-12 ay</option>
                                    <option value="12+">12+ ay</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Gerekli Roller</label>
                                <div className={styles.rolesCheckboxGrid}>
                                    {roles.map(role => (
                                        <label key={role.id} className={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                checked={proposal.requiredRoles.includes(role.id)}
                                                onChange={() => toggleRole(role.id)}
                                            />
                                            <span>{role.icon} {role.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-ghost"
                                >
                                    İptal
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Teklif Gönder
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
