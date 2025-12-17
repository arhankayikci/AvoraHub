'use client';

import { useState } from 'react';
import styles from './CategoryFilters.module.css';

const categories = [
    { id: 'all', label: 'All', icon: '🌍' },
    { id: 'tech', label: 'Technology', icon: '💻' },
    { id: 'health', label: 'Health', icon: '🏥' },
    { id: 'education', label: 'Education', icon: '📚' },
    { id: 'environment', label: 'Environment', icon: '🌱' },
    { id: 'transport', label: 'Transport', icon: '🚗' },
    { id: 'finance', label: 'Finance', icon: '💰' },
    { id: 'food', label: 'Food', icon: '🍔' }
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
