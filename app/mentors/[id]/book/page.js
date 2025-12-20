"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './book.module.css';

// Demo mentor data
const DEMO_MENTORS = {
    1: {
        id: 1,
        name: 'Ahmet Yılmaz',
        title: 'Founder & CEO',
        company: 'TechVentures',
        avatar: 'AY',
        rating: 4.9,
        reviews: 24,
        sessions: 156,
        experience: '15+ yıl',
        bio: '3 başarılı exit yapmış seri girişimci. Fundraising, product strategy ve team building konularında uzmanlık.',
    },
    2: {
        id: 2,
        name: 'Dr. Elif Demir',
        title: 'Partner',
        company: 'Seed Capital VC',
        avatar: 'ED',
        rating: 4.8,
        reviews: 18,
        sessions: 89,
        experience: '12+ yıl',
        bio: 'VC partneri olarak 50+ şirkete yatırım yaptı. Due diligence ve board management konularında uzman.',
    },
};

const SESSION_TYPES = [
    { id: 'quick', name: 'Hızlı Danışma', duration: '15 dakika', price: 'Ücretsiz', icon: '⚡' },
    { id: 'standard', name: 'Standart Seans', duration: '30 dakika', price: '₺250', icon: '💬' },
    { id: 'deep', name: 'Derinlemesine', duration: '60 dakika', price: '₺450', icon: '🎯' },
];

const WEEK_DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

const TIME_SLOTS = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

// Generate calendar days for current month
function generateCalendarDays(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = (firstDay.getDay() + 6) % 7; // Adjust for Monday start

    const days = [];

    // Empty days before the first day of month
    for (let i = 0; i < startingDay; i++) {
        days.push({ day: null, empty: true });
    }

    // Days of the month
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isToday = date.toDateString() === today.toDateString();
        const hasSlots = !isPast && Math.random() > 0.3; // Random slots for demo

        days.push({
            day: i,
            date,
            disabled: isPast,
            today: isToday,
            hasSlots,
        });
    }

    return days;
}

export default function BookingPage() {
    const params = useParams();
    const mentorId = params.id;
    const mentor = DEMO_MENTORS[mentorId] || DEMO_MENTORS[1];

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedType, setSelectedType] = useState(SESSION_TYPES[1]);
    const [notes, setNotes] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const calendarDays = generateCalendarDays(year, month);

    const monthNames = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleBook = () => {
        setShowSuccess(true);
    };

    const isFormValid = selectedDate && selectedSlot && selectedType;

    // Random available slots for demo
    // Random available slots for demo
    const [availableSlots] = useState(() => TIME_SLOTS.filter(() => Math.random() > 0.3));

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Header */}
                <div className={styles.header}>
                    <Link href={`/mentors/${mentorId}`} className={styles.backLink}>
                        ← Geri dön
                    </Link>
                    <h1 className={styles.title}>📅 Randevu Al</h1>
                    <p className={styles.subtitle}>{mentor.name} ile görüşme planla</p>
                </div>

                <div className={styles.bookingContainer}>
                    {/* Calendar Section */}
                    <div className={styles.calendarSection}>
                        {/* Calendar */}
                        <div className={styles.calendar}>
                            <h3 className={styles.sectionTitle}>📆 Tarih Seçin</h3>
                            <div className={styles.calendarHeader}>
                                <div className={styles.monthNav}>
                                    <button className={styles.navBtn} onClick={handlePrevMonth}>
                                        ‹
                                    </button>
                                    <span className={styles.monthLabel}>
                                        {monthNames[month]} {year}
                                    </span>
                                    <button className={styles.navBtn} onClick={handleNextMonth}>
                                        ›
                                    </button>
                                </div>
                            </div>

                            <div className={styles.weekDays}>
                                {WEEK_DAYS.map(day => (
                                    <div key={day} className={styles.weekDay}>{day}</div>
                                ))}
                            </div>

                            <div className={styles.days}>
                                {calendarDays.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`
                                            ${styles.day}
                                            ${item.empty ? styles.empty : ''}
                                            ${item.disabled ? styles.disabled : ''}
                                            ${item.today ? styles.today : ''}
                                            ${selectedDate?.getTime() === item.date?.getTime() ? styles.selected : ''}
                                        `}
                                        onClick={() => !item.disabled && !item.empty && setSelectedDate(item.date)}
                                    >
                                        {item.day}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Time Slots */}
                        {selectedDate && (
                            <div className={styles.timeSlots}>
                                <h3 className={styles.sectionTitle}>🕐 Saat Seçin</h3>
                                <div className={styles.slotsGrid}>
                                    {TIME_SLOTS.map(slot => {
                                        const isAvailable = availableSlots.includes(slot);
                                        return (
                                            <div
                                                key={slot}
                                                className={`
                                                    ${styles.slot}
                                                    ${!isAvailable ? styles.disabled : ''}
                                                    ${selectedSlot === slot ? styles.selected : ''}
                                                `}
                                                onClick={() => isAvailable && setSelectedSlot(slot)}
                                            >
                                                <span className={styles.slotTime}>{slot}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Session Type */}
                        <div className={styles.sessionType}>
                            <h3 className={styles.sectionTitle}>⏱️ Seans Tipi</h3>
                            <div className={styles.typeOptions}>
                                {SESSION_TYPES.map(type => (
                                    <div
                                        key={type.id}
                                        className={`${styles.typeOption} ${selectedType.id === type.id ? styles.selected : ''}`}
                                        onClick={() => setSelectedType(type)}
                                    >
                                        <div className={styles.typeInfo}>
                                            <span className={styles.typeIcon}>{type.icon}</span>
                                            <div>
                                                <div className={styles.typeName}>{type.name}</div>
                                                <div className={styles.typeDuration}>{type.duration}</div>
                                            </div>
                                        </div>
                                        <span className={`${styles.typePrice} ${type.price === 'Ücretsiz' ? styles.free : ''}`}>
                                            {type.price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Notes */}
                        <div className={styles.notesSection}>
                            <h3 className={styles.sectionTitle}>📝 Notlar (İsteğe bağlı)</h3>
                            <textarea
                                className={styles.notesInput}
                                placeholder="Görüşmede konuşmak istediğiniz konuları belirtin..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Mentor Card & Summary */}
                    <div>
                        <div className={styles.mentorCard}>
                            <div className={styles.mentorHeader}>
                                <div className={styles.mentorAvatar}>{mentor.avatar}</div>
                                <div className={styles.mentorInfo}>
                                    <h3>{mentor.name}</h3>
                                    <p className={styles.mentorRole}>{mentor.title} @ {mentor.company}</p>
                                    <div className={styles.mentorRating}>
                                        <span>⭐ {mentor.rating}</span>
                                        <span>({mentor.reviews} değerlendirme)</span>
                                    </div>
                                </div>
                            </div>
                            <p className={styles.mentorBio}>{mentor.bio}</p>
                            <div className={styles.mentorStats}>
                                <div className={styles.statItem}>
                                    <div className={styles.statValue}>{mentor.sessions}</div>
                                    <div className={styles.statLabel}>Seans</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statValue}>{mentor.experience}</div>
                                    <div className={styles.statLabel}>Deneyim</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statValue}>{mentor.reviews}</div>
                                    <div className={styles.statLabel}>Yorum</div>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        {isFormValid && (
                            <div className={styles.summary}>
                                <div className={styles.summaryRow}>
                                    <span className={styles.summaryLabel}>Tarih</span>
                                    <span className={styles.summaryValue}>
                                        {selectedDate?.toLocaleDateString('tr-TR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span className={styles.summaryLabel}>Saat</span>
                                    <span className={styles.summaryValue}>{selectedSlot}</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span className={styles.summaryLabel}>Süre</span>
                                    <span className={styles.summaryValue}>{selectedType.duration}</span>
                                </div>
                                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                    <span className={styles.summaryLabel}>Toplam</span>
                                    <span className={styles.summaryValue}>{selectedType.price}</span>
                                </div>
                            </div>
                        )}

                        <button
                            className={styles.bookBtn}
                            disabled={!isFormValid}
                            onClick={handleBook}
                        >
                            Randevuyu Onayla ✓
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className={styles.successModal}>
                    <div className={styles.successContent}>
                        <div className={styles.successIcon}>🎉</div>
                        <h2 className={styles.successTitle}>Randevu Oluşturuldu!</h2>
                        <p className={styles.successText}>
                            {mentor.name} ile görüşmeniz başarıyla planlandı.
                            Detaylar e-posta adresinize gönderildi.
                        </p>
                        <Link href="/mentors" className={styles.successBtn}>
                            Tamam
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
