"use client";

import { useState, useEffect } from 'react';
import styles from './problems.module.css';
import ProblemCard from '@/components/ProblemCard';
import CategoryBar from '@/components/CategoryBar';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';

const countries = [
    { code: "TR", name: "Türkiye" },
    { code: "US", name: "Amerika" },
    { code: "GB", name: "İngiltere" },
    { code: "DE", name: "Almanya" },
    { code: "FR", name: "Fransa" },
    { code: "BR", name: "Brezilya" },
    { code: "IN", name: "Hindistan" },
    { code: "ID", name: "Endonezya" },
    { code: "MX", name: "Meksika" },
    { code: "NG", name: "Nijerya" }
];

export default function ProblemsPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedCountry, setSelectedCountry] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('trending');

    // Data State
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Data
    useEffect(() => {
        const fetchProblems = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (activeCategory !== 'all') params.append('category', activeCategory);
                if (selectedCountry !== 'all') params.append('country', selectedCountry);
                if (searchQuery) params.append('search', searchQuery);
                if (sortBy) params.append('sort', sortBy);

                const res = await fetch(`/api/problems?${params.toString()}`);
                if (!res.ok) throw new Error('Failed to fetch problems');
                const data = await res.json();
                setProblems(data);
            } catch (err) {
                console.error(err);
                setError('Problemler yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        // Debounce search
        const timeoutId = setTimeout(() => {
            fetchProblems();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [activeCategory, selectedCountry, searchQuery, sortBy]);

    const clearFilters = () => {
        setActiveCategory('all');
        setSelectedCountry('all');
        setSearchQuery('');
        setSortBy('trending');
    };

    const hasActiveFilters = activeCategory !== 'all' || selectedCountry !== 'all' || searchQuery !== '';

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className={styles.badge}>
                            <span className={styles.badgeDot}></span>
                            Topluluk Odaklı Çözümler
                        </div>
                        <h1 className={styles.title}>Problemleri Keşfet</h1>
                        <p className={styles.subtitle}>
                            Dünyanın dört bir yanından paylaşılan gerçek problemleri incele,
                            çözüm üret veya var olan çözümlere katkıda bulun.
                        </p>
                    </div>
                </div>
            </section>

            {/* Category Bar */}
            <CategoryBar
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            {/* Controls Section */}
            <section className={styles.controlsSection}>
                <div className="container">
                    <div className={styles.controlsBar}>
                        {/* Search */}
                        <div className={styles.searchBox}>
                            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Problem ara..."
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button className={styles.clearSearch} onClick={() => setSearchQuery('')}>
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Country Filter */}
                        <select
                            className={styles.filterSelect}
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                        >
                            <option value="all">Tüm Ülkeler</option>
                            {countries.map(c => (
                                <option key={c.code} value={c.code}>{c.name}</option>
                            ))}
                        </select>

                        {/* Sort Filter */}
                        <select
                            className={styles.filterSelect}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="trending">Trend Olanlar</option>
                            <option value="newest">En Yeniler</option>
                            <option value="votes">En Çok Oylanan</option>
                            <option value="discussed">En Çok Tartışılan</option>
                        </select>

                        {/* Clear Button */}
                        {hasActiveFilters && (
                            <button className={styles.clearFilters} onClick={clearFilters}>
                                Filtreleri Temizle
                            </button>
                        )}
                    </div>

                    {/* Results Info */}
                    <div className={styles.resultsInfo}>
                        <span className={styles.resultCount}>
                            <strong>{problems.length}</strong> problem bulundu
                        </span>
                        <div className={styles.filterInfo}>
                            {activeCategory !== 'all' && (
                                <span className={styles.activeFilter}>{activeCategory} ✕</span>
                            )}
                            {selectedCountry !== 'all' && (
                                <span className={styles.activeFilter}>
                                    {countries.find(c => c.code === selectedCountry)?.name} ✕
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Problems Grid */}
            <section className={styles.problemsSection}>
                <div className="container">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <LoadingSpinner />
                        </div>
                    ) : error ? (
                        <div className={styles.emptyState}>
                            <h3>Hata Oluştu</h3>
                            <p>{error}</p>
                        </div>
                    ) : problems.length > 0 ? (
                        <div className={styles.grid}>
                            {problems.map(problem => (
                                <ProblemCard key={problem.id} {...problem} countryCode={problem.country} />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                </svg>
                            </div>
                            <h3>Henüz Problem Eklenmemiş</h3>
                            <p>
                                {hasActiveFilters
                                    ? 'Aradığınız kriterlere uygun problem bulunamadı.'
                                    : 'Toplulukta henüz paylaşılmış problem yok. İlk problemi sen ekle!'
                                }
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                                {hasActiveFilters ? (
                                    <button className={styles.clearFilters} onClick={clearFilters}>
                                        Filtreleri Temizle
                                    </button>
                                ) : (
                                    <>
                                        <Link href="/problems/new" className="btn btn-primary">
                                            Problem Ekle
                                        </Link>
                                        <button
                                            className="btn btn-outline"
                                            onClick={async () => {
                                                try {
                                                    const res = await fetch('/api/demo/load', { method: 'POST' });
                                                    const data = await res.json();
                                                    if (data.success) {
                                                        alert('Demo veriler yüklendi!');
                                                        window.location.reload();
                                                    }
                                                } catch (err) {
                                                    alert('Hata oluştu');
                                                }
                                            }}
                                        >
                                            📊 Demo Veri Yükle
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
