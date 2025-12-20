"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './MobileNav.module.css';

const NAV_ITEMS = [
    { href: '/', icon: 'home', label: 'Ana Sayfa' },
    { href: '/problems', icon: 'lightbulb', label: 'Problemler' },
    { href: '/startups', icon: 'rocket_launch', label: 'Startuplar' },
    { href: '/mentors', icon: 'school', label: 'Mentörler' },
];

export default function MobileNav() {
    const pathname = usePathname();

    const isActive = (href) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <nav className={styles.mobileNav}>
            <div className={styles.navContainer}>
                {NAV_ITEMS.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${active ? styles.active : ''}`}
                        >
                            <span className="material-icons-round">{item.icon}</span>
                            <span className={styles.label}>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
