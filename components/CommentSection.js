"use client";

import { useState, useEffect } from 'react';
import styles from './CommentSection.module.css';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const CommentSection = ({ problemId, startupId }) => {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Determine the active ID and type
    const itemId = problemId || startupId;
    const itemType = problemId ? 'problem' : 'startup';

    useEffect(() => {
        const fetchComments = async () => {
            if (!itemId) return;
            try {
                // Fetch comments for this specific item
                const res = await fetch(`/api/comments?itemId=${itemId}&itemType=${itemType}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.error('Failed to fetch comments', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [itemId, itemType]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !user) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: newComment,
                    itemId: itemId,
                    itemType: itemType,
                    authorId: user.id,
                    author: user.name,
                    avatar: user.avatar
                })
            });

            if (res.ok) {
                const comment = await res.json();
                setComments([comment, ...comments]);
                setNewComment("");
            }
        } catch (error) {
            console.error('Failed to post comment', error);
        } finally {
            setSubmitting(false);
        }
    };

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return 'Az önce';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}dk önce`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}s önce`;
        const days = Math.floor(hours / 24);
        return `${days}g önce`;
    };

    return (
        <div id="comments" className={styles.section}>
            <h3 className={styles.title}>Yorumlar ({comments.length})</h3>

            {user ? (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <textarea
                        className={styles.textarea}
                        placeholder="Düşüncelerini paylaş..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                        disabled={submitting}
                    />
                    <button type="submit" className="btn btn-primary" disabled={!newComment.trim() || submitting}>
                        {submitting ? 'Gönderiliyor...' : 'Yorum Yap'}
                    </button>
                </form>
            ) : (
                <div className={styles.loginPrompt}>
                    Yorum yapmak için <Link href="/login" className="text-primary font-medium">giriş yapmalısınız</Link>.
                </div>
            )}

            <div className={styles.list}>
                {loading ? (
                    <div className="text-center py-4 text-gray-500">Yorumlar yükleniyor...</div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">Henüz yorum yapılmamış. İlk yorumu sen yap!</div>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className={styles.comment}>
                            <div className={styles.avatar}>
                                {comment.avatar ? (
                                    <img src={comment.avatar} alt={comment.author} />
                                ) : (
                                    <span>{(comment.author || 'A').charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            <div className={styles.content}>
                                <div className={styles.header}>
                                    <span className={styles.author}>{comment.author || 'Anonim'}</span>
                                    <span className={styles.time}>{formatTimeAgo(comment.createdAt)}</span>
                                </div>
                                <p className={styles.text}>{comment.content}</p>
                                <div className={styles.actions}>
                                    <button className={styles.actionBtn}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                        </svg>
                                        {comment.likes || 0}
                                    </button>
                                    <button className={styles.actionBtn}>Yanıtla</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;
