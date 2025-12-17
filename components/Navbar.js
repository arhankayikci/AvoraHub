"use client";

import Link from 'next/link';
import styles from './Navbar.module.css';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import UniversalSearch from './UniversalSearch';
import NotificationBell from './NotificationBell';
import { useState, useRef, useEffect } from 'react';

const profileTypeLabels = {
    'entrepreneur': 'Girişimci',
    'problem-owner': 'Problem Sahibi',
    'investor': 'Yatırımcı',
    'solution-seeker': 'Çözüm Arayan'
};

const Navbar = () => {
    const { locale, changeLocale, t } = useLanguage();
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                {/* Left: Logo */}
                <Link href="/" className={styles.logo}>

                    <span className={styles.logoText}>
                        <span className={styles.logoAvora}>AVORA</span>
                        <span className={styles.logoHub}>HUB</span>
                    </span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Menu"
                >
                    {mobileMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </button>

                {/* Center: Navigation - Dynamic based on userType */}
                <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
                    {!user && (
                        <>
                            <Link href="/problems" className={styles.link}>{t('common.problems')}</Link>
                            <Link href="/startups" className={styles.link}>{t('common.startups')}</Link>
                            <Link href="/mentors" className={styles.link}>Mentörler</Link>
                            <Link href="/events" className={styles.link}>Etkinlikler</Link>
                            <Link href="/news" className={styles.link}>Haberler</Link>
                            <Link href="/about" className={styles.link}>Hakkımızda</Link>
                            <Link href="/contact" className={styles.link}>İletişim</Link>
                        </>
                    )}

                    {user?.userType === 'entrepreneur' && (
                        <>
                            <Link href="/problems" className={styles.link}>{t('common.problems')}</Link>
                            <Link href="/startups" className={styles.link}>{t('common.startups')}</Link>
                            <Link href="/investors" className={styles.link}>Yatırımcılar</Link>
                            <Link href="/mentors" className={styles.link}>Mentörler</Link>
                            <Link href="/events" className={styles.link}>Etkinlikler</Link>
                            <Link href="/news" className={styles.link}>Haberler</Link>
                            <Link href="/about" className={styles.link}>Hakkımızda</Link>
                            <Link href="/contact" className={styles.link}>İletişim</Link>
                        </>
                    )}

                    {user?.userType === 'problem-owner' && (
                        <>
                            <Link href="/problems" className={styles.link}>Problemler</Link>
                            <Link href="/startups" className={styles.link}>Startup'lar</Link>
                            <Link href="/collections" className={styles.link}>Koleksiyonlar</Link>
                            <Link href="/news" className={styles.link}>Haberler</Link>
                            <Link href="/about" className={styles.link}>Hakkımızda</Link>
                            <Link href="/contact" className={styles.link}>İletişim</Link>
                        </>
                    )}

                    {user?.userType === 'investor' && (
                        <>
                            <Link href="/startups" className={styles.link}>Startup'lar</Link>
                            <Link href="/problems" className={styles.link}>Problemler</Link>
                            <Link href="/collections" className={styles.link}>Koleksiyonlar</Link>
                            <Link href="/news" className={styles.link}>Haberler</Link>
                            <Link href="/about" className={styles.link}>Hakkımızda</Link>
                            <Link href="/contact" className={styles.link}>İletişim</Link>
                        </>
                    )}

                    {user?.userType === 'solution-seeker' && (
                        <>
                            <Link href="/problems" className={styles.link}>Problemler</Link>
                            <Link href="/startups" className={styles.link}>Startup'lar</Link>
                            <Link href="/collections" className={styles.link}>Koleksiyonlar</Link>
                            <Link href="/news" className={styles.link}>Haberler</Link>
                            <Link href="/about" className={styles.link}>Hakkımızda</Link>
                            <Link href="/contact" className={styles.link}>İletişim</Link>
                        </>
                    )}
                </div>

                {/* Right: Actions */}
                <div className={styles.actions}>
                    {/* Universal Search */}
                    <div className={styles.searchContainer}>
                        <UniversalSearch placeholder="" />
                    </div>

                    {/* Notification Bell */}
                    <NotificationBell />

                    {/* User Menu with Dropdown */}
                    {user ? (
                        <div className={styles.userMenuWrapper} ref={dropdownRef}>
                            <button
                                className={styles.userMenuButton}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <div className={styles.avatar}>
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.name} />
                                    ) : (
                                        <span>{user.name.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>
                                <svg
                                    className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className={styles.dropdown}>
                                    <div className={styles.dropdownHeader}>
                                        <div className={styles.dropdownAvatar}>
                                            {user.avatar ? (
                                                <img src={user.avatar} alt={user.name} />
                                            ) : (
                                                <span>{user.name.charAt(0).toUpperCase()}</span>
                                            )}
                                        </div>
                                        <div className={styles.dropdownUserInfo}>
                                            <div className={styles.dropdownName}>{user.name}</div>
                                            <div className={styles.dropdownEmail}>{user.email}</div>
                                            <div className={styles.dropdownBadge}>
                                                {profileTypeLabels[user.userType] || user.userType}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.dropdownDivider}></div>

                                    <Link href="/profile" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        Profilim
                                    </Link>

                                    <Link href="/dashboard" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="3" width="7" height="7"></rect>
                                            <rect x="14" y="3" width="7" height="7"></rect>
                                            <rect x="14" y="14" width="7" height="7"></rect>
                                            <rect x="3" y="14" width="7" height="7"></rect>
                                        </svg>
                                        Dashboard
                                    </Link>

                                    <Link href="/messages" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                        Mesajlar
                                    </Link>

                                    <Link href="/dashboard/analytics" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 20V10M12 20V4M6 20v-6"></path>
                                        </svg>
                                        Analytics
                                    </Link>

                                    <Link href="/jobs" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                        </svg>
                                        Kariyer
                                    </Link>

                                    <Link href="/profile?tab=favorites" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                        </svg>
                                        Favoriler
                                    </Link>

                                    <Link href="/settings" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="3"></circle>
                                            <path d="M12 1v6m0 6v6m7.07-12.93l-4.24 4.24m0 5.66l4.24 4.24m-14.14 0l4.24-4.24m0-5.66L4.93 4.93"></path>
                                        </svg>
                                        Ayarlar
                                    </Link>

                                    {/* Admin Link - shown for admin users */}
                                    {['admin@avorahub.com', 'ayse@avorahub.com', 'arhankayikci@gmail.com'].includes(user.email) && (
                                        <>
                                            <div className={styles.dropdownDivider}></div>
                                            <Link href="/admin" className={`${styles.dropdownItem} ${styles.dropdownItemAdmin}`} onClick={() => setDropdownOpen(false)}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                                </svg>
                                                Admin Paneli
                                            </Link>
                                        </>
                                    )}

                                    <div className={styles.dropdownDivider}></div>

                                    <button onClick={logout} className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                            <polyline points="16 17 21 12 16 7"></polyline>
                                            <line x1="21" y1="12" x2="9" y2="12"></line>
                                        </svg>
                                        Çıkış Yap
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className={styles.loginBtn}>
                                Giriş Yap
                            </Link>
                            <Link href="/signup" className={`${styles.signupBtn} btn btn-primary`}>
                                Üye Ol
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
