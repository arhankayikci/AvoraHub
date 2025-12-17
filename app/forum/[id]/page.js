"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './forum-detail.module.css';

export default function ForumTopicDetail() {
    const params = useParams();
    const topicId = params.id;

    // Demo data
    const topic = {
        id: topicId,
        title: "İlk yatırımcı görüşmesine nasıl hazırlanılır?",
        author: "Ahmet Yılmaz",
        authorAvatar: null,
        category: "Yatırım & Fonlama",
        createdAt: "2 saat önce",
        views: 456,
        replies: 23,
        tags: ["yatırım", "pitch", "fonlama"],
        content: `Merhabalar,

İlk yatırımcı görüşmemi önümüzdeki hafta yapacağım ve oldukça heyecanlıyım. Deneyimli girişimcilerden tavsiyeleri almak isterim:

1. Pitch deck'te hangi noktalara özellikle dikkat etmeliyim?
2. Görüşme sırasında kaçınılması gereken hatalar nelerdir?
3. Finansal projeksiyonları nasıl sunmalıyım?

Şimdiden teşekkürler!`
    };

    const replies = [
        {
            id: 1,
            author: "Elif Demir",
            authorAvatar: null,
            createdAt: "1 saat önce",
            content: "İlk görüşmem için çok iyi hazırlanmıştım ama yine de heyecanlanmıştım. En önemli tavsiyem: rakamlarınızı çok net bilin ve sorulara kesin cevaplar verin. Yatırımcılar belirsizlik sevmez."
        },
        {
            id: 2,
            author: "Can Öztürk",
            authorAvatar: null,
            createdAt: "45 dk önce",
            content: "Pitch deck'i kısa tutun, maksimum 10-12 slayt. Sorun, çözüm, pazar büyüklüğü ve ekip çok önemli. Finansal projeksiyonlarda gerçekçi olun - abartılı rakamlar güven kaybettirir."
        }
    ];

    return (
        <div className={styles.forumPage}>
            <div className="container">
                <div className={styles.breadcrumb}>
                    <Link href="/forum">Forum</Link>
                    <span>›</span>
                    <span>{topic.category}</span>
                </div>

                <div className={styles.topicDetail}>
                    <div className={styles.topicHeader}>
                        <div className={styles.topicCategory}>{topic.category}</div>
                        <h1 className={styles.topicTitle}>{topic.title}</h1>

                        <div className={styles.topicMeta}>
                            <div className={styles.author}>
                                <div className={styles.authorAvatar}>
                                    {topic.authorAvatar ? (
                                        <img src={topic.authorAvatar} alt={topic.author} />
                                    ) : (
                                        <span>{topic.author.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <div className={styles.authorName}>{topic.author}</div>
                                    <div className={styles.metaInfo}>{topic.createdAt} • {topic.views} görüntülenme</div>
                                </div>
                            </div>
                            <div className={styles.tags}>
                                {topic.tags.map((tag, i) => (
                                    <span key={i} className={styles.tag}>#{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.topicContent}>
                        <p>{topic.content}</p>
                    </div>

                    <div className={styles.repliesSection}>
                        <h3>{replies.length} Yanıt</h3>

                        <div className={styles.repliesList}>
                            {replies.map(reply => (
                                <div key={reply.id} className={styles.replyItem}>
                                    <div className={styles.replyAuthor}>
                                        <div className={styles.authorAvatar}>
                                            {reply.authorAvatar ? (
                                                <img src={reply.authorAvatar} alt={reply.author} />
                                            ) : (
                                                <span>{reply.author.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div>
                                            <div className={styles.authorName}>{reply.author}</div>
                                            <div className={styles.metaInfo}>{reply.createdAt}</div>
                                        </div>
                                    </div>
                                    <div className={styles.replyContent}>
                                        <p>{reply.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.replyForm}>
                            <h4>Yanıt Yaz</h4>
                            <textarea
                                className={styles.replyTextarea}
                                placeholder="Yanıtınızı buraya yazın..."
                                rows={5}
                            ></textarea>
                            <button className={styles.submitReply}>Yanıt Gönder</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
