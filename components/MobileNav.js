"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './MobileNav.module.css';

const NAV_ITEMS = [
    { href: '/', icon: '🏠', label: 'Ana Sayfa' },
    { href: '/problems', icon: '💡', label: 'Problemler' },
    { href: '/startups', icon: '🚀', label: 'Startuplar' },
    { href: '/mentors', icon: '🎓', label: 'Mentörler' },
    { href: '/messages', icon: '💬', label: 'Mesajlar' },
];

export default function MobileNav() {
    const pathname = usePathname();

    const isActive = (href) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <nav className={styles.mobileNav}>
            {NAV_ITEMS.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.navItem} ${isActive(item.href) ? styles.active : ''}`}
                >
                    <span className={styles.icon}>{item.icon}</span>
                    <span className={styles.label}>{item.label}</span>
                </Link>
            ))}
        </nav>
    );
}
