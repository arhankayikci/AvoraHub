"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import SkillsTagInput from '@/components/SkillsTagInput';
import styles from './settings.module.css';

export default function SettingsPage() {
    const router = useRouter();
    const { user, profile, loading, refreshProfile } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [settings, setSettings] = useState({
        // Profile
        full_name: '',
        email: '',
        bio: '',
        website: '',
        linkedin: '',
        twitter: '',
        skills: [],
        // Notifications
        emailNotifications: true,
        pushNotifications: true,
        weeklyDigest: true,
        mentionNotifications: true,
        // Privacy
        profilePublic: true,
        showEmail: false,
        showActivity: true,
        // Appearance
        theme: 'light',
        language: 'tr'
    });

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    // Load profile data into form
    useEffect(() => {
        if (profile) {
            setSettings(prev => ({
                ...prev,
                full_name: profile.full_name || '',
                email: user?.email || '',
                bio: profile.bio || '',
                website: profile.website || '',
                linkedin: profile.linkedin || '',
                twitter: profile.twitter || '',
                skills: profile.skills || [],
                profilePublic: profile.is_public !== false,
                showEmail: profile.show_email || false,
            }));
        }
    }, [profile, user]);

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        if (!user) return;

        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: settings.full_name,
                    bio: settings.bio,
                    website: settings.website,
                    linkedin: settings.linkedin,
                    twitter: settings.twitter,
                    skills: settings.skills,
                    is_public: settings.profilePublic,
                    show_email: settings.showEmail,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            if (error) throw error;

            // Refresh profile in context - this updates Navbar instantly
            await refreshProfile();

            setMessage({ type: 'success', text: 'Ayarlar başarıyla kaydedildi!' });
        } catch (error) {
            console.error('Settings save error:', error);
            setMessage({ type: 'error', text: 'Kaydetme sırasında bir hata oluştu.' });
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profil', icon: '👤' },
        { id: 'notifications', label: 'Bildirimler', icon: '🔔' },
        { id: 'privacy', label: 'Gizlilik', icon: '🔒' },
        { id: 'appearance', label: 'Görünüm', icon: '🎨' },
    ];

    if (loading) {
        return (
            <div className={styles.page}>
                <div className="container">
                    <div className={styles.loading}>Yükleniyor...</div>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className={styles.page}>
            <div className="container">
                <h1 className={styles.title}>⚙️ Ayarlar</h1>

                {message.text && (
                    <div className={`${styles.message} ${styles[message.type]}`}>
                        {message.type === 'success' ? '✓' : '⚠️'} {message.text}
                    </div>
                )}

                <div className={styles.layout}>
                    {/* Tabs */}
                    <div className={styles.sidebar}>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className={styles.content}>
                        {activeTab === 'profile' && (
                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>Profil Bilgileri</h2>
                                <div className={styles.formGroup}>
                                    <label>İsim</label>
                                    <input
                                        type="text"
                                        value={settings.full_name}
                                        onChange={(e) => handleChange('full_name', e.target.value)}
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>E-posta</label>
                                    <input
                                        type="email"
                                        value={settings.email}
                                        disabled
                                        className={`${styles.input} ${styles.disabled}`}
                                    />
                                    <small className={styles.hint}>E-posta değişikliği için destek ekibiyle iletişime geçin.</small>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Biyografi</label>
                                    <textarea
                                        value={settings.bio}
                                        onChange={(e) => handleChange('bio', e.target.value)}
                                        className={styles.textarea}
                                        rows={3}
                                        placeholder="Kendinizi tanıtın..."
                                    />
                                </div>
                                <h3 className={styles.subTitle}>Sosyal Bağlantılar</h3>
                                <div className={styles.formGroup}>
                                    <label>Website</label>
                                    <input
                                        type="url"
                                        value={settings.website}
                                        onChange={(e) => handleChange('website', e.target.value)}
                                        className={styles.input}
                                        placeholder="https://"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>LinkedIn</label>
                                    <input
                                        type="text"
                                        value={settings.linkedin}
                                        onChange={(e) => handleChange('linkedin', e.target.value)}
                                        className={styles.input}
                                        placeholder="linkedin.com/in/username"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Twitter</label>
                                    <input
                                        type="text"
                                        value={settings.twitter}
                                        onChange={(e) => handleChange('twitter', e.target.value)}
                                        className={styles.input}
                                        placeholder="@username"
                                    />
                                </div>
                                <h3 className={styles.subTitle}>Yetenekler</h3>
                                <div className={styles.formGroup}>
                                    <label>Yetenekleriniz</label>
                                    <SkillsTagInput
                                        value={settings.skills}
                                        onChange={(skills) => handleChange('skills', skills)}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>Bildirim Tercihleri</h2>
                                <div className={styles.toggle}>
                                    <div className={styles.toggleInfo}>
                                        <h4>E-posta Bildirimleri</h4>
                                        <p>Önemli güncellemeleri e-posta ile al</p>
                                    </div>
                                    <button
                                        className={`${styles.toggleBtn} ${settings.emailNotifications ? styles.on : ''}`}
                                        onClick={() => handleChange('emailNotifications', !settings.emailNotifications)}
                                    >
                                        <span className={styles.toggleKnob}></span>
                                    </button>
                                </div>
                                <div className={styles.toggle}>
                                    <div className={styles.toggleInfo}>
                                        <h4>Push Bildirimleri</h4>
                                        <p>Tarayıcı bildirimleri al</p>
                                    </div>
                                    <button
                                        className={`${styles.toggleBtn} ${settings.pushNotifications ? styles.on : ''}`}
                                        onClick={() => handleChange('pushNotifications', !settings.pushNotifications)}
                                    >
                                        <span className={styles.toggleKnob}></span>
                                    </button>
                                </div>
                                <div className={styles.toggle}>
                                    <div className={styles.toggleInfo}>
                                        <h4>Haftalık Özet</h4>
                                        <p>Her hafta platform özetini al</p>
                                    </div>
                                    <button
                                        className={`${styles.toggleBtn} ${settings.weeklyDigest ? styles.on : ''}`}
                                        onClick={() => handleChange('weeklyDigest', !settings.weeklyDigest)}
                                    >
                                        <span className={styles.toggleKnob}></span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'privacy' && (
                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>Gizlilik Ayarları</h2>
                                <div className={styles.toggle}>
                                    <div className={styles.toggleInfo}>
                                        <h4>Herkese Açık Profil</h4>
                                        <p>Profilinizi herkes görebilir</p>
                                    </div>
                                    <button
                                        className={`${styles.toggleBtn} ${settings.profilePublic ? styles.on : ''}`}
                                        onClick={() => handleChange('profilePublic', !settings.profilePublic)}
                                    >
                                        <span className={styles.toggleKnob}></span>
                                    </button>
                                </div>
                                <div className={styles.toggle}>
                                    <div className={styles.toggleInfo}>
                                        <h4>E-posta Göster</h4>
                                        <p>E-posta adresiniz profilnizde görünsün</p>
                                    </div>
                                    <button
                                        className={`${styles.toggleBtn} ${settings.showEmail ? styles.on : ''}`}
                                        onClick={() => handleChange('showEmail', !settings.showEmail)}
                                    >
                                        <span className={styles.toggleKnob}></span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'appearance' && (
                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>Görünüm</h2>
                                <div className={styles.formGroup}>
                                    <label>Tema</label>
                                    <select
                                        value={settings.theme}
                                        onChange={(e) => handleChange('theme', e.target.value)}
                                        className={styles.select}
                                    >
                                        <option value="light">Açık</option>
                                        <option value="dark">Koyu</option>
                                        <option value="system">Sistem</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Dil</label>
                                    <select
                                        value={settings.language}
                                        onChange={(e) => handleChange('language', e.target.value)}
                                        className={styles.select}
                                    >
                                        <option value="tr">Türkçe</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className={styles.saveBar}>
                            <button
                                className={styles.saveBtn}
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
