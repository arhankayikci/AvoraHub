"use client";

import { useState, useEffect } from "react";
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

export default function Home() {
  const { t } = useLanguage();
  const [problems, setProblems] = useState([]);
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [problemsRes, startupsRes] = await Promise.all([
          fetch('/api/problems?sort=votes'),
          fetch('/api/startups?sort=popular')
        ]);

        const problemsData = await problemsRes.json();
        const startupsData = await startupsRes.json();

        setProblems(Array.isArray(problemsData) ? problemsData.slice(0, 4) : []);
        setStartups(Array.isArray(startupsData) ? startupsData.slice(0, 4) : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              {loading ? (
                <p>Yükleniyor...</p>
              ) : problems.length > 0 ? (
                problems.map(problem => (
                  <ProblemCard key={problem.id} {...problem} />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p>Henüz problem eklenmemiş. İlk problemi siz ekleyin!</p>
                  <Link href="/problems/new" className="btn btn-primary">Problem Ekle</Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Startups Section */}
        <section className={styles.sectionAlt}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>
                  Global Öne Çıkan Startup&apos;lar
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
              {loading ? (
                <p>Yükleniyor...</p>
              ) : startups.length > 0 ? (
                startups.map(startup => (
                  <StartupCard key={startup.id} {...startup} />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p>Henüz startup eklenmemiş. İlk startup&apos;ı siz ekleyin!</p>
                  <Link href="/startups/new" className="btn btn-primary">Startup Ekle</Link>
                </div>
              )}
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
