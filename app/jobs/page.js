"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './jobs.module.css';

// Demo iş ilanları
const DEMO_JOBS = [
    {
        id: 1,
        title: 'Senior Full Stack Developer',
        company: 'PayFlex',
        companyLogo: 'PF',
        location: 'İstanbul (Remote)',
        type: 'Tam Zamanlı',
        salary: '₺80.000 - ₺120.000',
        tags: ['React', 'Node.js', 'PostgreSQL'],
        posted: '2 gün önce',
        featured: true,
        description: 'Fintech alanında hızla büyüyen ekibimize katılın.'
    },
    {
        id: 2,
        title: 'Product Designer',
        company: 'DataMind AI',
        companyLogo: 'DM',
        location: 'Ankara',
        type: 'Tam Zamanlı',
        salary: '₺60.000 - ₺90.000',
        tags: ['Figma', 'UI/UX', 'Design Systems'],
        posted: '3 gün önce',
        featured: true,
        description: 'AI ürünlerimiz için kullanıcı deneyimi tasarlayın.'
    },
    {
        id: 3,
        title: 'Growth Marketing Manager',
        company: 'GreenDelivery',
        companyLogo: 'GD',
        location: 'İstanbul',
        type: 'Tam Zamanlı',
        salary: '₺50.000 - ₺75.000',
        tags: ['Growth', 'Performance Marketing', 'Analytics'],
        posted: '1 hafta önce',
        featured: false,
        description: 'Yeşil lojistik sektöründe büyüme stratejileri geliştirin.'
    },
    {
        id: 4,
        title: 'Mobile Developer (React Native)',
        company: 'HealthTrack',
        companyLogo: 'HT',
        location: 'Remote',
        type: 'Tam Zamanlı',
        salary: '₺70.000 - ₺100.000',
        tags: ['React Native', 'iOS', 'Android'],
        posted: '1 hafta önce',
        featured: false,
        description: 'Sağlık takip uygulamalarımızı geliştirin.'
    },
    {
        id: 5,
        title: 'Backend Developer',
        company: 'CryptoTR',
        companyLogo: 'CT',
        location: 'İstanbul (Hybrid)',
        type: 'Tam Zamanlı',
        salary: '₺90.000 - ₺130.000',
        tags: ['Python', 'Blockchain', 'AWS'],
        posted: '2 hafta önce',
        featured: false,
        description: 'Kripto altyapımızı güçlendirin.'
    },
    {
        id: 6,
        title: 'Part-time Content Writer',
        company: 'EduTech Pro',
        companyLogo: 'EP',
        location: 'Remote',
        type: 'Yarı Zamanlı',
        salary: '₺15.000 - ₺25.000',
        tags: ['İçerik', 'SEO', 'Eğitim'],
        posted: '3 gün önce',
        featured: false,
        description: 'Eğitim içerikleri üretin.'
    }
];

const JOB_TYPES = ['Tümü', 'Tam Zamanlı', 'Yarı Zamanlı', 'Staj', 'Freelance'];
const LOCATIONS = ['Tümü', 'İstanbul', 'Ankara', 'İzmir', 'Remote'];

function JobCard({ job }) {
    return (
        <Link href={`/jobs/${job.id}`} className={`${styles.jobCard} ${job.featured ? styles.featured : ''}`}>
            {job.featured && <span className={styles.featuredBadge}></span>}

            <div className={styles.cardHeader}>
                <div className={styles.companyLogo}>{job.companyLogo}</div>
                <div className={styles.jobInfo}>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <div className={styles.company}>{job.company}</div>
                </div>
            </div>

            <p className={styles.description}>{job.description}</p>

            <div className={styles.tags}>
                {job.tags.map((tag, i) => (
                    <span key={i} className={styles.tag}>{tag}</span>
                ))}
            </div>

            <div className={styles.cardFooter}>
                <div className={styles.meta}>
                    <span className={styles.location}>{job.location}</span>
                    <span className={styles.type}>{job.type}</span>
                </div>
                <div className={styles.salary}>{job.salary}</div>
            </div>

            <span className={styles.posted}>{job.posted}</span>
        </Link>
    );
}

export default function JobsPage() {
    const [selectedType, setSelectedType] = useState('Tümü');
    const [selectedLocation, setSelectedLocation] = useState('Tümü');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredJobs = DEMO_JOBS.filter(job => {
        const matchesType = selectedType === 'Tümü' || job.type === selectedType;
        const matchesLocation = selectedLocation === 'Tümü' || job.location.includes(selectedLocation);
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesType && matchesLocation && matchesSearch;
    });

    const featuredJobs = filteredJobs.filter(j => j.featured);
    const regularJobs = filteredJobs.filter(j => !j.featured);

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Hero */}
                <div className={styles.hero}>
                    <h1 className={styles.title}>Kariyer Fırsatları</h1>
                    <p className={styles.subtitle}>
                        Türkiye'nin en inovatif startup'larında çalışma fırsatı
                    </p>

                    {/* Search */}
                    <div className={styles.searchBox}>
                        <input
                            type="text"
                            placeholder="Pozisyon, şirket veya teknoloji ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                        <button className={styles.searchBtn}>Ara</button>
                    </div>
                </div>

                {/* Filters */}
                <div className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Çalışma Şekli:</span>
                        <div className={styles.filterOptions}>
                            {JOB_TYPES.map(type => (
                                <button
                                    key={type}
                                    className={`${styles.filterBtn} ${selectedType === type ? styles.active : ''}`}
                                    onClick={() => setSelectedType(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Lokasyon:</span>
                        <div className={styles.filterOptions}>
                            {LOCATIONS.map(loc => (
                                <button
                                    key={loc}
                                    className={`${styles.filterBtn} ${selectedLocation === loc ? styles.active : ''}`}
                                    onClick={() => setSelectedLocation(loc)}
                                >
                                    {loc}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className={styles.stats}>
                    <span>{filteredJobs.length} açık pozisyon</span>
                    <span>•</span>
                    <span>{new Set(DEMO_JOBS.map(j => j.company)).size} şirket</span>
                </div>

                {/* Featured Jobs */}
                {featuredJobs.length > 0 && (
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Öne Çıkan Pozisyonlar</h2>
                        <div className={styles.jobGrid}>
                            {featuredJobs.map(job => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    </div>
                )}

                {/* All Jobs */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Tüm Pozisyonlar</h2>
                    <div className={styles.jobGrid}>
                        {regularJobs.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className={styles.cta}>
                    <h3>Startup'ınız için yetenek mi arıyorsunuz?</h3>
                    <p>İlanınızı binlerce yetenekli adaya ulaştırın</p>
                    <Link href="/jobs/post" className={styles.ctaBtn}>
                        + İlan Ver
                    </Link>
                </div>
            </div>
        </div>
    );
}
