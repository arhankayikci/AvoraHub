"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import styles from './onboarding.module.css';

interface RoleCardProps {
    role: 'entrepreneur' | 'investor';
    title: string;
    description: string;
    icon: string;
    features: string[];
    selected: boolean;
    onClick: () => void;
}

function RoleCard({ role, title, description, icon, features, selected, onClick }: RoleCardProps) {
    return (
        <div
            className={`${styles.roleCard} ${selected ? styles.selected : ''}`}
            onClick={onClick}
        >
            <div className={styles.iconWrapper}>
                <span className={styles.icon}>{icon}</span>
            </div>
            <h3 className={styles.roleTitle}>{title}</h3>
            <p className={styles.roleDescription}>{description}</p>
            <ul className={styles.features}>
                {features.map((feature, i) => (
                    <li key={i}>✓ {feature}</li>
                ))}
            </ul>
            {selected && <div className={styles.checkmark}>✓</div>}
        </div>
    );
}

export default function OnboardingPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [role, setRole] = useState<'entrepreneur' | 'investor' | null>(null);
    const [fullName, setFullName] = useState('');
    const [company, setCompany] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!role || !fullName.trim()) {
            setError('Lütfen tüm alanları doldurun');
            return;
        }

        if (!user) {
            setError('Kullanıcı oturumu bulunamadı');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { error: insertError } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: user.id,
                        full_name: fullName.trim(),
                        role: role,
                        company: company.trim() || null,
                    }
                ]);

            if (insertError) throw insertError;

            // Redirect to dashboard after successful profile creation
            // Use window.location.href to force middleware check
            window.location.href = '/dashboard';

        } catch (err: any) {
            console.error('Error creating profile:', err);
            setError(err.message || 'Profil oluşturulurken hata oluştu');
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>🎉 Hoş Geldin!</h1>
                    <p className={styles.subtitle}>
                        AvoraHub'a katıldığın için teşekkürler. Başlamak için rolünü seç:
                    </p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Role Selection */}
                    <div className={styles.roleSection}>
                        <label className={styles.label}>Rolünü Seç *</label>
                        <div className={styles.roleCards}>
                            <RoleCard
                                role="entrepreneur"
                                title="🚀 Girişimci"
                                description="Startup'ımı paylaşmak ve yatırımcı bulmak istiyorum"
                                icon="🚀"
                                features={[
                                    "Startup'ını paylaş",
                                    "Yatırımcılara ulaş",
                                    "Ekip arkadaşı bul",
                                    "Mentorluk al"
                                ]}
                                selected={role === 'entrepreneur'}
                                onClick={() => setRole('entrepreneur')}
                            />
                            <RoleCard
                                role="investor"
                                title="💰 Yatırımcı"
                                description="Yatırım fırsatları arıyorum ve girişimleri takip ediyorum"
                                icon="💰"
                                features={[
                                    "Startup'ları keşfet",
                                    "Portföy oluştur",
                                    "İstatistiklere eriş",
                                    "Network'üne katıl"
                                ]}
                                selected={role === 'investor'}
                                onClick={() => setRole('investor')}
                            />
                        </div>
                    </div>

                    {/* Personal Info */}
                    <div className={styles.personalInfo}>
                        <div className={styles.field}>
                            <label className={styles.label}>Ad Soyad *</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Örn: Ahmet Yılmaz"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>
                                {role === 'entrepreneur' ? 'Şirket/Startup Adı' : 'Şirket (Opsiyonel)'}
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder={role === 'entrepreneur' ? 'Örn: TechStartup' : 'Örn: ABC Ventures'}
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className={styles.error}>
                            ⚠️ {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={!role || !fullName.trim() || loading}
                    >
                        {loading ? 'Kaydediliyor...' : 'Devam Et →'}
                    </button>
                </form>
            </div>
        </div>
    );
}
