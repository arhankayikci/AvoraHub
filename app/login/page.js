"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const res = await login(email, password);

        if (res.success) {
            router.push('/');
        } else {
            setError(res.error);
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Left Side - Branding */}
                <div className={styles.brandSide}>
                    <div className={styles.brandContent}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoAvora}>AVORA</span>
                            <span className={styles.logoHub}>HUB</span>
                        </Link>

                        <div className={styles.brandMain}>
                            <p className={styles.brandTagline}>Türkiye&apos;nin Lider</p>
                            <h1 className={styles.brandTitle}>
                                Girişimcilik<br />
                                Platformu
                            </h1>
                            <p className={styles.brandText}>
                                Fikirlerin sermayeyle buluştuğu, girişimcilerin
                                yatırımcılarla bağlantı kurduğu ekosistem.
                            </p>
                        </div>

                        <div className={styles.brandFeatures}>
                            <div className={styles.brandFeature}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Doğrulanmış Yatırımcılar</span>
                            </div>
                            <div className={styles.brandFeature}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Güvenli Veri Altyapısı</span>
                            </div>
                            <div className={styles.brandFeature}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Hızlı Eşleştirme Sistemi</span>
                            </div>
                        </div>

                        <div className={styles.brandStats}>
                            <div className={styles.brandStat}>
                                <span className={styles.statValue}>500+</span>
                                <span className={styles.statLabel}>Startup</span>
                            </div>
                            <div className={styles.brandStat}>
                                <span className={styles.statValue}>150+</span>
                                <span className={styles.statLabel}>Yatırımcı</span>
                            </div>
                            <div className={styles.brandStat}>
                                <span className={styles.statValue}>₺12M+</span>
                                <span className={styles.statLabel}>Yatırım</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className={styles.formSide}>
                    <div className={styles.formContainer}>
                        <div className={styles.formHeader}>
                            <h2 className={styles.formTitle}>Hoş Geldiniz</h2>
                            <p className={styles.formSubtitle}>Hesabınıza giriş yapın</p>
                        </div>

                        {error && (
                            <div className={styles.error}>
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        {/* Social Login */}
                        <div className={styles.socialLogin}>
                            <button type="button" className={styles.socialBtn}>
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google ile devam et
                            </button>
                            <button type="button" className={styles.socialBtn}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook ile devam et
                            </button>
                        </div>

                        <div className={styles.divider}>
                            <span>veya</span>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>E-posta Adresi</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ornek@email.com"
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.labelRow}>
                                    <label>Şifre</label>
                                    <Link href="/forgot-password" className={styles.forgotLink}>
                                        Şifremi Unuttum
                                    </Link>
                                </div>
                                <div className={styles.passwordWrapper}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className={styles.input}
                                    />
                                    <button
                                        type="button"
                                        className={styles.togglePassword}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'Gizle' : 'Göster'}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className={styles.spinner}></span>
                                        Giriş yapılıyor...
                                    </>
                                ) : (
                                    'Giriş Yap'
                                )}
                            </button>
                        </form>

                        <div className={styles.footer}>
                            Hesabınız yok mu? <Link href="/register">Ücretsiz Kayıt Ol</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
