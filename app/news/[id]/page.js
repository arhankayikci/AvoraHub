"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../news.module.css';

const newsData = [
    {
        id: 1,
        title: "Avora Product Hunter Lansmanı Gerçekleşti",
        content: `Türkiye'nin en kapsamlı girişimcilik ve problem çözme platformu Avora, bugün itibarıyla yayın hayatına başladı. 
        
Girişimciler, yatırımcılar ve problem çözücüleri bir araya getiren platform, ekosisteme yeni bir soluk getirmeyi hedefliyor.

Platformun öne çıkan özellikleri:
- Problem Havuzu: Kullanıcıların karşılaştıkları sorunları paylaşabildiği alan
- Startup Vitrini: Yeni girişimlerin kendini tanıtabildiği alan
- Yatırımcı Eşleşmesi: Doğru girişimin doğru yatırımcıyla buluşması

Kurucu ekip, "Amacımız Türkiye'den global başarı hikayeleri çıkmasına katkı sağlamak" dedi.`,
        category: "Platform",
        date: "27 Ocak 2025",
        readTime: "3 dk",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1000",
        author: "Avora Team"
    },
    {
        id: 2,
        title: "2025'in En Çok Yatırım Alan Sektörleri",
        content: `Yapay zeka ve sürdürülebilirlik odaklı girişimler, 2025 yılının ilk çeyreğinde yatırım rekorları kırdı.

Öne çıkan sektörler:
- AI & Machine Learning: $2.4 Milyar yatırım
- CleanTech & Sustainability: $1.8 Milyar
- HealthTech: $1.5 Milyar

Analistler, bu trendin devam edeceğini öngörüyor.`,
        category: "Yatırım",
        date: "26 Ocak 2025",
        readTime: "5 dk",
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800",
        author: "Analiz Ekibi"
    },
    {
        id: 3,
        title: "Yerli Girişim 'VergiBot' Global Pazara Açılıyor",
        content: `Avora platformunda keşfedilen VergiBot, aldığı tohum yatırımla Avrupa pazarına açılmaya hazırlanıyor.

250 bin dolarlık yatırımla...`,
        category: "Startup",
        date: "25 Ocak 2025",
        readTime: "4 dk",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
        author: "Teknoloji Muhabiri"
    }
];

export default function NewsDetailPage() {
    const params = useParams();
    const id = parseInt(params.id);
    const newsItem = newsData.find(n => n.id === id);

    if (!newsItem) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Haber Bulunamadı</h1>
                <Link href="/news" className="text-primary hover:underline">Haberlere Dön</Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <article className={styles.article}>
                <div className={styles.articleHero} style={{ backgroundImage: `url(${newsItem.image})` }}>
                    <div className={styles.overlay}></div>
                    <div className="container">
                        <div className={styles.articleHeader}>
                            <span className="badge badge-primary mb-4">{newsItem.category}</span>
                            <h1 className={styles.articleTitle}>{newsItem.title}</h1>
                            <div className={styles.articleMeta}>
                                <span>{newsItem.author}</span>
                                <span>•</span>
                                <span>{newsItem.date}</span>
                                <span>•</span>
                                <span>{newsItem.readTime} okuma</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className={styles.articleContent}>
                        {newsItem.content.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    <div className={styles.backLink}>
                        <Link href="/news" className="btn btn-outline">
                            ← Tüm Haberler
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
