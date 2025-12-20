"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './investor-detail.module.css';

const investorsData = [
    {
        id: 1,
        name: "Mehmet Yılmaz",
        role: "Melek Yatırımcı",
        location: "İstanbul, Türkiye",
        avatar: "MY",
        verified: true,
        bio: "15 yıllık fintech ve SaaS deneyimi olan girişimci ve yatırımcı. Teknoloji startup'larına erken aşama yatırım yapıyorum ve aktif mentörlük sağlıyorum.",
        expertise: ["Finans", "SaaS", "B2B", "Fintech", "Payments"],
        ticketSize: "$25K - $100K",
        stage: ["Tohum", "Pre-Seed", "Seed"],
        geography: ["Türkiye", "Avrupa"],
        totalInvestments: 12,
        activeDeals: 3,
        exits: 2,
        portfolio: [
            { name: "TechPay", sector: "Fintech", stage: "Serie A", year: "2022" },
            { name: "CloudSync", sector: "SaaS", stage: "Seed", year: "2023" },
            { name: "B2B Connect", sector: "B2B", stage: "Pre-Seed", year: "2024" }
        ],
        criteria: [
            "Güçlü kurucu ekip",
            "Ölçeklenebilir  iş modeli",
            "Açıkça tanımlanmış pazar",
            "Teknolojik yenilik",
            "Traction veya MVP"
        ],
        contact: {
            email: "mehmet@example.com",
            linkedin: "linkedin.com/in/mehmetyilmaz",
            twitter: "@mehmetyilmaz"
        }
    },
    {
        id: 2,
        name: "Ayşe Demir",
        role: "Girişim Ortağı",
        location: "Ankara, Türkiye",
        avatar: "AD",
        verified: true,
        bio: "Sağlık ve eğitim teknolojilerine odaklanan deneyimli VC ortağı. Sosyal etki odaklı startup'lara tutkuyla yatırım yapıyorum.",
        expertise: ["Sağlık", "Eğitim", "Sosyal Etki", "Tele-tıp"],
        ticketSize: "$50K - $250K",
        stage: ["Seed", "Serie A"],
        geography: ["Türkiye", "MENA"],
        totalInvestments: 8,
        activeDeals: 2,
        exits: 1,
        portfolio: [
            { name: "HealthBridge", sector: "Sağlık", stage: "Serie A", year: "2021" },
            { name: "EduTech Pro", sector: "Eğitim", stage: "Seed", year: "2023" }
        ],
        criteria: [
            "Sosyal etki potansiyeli",
            "Deneyimli kurucu",
            "Sürdürülebilir büyüme",
            "Sağlık veya eğit him sektörü"
        ],
        contact: {
            email: "ayse@example.com",
            linkedin: "linkedin.com/in/aysedemir"
        }
    }
];

export default function InvestorDetail() {
    const params = useParams();
    const id = parseInt(params.id);
    const investor = investorsData.find(inv => inv.id === id) || investorsData[0];

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className={styles.breadcrumb}>
                            <Link href="/investors">Yatırımcılar</Link>
                            <span>/</span>
                            <span>{investor.name}</span>
                        </div>

                        <div className={styles.profileHeader}>
                            <div className={styles.avatar}>{investor.avatar}</div>
                            <div className={styles.info}>
                                <div className={styles.nameRow}>
                                    <h1 className={styles.name}>{investor.name}</h1>
                                    {investor.verified && (
                                        <div className={styles.verified} title="Doğrulanmış">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <p className={styles.role}>{investor.role}</p>
                                <div className={styles.location}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    {investor.location}
                                </div>
                            </div>
                        </div>

                        <div className={styles.stats}>
                            <div className={styles.statCard}>
                                <div className={styles.statNumber}>{investor.totalInvestments}</div>
                                <div className={styles.statLabel}>Toplam Yatırım</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statNumber}>{investor.activeDeals}</div>
                                <div className={styles.statLabel}>Aktif Anlaşma</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statNumber}>{investor.exits}</div>
                                <div className={styles.statLabel}>Çıkış</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <div className="container">
                <div className={styles.content}>
                    {/* Main */}
                    <div className={styles.main}>
                        {/* Bio */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Hakkında</h2>
                            <p className={styles.bio}>{investor.bio}</p>
                        </section>

                        {/* Expertise */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Uzmanlık Alanları</h2>
                            <div className={styles.tags}>
                                {investor.expertise.map(exp => (
                                    <span key={exp} className={styles.tag}>{exp}</span>
                                ))}
                            </div>
                        </section>

                        {/* Portfolio */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Portföy Şirketleri</h2>
                            <div className={styles.portfolio}>
                                {investor.portfolio.map((company, index) => (
                                    <div key={index} className={styles.portfolioItem}>
                                        <div className={styles.companyIcon}>{company.name.substring(0, 2)}</div>
                                        <div className={styles.companyInfo}>
                                            <h3 className={styles.companyName}>{company.name}</h3>
                                            <div className={styles.companyMeta}>
                                                <span className="badge badge-secondary">{company.sector}</span>
                                                <span>{company.stage}</span>
                                                <span>•</span>
                                                <span>{company.year}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Criteria */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Yatırım Kriterleri</h2>
                            <ul className={styles.criteriaList}>
                                {investor.criteria.map((criterion, index) => (
                                    <li key={index} className={styles.criteriaItem}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {criterion}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        {/* Investment Details */}
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Yatırım Detayları</h3>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Check Büyüklüğü</span>
                                <span className={styles.detailValue}>{investor.ticketSize}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Aşama</span>
                                <div className={styles.badges}>
                                    {investor.stage.map(s => (
                                        <span key={s} className="badge badge-primary">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Coğrafya</span>
                                <div className={styles.badges}>
                                    {investor.geography.map(g => (
                                        <span key={g} className="badge badge-secondary">{g}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>İletişim</h3>
                            {investor.contact.email && (
                                <a href={`mailto:${investor.contact.email}`} className={styles.contactLink}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                    E-posta Gönder
                                </a>
                            )}
                            {investor.contact.linkedin && (
                                <a href={`https://${investor.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                    LinkedIn
                                </a>
                            )}
                        </div>

                        {/* CTA */}
                        <div className={styles.ctaCard}>
                            <h3>Pitch Gönder</h3>
                            <p>Startup&apos;ınızı bu yatırımcıya sunun</p>
                            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                                Pitch Deck Gönder
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
