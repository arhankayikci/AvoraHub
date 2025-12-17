"use client";

import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import styles from './FAQ.module.css';

const faqData = {
    en: [
        {
            question: "What is Avora Product Hunter?",
            answer: "Avora is a platform that connects problem solvers, innovative startups, and visionary investors. We help identify real-world problems and facilitate solutions through our global network."
        },
        {
            question: "How can I submit a problem?",
            answer: "Click on the 'Submit Problem' button in the navigation menu. Fill out the form with details about your problem, including category, description, and location. Our team will review and publish it within 24 hours."
        },
        {
            question: "Is Avora free to use?",
            answer: "Yes! Creating an account, browsing problems, and submitting solutions is completely free. We also offer premium features for enhanced visibility and analytics."
        },
        {
            question: "How do you verify startups?",
            answer: "We have a thorough verification process that includes checking company registration, founder backgrounds, and validating their problem-solving approach. Verified startups receive a badge on their profile."
        },
        {
            question: "Can investors connect with startups directly?",
            answer: "Absolutely! Verified investors can reach out to startups through our platform. We also organize virtual pitch events and networking sessions to facilitate meaningful connections."
        },
        {
            question: "How do I become a verified investor?",
            answer: "Submit your investor profile with details about your investment focus, portfolio, and credentials. Our team will review your application within 3-5 business days."
        }
    ],
    tr: [
        {
            question: "Avora Product Hunter nedir?",
            answer: "Avora, problem çözücüleri, yenilikçi startup'ları ve vizyoner yatırımcıları bir araya getiren bir platformdur. Gerçek dünya problemlerini belirlemeye ve global ağımız aracılığıyla çözümler üretmeye yardımcı oluyoruz."
        },
        {
            question: "Nasıl problem paylaşabilirim?",
            answer: "Navigasyon menüsündeki 'Problem Paylaş' butonuna tıklayın. Probleminizle ilgili kategori, açıklama ve konum bilgilerini içeren formu doldurun. Ekibimiz 24 saat içinde inceleyip yayınlayacaktır."
        },
        {
            question: "Avora kullanımı ücretsiz mi?",
            answer: "Evet! Hesap oluşturma, problemlere göz atma ve çözüm önerme tamamen ücretsizdir. Ayrıca gelişmiş görünürlük ve analitik için premium özellikler sunuyoruz."
        },
        {
            question: "Startup'ları nasıl doğruluyorsunuz?",
            answer: "Şirket kaydını kontrol etme, kurucu geçmişlerini araştırma ve problem çözme yaklaşımlarını doğrulama gibi kapsamlı bir doğrulama sürecimiz var. Doğrulanmış startup'lar profillerinde rozet alır."
        },
        {
            question: "Yatırımcılar startup'larla doğrudan iletişime geçebilir mi?",
            answer: "Kesinlikle! Doğrulanmış yatırımcılar platformumuz üzerinden startup'lara ulaşabilir. Ayrıca anlamlı bağlantıları kolaylaştırmak için sanal pitch etkinlikleri ve networking oturumları düzenliyoruz."
        },
        {
            question: "Nasıl doğrulanmış yatırımcı olabilirim?",
            answer: "Yatırım odağınız, portföyünüz ve referanslarınız hakkında detaylar içeren yatırımcı profilinizi gönderin. Ekibimiz başvurunuzu 3-5 iş günü içinde inceleyecektir."
        }
    ]
};

export default function FAQ() {
    const { locale } = useLanguage();
    const [openIndex, setOpenIndex] = useState(null);

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = faqData[locale] || faqData.en;

    return (
        <section className={styles.faqSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.badge}>FAQ</span>
                    <h2 className={styles.title}>
                        {locale === 'tr' ? 'Sık Sorulan Sorular' : 'Frequently Asked Questions'}
                    </h2>
                    <p className={styles.subtitle}>
                        {locale === 'tr'
                            ? 'Merak ettiğiniz her şeyin cevabı burada'
                            : 'Everything you need to know about Avora'}
                    </p>
                </div>

                <div className={styles.faqList}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
                        >
                            <button
                                className={styles.question}
                                onClick={() => toggleQuestion(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span>{faq.question}</span>
                                <svg
                                    className={styles.icon}
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                            <div className={styles.answerWrapper}>
                                <div className={styles.answer}>
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.cta}>
                    <p>{locale === 'tr' ? 'Başka sorunuz mu var?' : 'Still have questions?'}</p>
                    <a href="/contact" className={styles.ctaLink}>
                        {locale === 'tr' ? 'Bize Ulaşın' : 'Contact Us'}
                    </a>
                </div>
            </div>
        </section>
    );
}
