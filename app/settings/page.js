"use client";

import { useState } from 'react';
import styles from './settings.module.css';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [settings, setSettings] = useState({
        // Profile
        name: 'Demo Kullanıcı',
        email: 'demo@avorahub.com',
        bio: 'Girişimci ve teknoloji meraklısı.',
        website: '',
        linkedin: '',
        twitter: '',
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

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const tabs = [
        { id: 'profile', label: 'Profil', icon: '👤' },
        { id: 'notifications', label: 'Bildirimler', icon: '🔔' },
        { id: 'privacy', label: 'Gizlilik', icon: '🔒' },
        { id: 'appearance', label: 'Görünüm', icon: '🎨' },
    ];

    return (
        <div className={styles.page}>
            <div className="container">
                <h1 className={styles.title}>⚙️ Ayarlar</h1>

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
                                        value={settings.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>E-posta</label>
                                    <input
                                        type="email"
                                        value={settings.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Biyografi</label>
                                    <textarea
                                        value={settings.bio}
                                        onChange={(e) => handleChange('bio', e.target.value)}
                                        className={styles.textarea}
                                        rows={3}
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
                            <button className={styles.saveBtn}>Değişiklikleri Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
