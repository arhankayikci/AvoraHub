"use client";

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import styles from './mentor-detail.module.css';

export default function MentorGatedContent({ mentor, mentorId }) {
    const { user, loading } = useAuth();

    // Show gated content while loading to prevent flash
    if (loading) {
        return <GatedView mentor={mentor} mentorId={mentorId} />;
    }

    // Authenticated user sees full content
    if (user) {
        return (
            <p className={styles.fullBio}>{mentor.bio}</p>
        );
    }

    // Guest user sees gated view
    return <GatedView mentor={mentor} mentorId={mentorId} />;
}

// Client component for the booking card
export function MentorBookingCard({ mentor }) {
    const { user, loading } = useAuth();

    const handleBookingClick = () => {
        // If mentor has a calendly URL, open it directly
        if (mentor.calendly_url) {
            window.open(mentor.calendly_url, '_blank');
        } else {
            // Otherwise open email with booking request
            const subject = encodeURIComponent(`Görüşme Talebi: ${mentor.name || 'Mentor'}`);
            const body = encodeURIComponent(`Merhaba,\n\n${mentor.name} ile bir görüşme talebinde bulunmak istiyorum.\n\nTeşekkürler.`);
            window.location.href = `mailto:contact@avorahub.com.tr?subject=${subject}&body=${body}`;
        }
    };

    if (loading) return null; // Or skeleton

    if (user) {
        return (
            <>
                <p className={styles.priceInfo}>Seans başı: {mentor.ticket_size || 'İletişime geçin'}</p>
                <button className={styles.bookBtn} onClick={handleBookingClick}>
                    Takvimi Görüntüle →
                </button>
            </>
        );
    }

    return (
        <div className={styles.bookingLocked}>
            <p>Randevu bilgilerini görmek için giriş yapmalısınız.</p>
            <Link href="/login" className={styles.bookBtnLocked}>Giriş Yap</Link>
        </div>
    );
}

// Gated View Component
function GatedView({ mentor, mentorId }) {
    const teaserBio = mentor.bio?.substring(0, 300) || '';
    const hasMoreBio = mentor.bio?.length > 300;

    return (
        <div className={styles.gatedBio}>
            <p>{teaserBio}{hasMoreBio && '...'}</p>
            <div className={styles.fadeOverlay}></div>

            <div className={styles.loginWall}>
                <div className={styles.loginWallIcon}>🔒</div>
                <h3>Tam biyografiyi ve detayları görün</h3>
                <p>Mentörün tüm deneyimini ve iletişim bilgilerini görmek için üye olun.</p>
                <div className={styles.loginWallButtons}>
                    <Link href={`/login?redirect=/mentors/${mentorId}`} className={styles.loginButton}>
                        Giriş Yap
                    </Link>
                    <Link href={`/register?redirect=/mentors/${mentorId}`} className={styles.registerButton}>
                        Üye Ol
                    </Link>
                </div>
            </div>
        </div>
    );
}
