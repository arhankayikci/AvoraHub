"use client";

import { useState, useEffect } from 'react';
import { getMentors, getMentorById } from '@/lib/services/mentorService';

/**
 * Mentorları getir hook'u
 */
export function useMentors(options = {}) {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const data = await getMentors(options);
                setMentors(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [JSON.stringify(options)]);

    return { mentors, loading, error };
}

/**
 * Tek mentor getir hook'u
 */
export function useMentor(id) {
    const [mentor, setMentor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (!id) return;
            try {
                setLoading(true);
                const data = await getMentorById(id);
                setMentor(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    return { mentor, loading, error };
}
