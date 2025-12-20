"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './events.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { filterItemsForGuests } from '@/utils/visibilityHelpers';

// Demo etkinlikler
const DEMO_EVENTS = [
    {
        id: 1,
        title: 'AvoraHub Demo Day 2024',
        description: '20 startup&apos;ın yatırımcılara sunum yapacağı büyük demo etkinliği. En iyi girişimler ödüllendirilecek.',
        date: '2024-12-20',
        time: '14:00',
        location: 'İstanbul Kongre Merkezi',
        type: 'Demo Day',
        isOnline: false,
        attendees: 342,
        image: null,
        featured: true,
        speakers: ['Ahmet Yılmaz - TechVC', 'Elif Demir - Seed Fund']
    },
    {
        id: 2,
        title: 'Yapay Zeka & Startup&apos;lar Webinar',
        description: 'AI teknolojilerini startup&apos;ınızda nasıl kullanabileceğinizi öğrenin.',
        date: '2024-12-22',
        time: '19:00',
        location: 'Online',
        type: 'Webinar',
        isOnline: true,
        attendees: 189,
        featured: true,
        speakers: ['Dr. Can Öztürk - AI Researcher']
    },
    {
        id: 3,
        title: 'Founder Networking Night',
        description: 'Girişimcilerin bir araya geldiği networking etkinliği. Yeni bağlantılar kurun.',
        date: '2024-12-25',
        time: '18:30',
        location: 'Kolektif House Levent',
        type: 'Networking',
        isOnline: false,
        attendees: 78,
        featured: false,
        speakers: []
    },
    {
        id: 4,
        title: 'Pitch Night: Fintech Edition',
        description: 'Fintech startup&apos;ları için özel pitch gecesi. Yatırımcı jüri değerlendirmesi.',
        date: '2024-12-28',
        time: '19:30',
        location: 'Workinton Nişantaşı',
        type: 'Pitch Night',
        isOnline: false,
        attendees: 156,
        featured: false,
        speakers: ['Murat Bey - Angel Investor', 'Selin A. - VC Partner']
    },
    {
        id: 5,
        title: 'Product Management Masterclass',
        description: 'Deneyimli PM&apos;lerden product management tekniklerini öğrenin.',
        date: '2025-01-05',
        time: '10:00',
        location: 'Online',
        type: 'Workshop',
        isOnline: true,
        attendees: 234,
        featured: false,
        speakers: ['Aslı K. - Product Lead']
    }
];

const EVENT_TYPES = ['Tümü', 'Demo Day', 'Webinar', 'Networking', 'Pitch Night', 'Workshop'];

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString('tr-TR', { month: 'short' });
    return { day, month };
}

function EventCard({ event }) {
    const { day, month } = formatDate(event.date);
    const isPast = new Date(event.date) < new Date();

    return (
        <Link href={`/events/${event.id}`} className={`${styles.eventCard} ${event.featured ? styles.featured : ''} ${isPast ? styles.past : ''}`}>
            {event.featured && <span className={styles.featuredBadge}>Öne Çıkan</span>}

            <div className={styles.dateBox}>
                <span className={styles.day}>{day}</span>
                <span className={styles.month}>{month}</span>
            </div>

            <div className={styles.eventContent}>
                <div className={styles.eventMeta}>
                    <span className={`${styles.typeBadge} ${styles[event.type.toLowerCase().replace(' ', '')]}`}>
                        {event.type}
                    </span>
                    {event.isOnline && <span className={styles.onlineBadge}>🌐 Online</span>}
                </div>

                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDesc}>{event.description}</p>

                <div className={styles.eventDetails}>
                    <span className={styles.time}>🕐 {event.time}</span>
                    <span className={styles.location}>📍 {event.location}</span>
                </div>

                {event.speakers.length > 0 && (
                    <div className={styles.speakers}>
                        <span className={styles.speakersLabel}>Konuşmacılar:</span>
                        {event.speakers.slice(0, 2).map((s, i) => (
                            <span key={i} className={styles.speaker}>{s}</span>
                        ))}
                    </div>
                )}

                <div className={styles.eventFooter}>
                    <span className={styles.attendees}>👥 {event.attendees} katılımcı</span>
                    <span className={styles.joinBtn}>{isPast ? 'Kaydı İzle' : 'Katıl →'}</span>
                </div>
            </div>
        </Link>
    );
}

export default function EventsPage() {
    const [selectedType, setSelectedType] = useState('Tümü');
    const [showPast, setShowPast] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const now = new Date();
    const filteredEvents = DEMO_EVENTS.filter(event => {
        const matchesType = selectedType === 'Tümü' || event.type === selectedType;
        const isPast = new Date(event.date) < now;
        const matchesTime = showPast ? isPast : !isPast;
        return matchesType && matchesTime;
    });

    // Apply rotating visibility for guests
    const { displayedItems: visibleEvents } = filterItemsForGuests(
        filteredEvents,
        !!user,
        3 // minimum events
    );

    const handleCreateEvent = () => {
        if (!user) {
            router.push('/login?next=/events/new');
        } else {
            router.push('/events/new');
        }
    };

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Hero */}
                <div className={styles.hero}>
                    <h1 className={styles.title}>🎪 Etkinlikler</h1>
                    <p className={styles.subtitle}>
                        Demo day&apos;ler, webinar&apos;lar, networking ve daha fazlası
                    </p>
                </div>

                {/* Tabs */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${!showPast ? styles.active : ''}`}
                        onClick={() => setShowPast(false)}
                    >
                        📅 Yaklaşan Etkinlikler
                    </button>
                    <button
                        className={`${styles.tab} ${showPast ? styles.active : ''}`}
                        onClick={() => setShowPast(true)}
                    >
                        🕐 Geçmiş Etkinlikler
                    </button>
                </div>

                {/* Filters */}
                <div className={styles.filters}>
                    {EVENT_TYPES.map(type => (
                        <button
                            key={type}
                            className={`${styles.filterBtn} ${selectedType === type ? styles.active : ''}`}
                            onClick={() => setSelectedType(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* Events List */}
                <div className={styles.eventsList}>
                    {visibleEvents.length > 0 ? (
                        visibleEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            <span className={styles.emptyIcon}>📭</span>
                            <h3>Etkinlik bulunamadı</h3>
                            <p>Bu kategoride henüz etkinlik yok.</p>
                        </div>
                    )}
                </div>

                {/* Create Event CTA */}
                <div className={styles.cta}>
                    <div className={styles.ctaContent}>
                        <h3>Bir etkinlik mi düzenliyorsunuz?</h3>
                        <p>Etkinliğinizi AvoraHub&apos;da paylaşın ve startup ekosistemine ulaşın</p>
                    </div>
                    <button onClick={handleCreateEvent} className={styles.ctaBtn}>
                        + Etkinlik Oluştur
                    </button>
                </div>
            </div>
        </div>
    );
}
