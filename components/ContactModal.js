"use client";

import { useState } from 'react';
import styles from './ContactModal.module.css';

export default function ContactModal({ isOpen, onClose, title, problemTitle, problemId }) {
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create mailto link with pre-filled subject and body
        const subject = encodeURIComponent(`Çözüm Teklifi: ${problemTitle || 'Problem'}`);
        const body = encodeURIComponent(`Merhaba,\n\n${message}\n\nProblem ID: ${problemId || 'N/A'}`);
        window.location.href = `mailto:contact@avorahub.com.tr?subject=${subject}&body=${body}`;
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>×</button>

                <h2 className={styles.title}>{title || 'Çözüm Teklifinizi Gönderin'}</h2>
                <p className={styles.subtitle}>
                    Bu probleme çözüm önerinizi aşağıdaki formu doldurarak bize iletin.
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Teklifiniz</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Çözüm önerinizi detaylı olarak açıklayın..."
                            rows={5}
                            required
                        />
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>
                            İptal
                        </button>
                        <button type="submit" className={styles.submitBtn}>
                            📧 E-posta ile Gönder
                        </button>
                    </div>
                </form>

                <p className={styles.note}>
                    Teklifiniz e-posta olarak iletilecektir. En kısa sürede size dönüş yapacağız.
                </p>
            </div>
        </div>
    );
}
