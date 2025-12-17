"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './help.module.css';

const FAQ_DATA = [
    {
        category: 'Genel',
        questions: [
            { q: 'AvoraHub nedir?', a: 'AvoraHub, girişimcileri, yatırımcıları ve problem sahiplerini bir araya getiren Türkiye\'nin lider startup ekosistemi platformudur.' },
            { q: 'Platforma nasıl üye olabilirim?', a: 'Sağ üst köşedeki "Kayıt Ol" butonuna tıklayarak e-posta veya sosyal medya hesabınızla hızlıca kayıt olabilirsiniz.' },
            { q: 'Platform ücretsiz mi?', a: 'Evet, temel özellikler ücretsizdir. Problem paylaşma, startup ekleme, oylama ve yorum yapma özellikleri ücretsiz olarak sunulmaktadır.' },
        ]
    },
    {
        category: 'Startuplar',
        questions: [
            { q: 'Startup\'ımı nasıl ekleyebilirim?', a: 'Giriş yaptıktan sonra "Startup Ekle" sayfasından startup bilgilerinizi girerek başvuru yapabilirsiniz.' },
            { q: 'Oy sistemi nasıl çalışıyor?', a: 'Her kullanıcı günde bir kez aynı içeriğe oy verebilir. Oylar startup\'ın sıralamasını ve görünürlüğünü doğrudan etkiler.' },
        ]
    },
    {
        category: 'Problemler',
        questions: [
            { q: 'Problem paylaşmak için ne gerekiyor?', a: 'Sadece ücretsiz bir hesap açmanız yeterli. Karşılaştığınız herhangi bir problemi detaylı şekilde paylaşabilirsiniz.' },
            { q: 'Anonim olarak paylaşabilir miyim?', a: 'Evet, problem paylaşırken "Anonim olarak paylaş" seçeneğini işaretleyebilirsiniz.' },
        ]
    },
    {
        category: 'Mentörlük',
        questions: [
            { q: 'Mentor olmak için ne yapmalıyım?', a: 'Mentörler sayfasından "Mentor Ol" başvurusunu doldurarak başvurabilirsiniz.' },
            { q: 'Mentor seansları ücretli mi?', a: 'Mentör tercihine bağlıdır. Bazı mentörler ücretsiz, bazıları ücretli seans sunmaktadır.' },
        ]
    },
    {
        category: 'Hesap',
        questions: [
            { q: 'Şifremi unuttum, ne yapmalıyım?', a: 'Giriş sayfasındaki "Şifremi Unuttum" bağlantısına tıklayın.' },
            { q: 'Hesabımı nasıl silebilirim?', a: 'Ayarlar > Gizlilik bölümünden "Hesabımı Sil" seçeneğini kullanabilirsiniz.' },
        ]
    }
];

export default function HelpPage() {
    const [activeCategory, setActiveCategory] = useState('Genel');
    const [openQuestion, setOpenQuestion] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const activeData = FAQ_DATA.find(c => c.category === activeCategory);

    const allQuestions = searchQuery
        ? FAQ_DATA.flatMap(c => c.questions.filter(q =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
        ))
        : activeData?.questions || [];

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Header */}
                <div className={styles.header}>
                    <h1>Yardım Merkezi</h1>
                    <p>Sıkça sorulan sorular ve destek</p>
                </div>

                {/* Search */}
                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="Soru ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                {/* Main Content */}
                <div className={styles.content}>
                    {/* Sidebar */}
                    {!searchQuery && (
                        <aside className={styles.sidebar}>
                            <h3>Kategoriler</h3>
                            <ul>
                                {FAQ_DATA.map(cat => (
                                    <li key={cat.category}>
                                        <button
                                            className={activeCategory === cat.category ? styles.active : ''}
                                            onClick={() => {
                                                setActiveCategory(cat.category);
                                                setOpenQuestion(0);
                                            }}
                                        >
                                            {cat.category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    )}

                    {/* FAQ List */}
                    <div className={styles.faqList}>
                        {searchQuery && (
                            <p className={styles.searchInfo}>
                                &quot;{searchQuery}&quot; için {allQuestions.length} sonuç bulundu
                            </p>
                        )}

                        {allQuestions.length === 0 ? (
                            <div className={styles.noResults}>
                                <p>Sonuç bulunamadı. Farklı kelimelerle tekrar deneyin.</p>
                            </div>
                        ) : (
                            allQuestions.map((item, i) => (
                                <div
                                    key={i}
                                    className={`${styles.faqItem} ${openQuestion === i ? styles.open : ''}`}
                                >
                                    <button
                                        className={styles.faqQuestion}
                                        onClick={() => setOpenQuestion(openQuestion === i ? -1 : i)}
                                    >
                                        <span>{item.q}</span>
                                        <span className={styles.icon}>{openQuestion === i ? '−' : '+'}</span>
                                    </button>
                                    {openQuestion === i && (
                                        <div className={styles.faqAnswer}>{item.a}</div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Contact CTA */}
                <div className={styles.cta}>
                    <h3>Cevabınızı bulamadınız mı?</h3>
                    <p>Destek ekibimiz size yardımcı olmaktan mutluluk duyar.</p>
                    <Link href="/contact" className={styles.ctaBtn}>
                        İletişime Geçin
                    </Link>
                </div>
            </div>
        </div>
    );
}
