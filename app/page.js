"use client";

import HeroSection from "../components/HeroSection";
import ProblemCard from "../components/ProblemCard";
import StartupCard from "../components/StartupCard";
import CompactStats from "../components/CompactStats";
import CategoryFilters from "../components/CategoryFilters";
import FeaturedProblem from "../components/FeaturedProblem";
import Collections from "../components/Collections";
import styles from "./page.module.css";
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

const trendingProblems = [
  {
    id: 1,
    title: "Elektrikli araç şarj istasyonu eksikliği",
    description: "Brezilya'nın büyük şehirlerinde elektrikli araçların şarj edilebileceği yeterli istasyon yok ve bu durum EV benimsenmesini engelliyor.",
    category: "Ulaşım",
    votes: 342,
    comments: 56,
    author: "Maria Silva",
    timeAgo: "3 saat önce",
    countryCode: "BR",
    countryName: "Brezilya"
  },
  {
    id: 2,
    title: "Uygun fiyatlı sağlık hizmeti erişimi",
    description: "Hindistan'ın kırsal bölgelerinde milyonlarca insan temel sağlık hizmetlerine erişemiyor çünkü klinikler çok uzakta ve pahalı.",
    category: "Sağlık",
    votes: 567,
    comments: 89,
    author: "Raj Patel",
    timeAgo: "1 saat önce",
    countryCode: "IN",
    countryName: "Hindistan"
  },
  {
    id: 3,
    title: "İstanbul'da kaliteli çocuk bakım hizmeti bulmak",
    description: "Ebeveynler, İstanbul'da iş yerlerine yakın güvenilir ve uygun fiyatlı çocuk bakım seçenekleri bulmakta zorlanıyor.",
    category: "Aile & Çocuk",
    votes: 124,
    comments: 18,
    author: "Ayşe Kaya",
    timeAgo: "2 saat önce",
    countryCode: "TR",
    countryName: "Türkiye"
  },
  {
    id: 4,
    title: "Plastik atık yönetimi",
    description: "Endonezya'da her gün tonlarca plastik atık okyanuslara karışıyor ve çevreye zarar veriyor. Etkili bir geri dönüşüm sistemine ihtiyaç var.",
    category: "Sürdürülebilirlik",
    votes: 445,
    comments: 72,
    author: "Putri Wijaya",
    timeAgo: "4 saat önce",
    countryCode: "ID",
    countryName: "Endonezya"
  }
];

const featuredStartups = [
  {
    id: 1,
    name: "ChargeHub Brasil",
    tagline: "Brezilya genelinde akıllı EV şarj ağı",
    category: "Ulaşım",
    likes: 789,
    comments: 124,
    featured: true,
    countryCode: "BR",
    countryName: "Brezilya"
  },
  {
    id: 2,
    name: "HealthBridge India",
    tagline: "Kırsal kesimlerde mobil tele-sağlık platformu",
    category: "Sağlık",
    likes: 892,
    comments: 156,
    featured: true,
    countryCode: "IN",
    countryName: "Hindistan"
  },
  {
    id: 3,
    name: "BakımBağla",
    tagline: "Doğrulanmış çocuk bakıcıları ağı",
    category: "Aile & Çocuk",
    likes: 456,
    comments: 67,
    featured: false,
    countryCode: "TR",
    countryName: "Türkiye"
  },
  {
    id: 4,
    name: "OceanClean Indonesia",
    tagline: "AI destekli plastik toplama ve geri dönüşüm",
    category: "Sürdürülebilirlik",
    likes: 654,
    comments: 98,
    featured: true,
    countryCode: "ID",
    countryName: "Endonezya"
  }
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />

        {/* Compact Stats Bar */}
        <section className={styles.statsSection}>
          <div className="container">
            <CompactStats />
          </div>
        </section>

        {/* Category Filters */}
        <section className={styles.filtersSection}>
          <div className="container">
            <CategoryFilters />
          </div>
        </section>

        {/* Featured Problem of the Day */}
        <section className={styles.featuredSection}>
          <div className="container">
            <FeaturedProblem />
          </div>
        </section>

        {/* Trending Problems Section */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>
                  Dünya Çapında Popüler Problemler
                </h2>
                <p className={styles.sectionSubtitle}>
                  Farklı ülkelerden yenilikçi çözümler bekleyen gerçek zorluklar
                </p>
              </div>
              <Link href="/problems" className={styles.viewAllBtn}>
                Tümünü Gör →
              </Link>
            </div>

            <div className={styles.grid}>
              {trendingProblems.map(problem => (
                <ProblemCard key={problem.id} {...problem} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Startups Section */}
        <section className={styles.sectionAlt}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>
                  Global Öne Çıkan Startup'lar
                </h2>
                <p className={styles.sectionSubtitle}>
                  Dünya genelinde gerçek problemleri çözen yenilikçi şirketler
                </p>
              </div>
              <Link href="/startups" className={styles.viewAllBtn}>
                Tümünü Gör →
              </Link>
            </div>

            <div className={styles.grid}>
              {featuredStartups.map(startup => (
                <StartupCard key={startup.id} {...startup} />
              ))}
            </div>
          </div>
        </section>

        {/* Collections Section */}
        <section className={styles.collectionsSection}>
          <div className="container">
            <Collections />
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>Geleceği Şekillendirmeye Hazır mısınız?</h2>
              <p className={styles.ctaSubtitle}>
                Dünyanın dört bir yanından girişimciler, problem çözücüler ve yatırımcılardan oluşan gelişen bir topluluğa katılın. Birlikte, yarının çözümlerini bugün inşa edelim.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/signup" className="btn btn-primary btn-lg">
                  Ücretsiz Başla
                </Link>
                <Link href="/investors" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>
                  Yatırımcılar için
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Action Button - Removed for professional look */}
      </main>
    </div>
  );
}
