"use client";

import styles from './about.module.css';
import Link from 'next/link';

export default function AboutPage() {
    const stats = [
        { value: '10K+', label: 'Aktif Kullanıcı' },
        { value: '500+', label: 'Problemler' },
        { value: '200+', label: 'Startup\'lar' },
        { value: '₺50M+', label: 'Toplam Yatırım' }
    ];

    const howItWorks = [
        {
            step: '01',
            icon: '🔍',
            title: 'Problem Paylaş',
            description: 'Karşılaştığınız gerçek sorunları platformda paylaşın. Diğer kullanıcılar bu problemleri oylayarak en önemli olanları öne çıkarır.'
        },
        {
            step: '02',
            icon: '💡',
            title: 'Çözüm Geliştir',
            description: 'Girişimciler ve geliştiriciler bu problemlere çözümler üretir. Startup\'ınızı tanıtın ve geri bildirim alın.'
        },
        {
            step: '03',
            icon: '🤝',
            title: 'Yatırımcıyla Buluş',
            description: 'Başarılı projeler yatırımcıların dikkatini çeker. Platformumuz üzerinden doğru yatırımcıyla bağlantı kurun.'
        },
        {
            step: '04',
            icon: '🚀',
            title: 'Büyü ve Geliştir',
            description: 'Topluluk desteği, mentorluk ve kaynaklarla projenizi bir sonraki seviyeye taşıyın.'
        }
    ];

    const forWho = [
        {
            icon: '👩‍💻',
            title: 'Girişimciler',
            description: 'Fikirlerinizi hayata geçirin, potansiyel müşterilerinizle tanışın ve yatırımcı bulun.',
            features: ['Startup vitrininde yer alın', 'Erken kullanıcı geri bildirimi', 'Yatırımcı ağına erişim']
        },
        {
            icon: '🎯',
            title: 'Problem Sahipleri',
            description: 'Yaşadığınız sorunları paylaşın, size özel çözümler geliştirilmesini sağlayın.',
            features: ['Anonim veya açık paylaşım', 'Çözüm önerileri alın', 'Topluluk desteği']
        },
        {
            icon: '💰',
            title: 'Yatırımcılar',
            description: 'En çok ilgi gören fikirleri keşfedin, erken aşama startup\'lara yatırım yapın.',
            features: ['Doğrulanmış traction verileri', 'Direkt iletişim', 'Deal flow yönetimi']
        },
        {
            icon: '🛠️',
            title: 'Geliştiriciler',
            description: 'Gerçek problemlere çözüm üretin, projelerinizi sergileyin ve işbirlikleri kurun.',
            features: ['Problem havuzuna erişim', 'Teknik topluluk', 'Proje ortaklıkları']
        }
    ];

    const features = [
        {
            icon: '🔥',
            title: 'Trending Keşif',
            description: 'En çok ilgi gören problem ve startup\'ları anlık olarak takip edin.'
        },
        {
            icon: '⬆️',
            title: 'Oylama Sistemi',
            description: 'Beğendiğiniz fikirleri oylayın, en iyiler öne çıksın.'
        },
        {
            icon: '💬',
            title: 'Topluluk Tartışmaları',
            description: 'Her fikir altında derinlemesine tartışmalar yapın, geri bildirim verin.'
        },
        {
            icon: '🏆',
            title: 'Başarı Hikayeleri',
            description: 'Platformdan çıkan unicorn yolculuklarını takip edin.'
        },
        {
            icon: '📊',
            title: 'Analitikler',
            description: 'Projenizin performansını detaylı metriklerle izleyin.'
        },
        {
            icon: '🌍',
            title: 'Global Ağ',
            description: 'Türkiye\'den dünyaya, dünyanın her yerinden girişimcilerle bağlantı kurun.'
        }
    ];

    const values = [
        {
            icon: '🔍',
            title: 'Şeffaflık',
            description: 'Açık iletişim ve dürüstlük. Geri bildirimlerinizle gelişiyoruz.'
        },
        {
            icon: '💡',
            title: 'İnovasyon',
            description: 'Sürekli gelişim. Teknolojinin gücüyle yeni çözümler üretiyoruz.'
        },
        {
            icon: '🤝',
            title: 'Topluluk',
            description: 'Birlikte büyüme. Girişimcileri, yatırımcıları bir araya getiriyoruz.'
        },
        {
            icon: '🎯',
            title: 'Etki',
            description: 'Gerçek sorunlara gerçek çözümler. Ölçülebilir değer yaratıyoruz.'
        }
    ];

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className={styles.badge}>
                            <span className={styles.badgeDot}></span>
                            Türkiye'nin #1 Girişimcilik Platformu
                        </div>
                        <h1 className={styles.title}>
                            Problemlerden Çözümlere,
                            <span className={styles.titleGradient}> Fikirlerden Startup'lara</span>
                        </h1>
                        <p className={styles.subtitle}>
                            AvoraHub, Türkiye'nin girişimcilik ekosistemini güçlendirmek için kurulmuş,
                            startup'ların keşfedildiği, problemlerin çözüme kavuştuğu ve
                            yenilikçi fikirlerin yatırımla buluştuğu öncü platformdur.
                        </p>
                        <div className={styles.heroActions}>
                            <Link href="/register" className="btn btn-primary btn-lg">
                                Ücretsiz Başla
                            </Link>
                            <Link href="/problems" className="btn btn-outline btn-lg">
                                Platformu Keşfet
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className={styles.statsSection}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        {stats.map((stat, index) => (
                            <div key={index} className={styles.statCard}>
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className={styles.howSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>Nasıl Çalışır?</span>
                        <h2 className={styles.sectionTitle}>4 Adımda Fark Yarat</h2>
                        <p className={styles.sectionSubtitle}>
                            Fikrinizi başarılı bir girişime dönüştürmenin yolculuğu burada başlıyor
                        </p>
                    </div>
                    <div className={styles.howGrid}>
                        {howItWorks.map((item, index) => (
                            <div key={index} className={styles.howCard}>
                                <div className={styles.howStep}>{item.step}</div>
                                <div className={styles.howIcon}>{item.icon}</div>
                                <h3 className={styles.howTitle}>{item.title}</h3>
                                <p className={styles.howDescription}>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* For Who Section */}
            <section className={styles.forWhoSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>Kimler İçin?</span>
                        <h2 className={styles.sectionTitle}>Herkes İçin Bir Yer Var</h2>
                        <p className={styles.sectionSubtitle}>
                            İster girişimci, ister yatırımcı olun - platformda size özel fırsatlar sizi bekliyor
                        </p>
                    </div>
                    <div className={styles.forWhoGrid}>
                        {forWho.map((item, index) => (
                            <div key={index} className={styles.forWhoCard}>
                                <div className={styles.forWhoIcon}>{item.icon}</div>
                                <h3 className={styles.forWhoTitle}>{item.title}</h3>
                                <p className={styles.forWhoDescription}>{item.description}</p>
                                <ul className={styles.forWhoFeatures}>
                                    {item.features.map((feature, i) => (
                                        <li key={i}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.featuresSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>Özellikler</span>
                        <h2 className={styles.sectionTitle}>Platformun Gücü</h2>
                        <p className={styles.sectionSubtitle}>
                            Başarılı bir startup yolculuğu için ihtiyacınız olan tüm araçlar
                        </p>
                    </div>
                    <div className={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                <div className={styles.featureIcon}>{feature.icon}</div>
                                <h3 className={styles.featureTitle}>{feature.title}</h3>
                                <p className={styles.featureDescription}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className={styles.valuesSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Değerlerimiz</h2>
                        <p className={styles.sectionSubtitle}>
                            Bizi biz yapan ve her kararımıza yön veren prensipler
                        </p>
                    </div>
                    <div className={styles.valuesGrid}>
                        {values.map((value, index) => (
                            <div key={index} className={styles.valueCard}>
                                <div className={styles.valueIcon}>{value.icon}</div>
                                <h3 className={styles.valueTitle}>{value.title}</h3>
                                <p className={styles.valueDescription}>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <section className={styles.founderSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>Kurucu</span>
                        <h2 className={styles.sectionTitle}>Arkasındaki Vizyon</h2>
                    </div>
                    <div className={styles.founderCard}>
                        <div className={styles.founderAvatar}>
                            <span>AK</span>
                        </div>
                        <div className={styles.founderInfo}>
                            <h3 className={styles.founderName}>Arhan Kayıkçı</h3>
                            <p className={styles.founderRole}>Kurucu & CEO</p>
                            <p className={styles.founderBio}>
                                Türkiye'de girişimcilik ekosisteminin güçlenmesi için yola çıkan AvoraHub'ın
                                kurucusu. Problem çözme tutkusu ve inovasyon odaklı yaklaşımıyla,
                                girişimciler, yatırımcılar ve çözüm üreticilerini bir araya getiren
                                bir platform oluşturma vizyonuyla hareket ediyor.
                            </p>
                            <div className={styles.founderSocial}>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                    𝕏 Twitter
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                    💼 LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaCard}>
                        <h2 className={styles.ctaTitle}>Başlamaya Hazır mısınız?</h2>
                        <p className={styles.ctaSubtitle}>
                            Bir sonraki büyük fikir sizden gelebilir. Binlerce girişimcinin
                            arasına katılın ve fark yaratan projelerin parçası olun.
                        </p>
                        <div className={styles.ctaActions}>
                            <Link href="/register" className="btn btn-primary btn-lg">
                                Ücretsiz Hesap Oluştur
                            </Link>
                            <Link href="/startups" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>
                                Startup'ları İncele
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
