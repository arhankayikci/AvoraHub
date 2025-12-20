'use client';

import { useState } from 'react';
import styles from './CategoryFilters.module.css';

const categories = [
    { id: 'all', label: 'Tümü', icon: '🌍' },
    { id: 'tech', label: 'Teknoloji', icon: '💻' },
    { id: 'health', label: 'Sağlık', icon: '🏥' },
    { id: 'education', label: 'Eğitim', icon: '📚' },
    { id: 'environment', label: 'Çevre', icon: '🌱' },
    { id: 'transport', label: 'Ulaşım', icon: '🚗' },
    { id: 'finance', label: 'Finans', icon: '💰' },
    { id: 'food', label: 'Gıda', icon: '🍔' }
];

export default function CategoryFilters() {
    const [active, setActive] = useState('all');

    return (
        <div className={styles.filterBar}>
            <div className={styles.filters}>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={`${styles.chip} ${active === category.id ? styles.active : ''}`}
                        onClick={() => setActive(category.id)}
                    >
                        <span className={styles.icon}>{category.icon}</span>
                        <span className={styles.label}>{category.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
