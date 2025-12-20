"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './UniversalSearch.module.css';

const mockResults = {
    problems: [
        { id: 1, title: 'Üniversite öğrencileri için uygun fiyatlı konaklama', category: 'Housing' },
        { id: 2, title: 'Yerel üreticiler için dijital pazar yeri', category: 'Agriculture' }
    ],
    startups: [
        { id: 1, name: 'TechVenture AI', description: 'AI-powered solutions' },
        { id: 2, name: 'GreenFuture', description: 'Sustainable energy platform' }
    ],
    investors: [
        { id: 1, name: 'Ahmet Yılmaz', type: 'Angel Investor' },
        { id: 2, name: 'Zeynep Capital', type: 'VC Fund' }
    ]
};

export default function UniversalSearch({ placeholder = 'Search problems, startups, investors...' }) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.length < 2) {
            return;
        }

        const timer = setTimeout(() => {
            // Mock search - filter results
            const filtered = {
                problems: mockResults.problems.filter(p =>
                    p.title.toLowerCase().includes(query.toLowerCase())
                ),
                startups: mockResults.startups.filter(s =>
                    s.name.toLowerCase().includes(query.toLowerCase())
                ),
                investors: mockResults.investors.filter(i =>
                    i.name.toLowerCase().includes(query.toLowerCase())
                )
            };
            setResults(filtered);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setIsOpen(false);
        }
    };

    const hasResults = results && (
        results.problems.length > 0 ||
        results.startups.length > 0 ||
        results.investors.length > 0
    );

    return (
        <div className={styles.searchContainer} ref={searchRef}>
            <form onSubmit={handleSubmit} className={styles.searchForm}>
                <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => {
                        const val = e.target.value;
                        setQuery(val);
                        if (val.length < 2) {
                            setResults(null);
                        } else {
                            setIsLoading(true);
                        }
                    }}
                    onFocus={() => setIsOpen(true)}
                />
                {query && (
                    <button
                        type="button"
                        className={styles.clearBtn}
                        onClick={() => setQuery('')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}
            </form>

            {isOpen && query.length >= 2 && (
                <div className={styles.dropdown}>
                    {isLoading ? (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            Searching...
                        </div>
                    ) : hasResults ? (
                        <>
                            {results.problems.length > 0 && (
                                <div className={styles.resultSection}>
                                    <div className={styles.sectionHeader}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                        </svg>
                                        Problems
                                    </div>
                                    {results.problems.map((problem) => (
                                        <a
                                            key={problem.id}
                                            href={`/problems/${problem.id}`}
                                            className={styles.resultItem}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <div className={styles.resultTitle}>{problem.title}</div>
                                            <div className={styles.resultMeta}>{problem.category}</div>
                                        </a>
                                    ))}
                                </div>
                            )}

                            {results.startups.length > 0 && (
                                <div className={styles.resultSection}>
                                    <div className={styles.sectionHeader}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                            <path d="M2 17l10 5 10-5"></path>
                                            <path d="M2 12l10 5 10-5"></path>
                                        </svg>
                                        Startups
                                    </div>
                                    {results.startups.map((startup) => (
                                        <a
                                            key={startup.id}
                                            href={`/startups/${startup.id}`}
                                            className={styles.resultItem}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <div className={styles.resultTitle}>{startup.name}</div>
                                            <div className={styles.resultMeta}>{startup.description}</div>
                                        </a>
                                    ))}
                                </div>
                            )}

                            {results.investors.length > 0 && (
                                <div className={styles.resultSection}>
                                    <div className={styles.sectionHeader}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="8.5" cy="7" r="4"></circle>
                                            <line x1="20" y1="8" x2="20" y2="14"></line>
                                            <line x1="23" y1="11" x2="17" y2="11"></line>
                                        </svg>
                                        Investors
                                    </div>
                                    {results.investors.map((investor) => (
                                        <a
                                            key={investor.id}
                                            href={`/investors/${investor.id}`}
                                            className={styles.resultItem}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <div className={styles.resultTitle}>{investor.name}</div>
                                            <div className={styles.resultMeta}>{investor.type}</div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={styles.noResults}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <p>No results found for &quot;{query}&quot;</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
