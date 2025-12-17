"use client";

import { useState, useEffect } from 'react';
import { getStartups, getStartupById, searchStartups } from '@/lib/services/startupService';

/**
 * Startup'ları getir hook'u
 */
export function useStartups(options = {}) {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const data = await getStartups(options);
                setStartups(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [JSON.stringify(options)]);

    return { startups, loading, error };
}

/**
 * Tek startup getir hook'u
 */
export function useStartup(id) {
    const [startup, setStartup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (!id) return;
            try {
                setLoading(true);
                const data = await getStartupById(id);
                setStartup(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    return { startup, loading, error };
}

/**
 * Startup arama hook'u
 */
export function useStartupSearch(query) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function search() {
            if (!query || query.length < 2) {
                setResults([]);
                return;
            }
            setLoading(true);
            const data = await searchStartups(query);
            setResults(data);
            setLoading(false);
        }

        const timeoutId = setTimeout(search, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    return { results, loading };
}
