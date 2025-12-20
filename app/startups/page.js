"use client";

import { useState, useEffect } from 'react';
import styles from './startups.module.css';
import StartupCard from '@/components/StartupCard';
import CategoryBar from '@/components/CategoryBar';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/contexts/AuthContext';
import FreemiumGate from '@/components/FreemiumGate';
import { filterItemsForGuests } from '@/utils/visibilityHelpers';

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

const stages = ["Pre-Seed", "Seed", "Series A", "Series B", "Growth"];

function FreemiumStartupsWrapper({ startups, countries }) {
    const { user } = useAuth();
    const { displayedItems } = filterItemsForGuests(startups, !!user, 3);

    return (
        <FreemiumGate
            isAuthenticated={!!user}
            items={startups}
            listType="startup"
        >
            <div className={styles.grid}>
                {displayedItems.map(startup => {
                    const countryObj = countries.find(c => c.code === startup.country);
                    return (
                        <StartupCard
                            key={startup.id}
                            {...startup}
                            countryCode={startup.country}
                            countryName={countryObj ? countryObj.name : startup.country}
                        />
                    );
                })}
            </div>
        </FreemiumGate>
    );
}

export default function StartupsPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedCountry, setSelectedCountry] = useState('all');
    const [selectedStage, setSelectedStage] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('popular');

    // Data State
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Data
    useEffect(() => {
        const fetchStartups = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (activeCategory !== 'all') params.append('category', activeCategory);
                if (selectedCountry !== 'all') params.append('country', selectedCountry);
                if (selectedStage !== 'all') params.append('stage', selectedStage);
                if (searchQuery) params.append('search', searchQuery);
                if (sortBy) params.append('sort', sortBy);

                const res = await fetch(`/api/startups?${params.toString()}`);
                if (!res.ok) throw new Error('Failed to fetch startups');
                const data = await res.json();
                setStartups(data);
            } catch (err) {
                console.error(err);
                setError('Startuplar yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchStartups();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [activeCategory, selectedCountry, selectedStage, searchQuery, sortBy]);

    const clearFilters = () => {
        setActiveCategory('all');
        setSelectedCountry('all');
        setSelectedStage('all');
        setSearchQuery('');
        setSortBy('popular');
    };

    const hasActiveFilters = activeCategory !== 'all' || selectedCountry !== 'all' || selectedStage !== 'all' || searchQuery !== '';

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className={styles.badge}>
                            <span className={styles.badgeDot}></span>
                            Geleceği İnşa Edenler
                        </div>
                        <h1 className={styles.title}>Girişimleri Keşfet</h1>
                        <p className={styles.subtitle}>
                            Global problemleri çözen en yenilikçi startup&apos;ları incele,
                            yatırım yap veya ekibe katıl.
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
                                placeholder="Startup ara..."
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

                        {/* Stage Filter */}
                        <select
                            className={styles.filterSelect}
                            value={selectedStage}
                            onChange={(e) => setSelectedStage(e.target.value)}
                        >
                            <option value="all">Tüm Aşamalar</option>
                            {stages.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>

                        {/* Sort Filter */}
                        <select
                            className={styles.filterSelect}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="popular">En Popüler</option>
                            <option value="newest">En Yeniler</option>
                            <option value="funding">En Çok Fonlanan</option>
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
                            <strong>{startups.length}</strong> startup bulundu
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
                            {selectedStage !== 'all' && (
                                <span className={styles.activeFilter}>{selectedStage} ✕</span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Startups Grid */}
            <section className={styles.startupsSection}>
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
                    ) : startups.length > 0 ? (
                        <FreemiumStartupsWrapper startups={startups} countries={countries} />
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <h3>Henüz Startup Eklenmemiş</h3>
                            <p>
                                {hasActiveFilters
                                    ? 'Aradığınız kriterlere uygun startup bulunamadı.'
                                    : 'Toplulukta henüz paylaşılmış startup yok. İlk startup\'ı sen ekle!'
                                }
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                                {hasActiveFilters ? (
                                    <button className={styles.clearFilters} onClick={clearFilters}>
                                        Filtreleri Temizle
                                    </button>
                                ) : (
                                    <>
                                        <Link href="/startups/new" className="btn btn-primary">
                                            Startup Ekle
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
