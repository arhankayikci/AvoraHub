"use client";

import styles from './CategoryBar.module.css';

const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'technology', label: 'Teknoloji' },
    { id: 'health', label: 'Sağlık' },
    { id: 'education', label: 'Eğitim' },
    { id: 'environment', label: 'Çevre' },
    { id: 'transport', label: 'Ulaşım' },
    { id: 'finance', label: 'Finans' },
    { id: 'food', label: 'Gıda' },
    { id: 'energy', label: 'Enerji' },
    { id: 'retail', label: 'Perakende' },
    { id: 'logistics', label: 'Lojistik' },
    { id: 'ai', label: 'Yapay Zeka' },
    { id: 'other', label: 'Diğer' }
];

const CategoryBar = ({ activeCategory = 'all', onCategoryChange }) => {
    return (
        <div className={styles.categoryBarWrapper}>
            <div className={`container ${styles.container}`}>
                <div className={styles.categories}>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`${styles.categoryBtn} ${activeCategory === category.id ? styles.active : ''}`}
                            onClick={() => onCategoryChange?.(category.id)}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryBar;
