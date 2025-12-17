"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './register.module.css';

const profileTypes = [
    {
        id: 'entrepreneur',
        title: 'Girişimci',
        description: 'Girişimimi tanıtmak ve yatırımcılarla buluşmak istiyorum',
        icon: '🚀',
        color: '#0B4F3B'
    },
    {
        id: 'problem-owner',
        title: 'Problem Sahibi',
        description: 'Çözüm arayan bir problemim var',
        icon: '💡',
        color: '#D4AF37'
    },
    {
        id: 'investor',
        title: 'Yatırımcı',
        description: 'Yatırım fırsatları arıyorum',
        icon: '💰',
        color: '#1B6B54'
    },
    {
        id: 'solution-seeker',
        title: 'Çözüm Arayan',
        description: 'Problemlere çözüm üretmek istiyorum',
        icon: '🔧',
        color: '#2E8B70'
    }
];

const interestOptions = [
    'AI', 'Fintech', 'HealthTech', 'EdTech', 'E-Ticaret',
    'SaaS', 'AgTech', 'CleanTech', 'Sosyal Etki', 'Blockchain',
    'IoT', 'Cybersecurity', 'Marketing', 'AR/VR', 'Mobilite'
];

export default function RegisterPage() {
    const [step, setStep] = useState(1); // 1: Basic Info, 2: Profile Type, 3: Interests
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [interests, setInterests] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const router = useRouter();

    const handleNextStep = (e) => {
        e.preventDefault();

        if (step === 1) {
            if (!name || !email || !password) {
                setError('Lütfen tüm alanları doldurun');
                return;
            }
            if (password.length < 6) {
                setError('Şifre en az 6 karakter olmalıdır');
                return;
            }
            setError('');
            setStep(2);
        } else if (step === 2) {
            if (!userType) {
                setError('Lütfen bir profil tipi seçin');
                return;
            }
            setError('');
            setStep(3);
        }
    };

    const toggleInterest = (interest) => {
        setInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const res = await register(name, email, password, userType, interests);

        if (res.success) {
            router.push('/');
        } else {
            setError(res.error);
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {/* Progress Bar */}
                <div className={styles.progressBar}>
                    <div className={`${styles.progressStep} ${step >= 1 ? styles.active : ''}`}>
                        <div className={styles.stepNumber}>1</div>
                        <span>Bilgiler</span>
                    </div>
                    <div className={styles.progressLine}></div>
                    <div className={`${styles.progressStep} ${step >= 2 ? styles.active : ''}`}>
                        <div className={styles.stepNumber}>2</div>
                        <span>Profil</span>
                    </div>
                    <div className={styles.progressLine}></div>
                    <div className={`${styles.progressStep} ${step >= 3 ? styles.active : ''}`}>
                        <div className={styles.stepNumber}>3</div>
                        <span>İlgi Alanları</span>
                    </div>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                {/* Step 1: Basic Info */}
                {step === 1 && (
                    <div className={styles.stepContent}>
                        <h1 className={styles.title}>Kayıt Ol</h1>
                        <p className={styles.subtitle}>Avora topluluğuna katılın</p>

                        <form onSubmit={handleNextStep} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Ad Soyad</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Adınız Soyadınız"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>E-posta Adresi</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ornek@email.com"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Şifre</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="En az 6 karakter"
                                    minLength={6}
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                Devam Et
                            </button>
                        </form>
                    </div>
                )}

                {/* Step 2: Profile Type */}
                {step === 2 && (
                    <div className={styles.stepContent}>
                        <h1 className={styles.title}>Profilinizi Seçin</h1>
                        <p className={styles.subtitle}>Avora'yı nasıl kullanmak istiyorsunuz?</p>

                        <div className={styles.profileTypes}>
                            {profileTypes.map((type) => (
                                <div
                                    key={type.id}
                                    className={`${styles.profileCard} ${userType === type.id ? styles.selected : ''}`}
                                    onClick={() => setUserType(type.id)}
                                >
                                    <div className={styles.profileIcon} style={{ background: type.color }}>
                                        {type.icon}
                                    </div>
                                    <h3>{type.title}</h3>
                                    <p>{type.description}</p>
                                    <div className={styles.checkmark}>✓</div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                className={styles.backBtn}
                                onClick={() => setStep(1)}
                            >
                                Geri
                            </button>
                            <button
                                type="button"
                                className={styles.submitBtn}
                                onClick={handleNextStep}
                            >
                                Devam Et
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Interests */}
                {step === 3 && (
                    <div className={styles.stepContent}>
                        <h1 className={styles.title}>İlgi Alanlarınız</h1>
                        <p className={styles.subtitle}>İlgilendiğiniz alanları seçin (opsiyonel)</p>

                        <div className={styles.interestsGrid}>
                            {interestOptions.map((interest) => (
                                <button
                                    key={interest}
                                    type="button"
                                    className={`${styles.interestTag} ${interests.includes(interest) ? styles.selected : ''}`}
                                    onClick={() => toggleInterest(interest)}
                                >
                                    {interest}
                                </button>
                            ))}
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                className={styles.backBtn}
                                onClick={() => setStep(2)}
                            >
                                Geri
                            </button>
                            <button
                                type="button"
                                className={styles.submitBtn}
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'Kayıt Yapılıyor...' : 'Kayıt Tamamla'}
                            </button>
                        </div>
                    </div>
                )}

                <div className={styles.footer}>
                    Zaten hesabınız var mı? <Link href="/login">Giriş Yap</Link>
                </div>
            </div>
        </div>
    );
}
