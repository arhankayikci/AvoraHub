"use client";

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import NotificationBell from './NotificationBell';
import styles from './MobileHeader.module.css';

export default function MobileHeader() {
    const { user, profile } = useAuth();

    return (
        <header className={styles.mobileHeader}>
            {/* Logo - Same as Desktop */}
            <Link href="/" className={styles.logo}>
                <span className={styles.logoAvora}>AVORA</span>
                <span className={styles.logoHub}>HUB</span>
            </Link>

            {/* Actions */}
            <div className={styles.actions}>
                {user ? (
                    <>
                        <NotificationBell />
                        <Link href="/profile" className={styles.avatarBtn}>
                            {profile?.avatar_url ? (
                                <img
                                    src={profile.avatar_url}
                                    alt={profile.full_name}
                                    className={styles.avatarImg}
                                />
                            ) : (
                                <span>{profile?.full_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}</span>
                            )}
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/login" className={styles.loginBtn}>
                            Giriş
                        </Link>
                        <Link href="/register" className={styles.signupBtn}>
                            Üye Ol
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
