"use client";

import { useState, useEffect } from 'react';
import { getProblems, getProblemById, searchProblems } from '@/lib/services/problemService';

/**
 * Problemleri getir hook'u
 */
export function useProblems(options = {}) {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const data = await getProblems(options);
                setProblems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [JSON.stringify(options)]);

    return { problems, loading, error, refetch: () => { } };
}

/**
 * Tek problem getir hook'u
 */
export function useProblem(id) {
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (!id) return;
            try {
                setLoading(true);
                const data = await getProblemById(id);
                setProblem(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    return { problem, loading, error };
}

/**
 * Problem arama hook'u
 */
export function useProblemSearch(query) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function search() {
            if (!query || query.length < 2) {
                setResults([]);
                return;
            }
            setLoading(true);
            const data = await searchProblems(query);
            setResults(data);
            setLoading(false);
        }

        const timeoutId = setTimeout(search, 300); // Debounce
        return () => clearTimeout(timeoutId);
    }, [query]);

    return { results, loading };
}
