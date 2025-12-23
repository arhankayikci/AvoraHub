"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Redirect from /events/new to /events/create
export default function EventsNewRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/events/create');
    }, [router]);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            color: '#666'
        }}>
            <p>Yönlendiriliyor...</p>
        </div>
    );
}
