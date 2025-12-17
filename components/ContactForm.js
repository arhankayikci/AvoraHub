"use client";

import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import styles from './ContactForm.module.css';

export default function ContactForm() {
    const { locale } = useLanguage();
    const { success, error: showError } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const t = {
        en: {
            title: 'Get in Touch',
            subtitle: 'Have a question or want to work together? We\'d love to hear from you.',
            name: 'Full Name',
            email: 'Email Address',
            subject: 'Subject',
            message: 'Your Message',
            send: 'Send Message',
            sending: 'Sending...',
            successMsg: 'Message sent successfully! We\'ll get back to you soon.',
            errorMsg: 'Failed to send message. Please try again.',
            required: 'This field is required',
            invalidEmail: 'Please enter a valid email address',
        },
        tr: {
            title: 'İletişime Geçin',
            subtitle: 'Bir sorunuz mu var veya birlikte çalışmak mı istiyorsunuz? Sizden haber almak isteriz.',
            name: 'Ad Soyad',
            email: 'E-posta Adresi',
            subject: 'Konu',
            message: 'Mesajınız',
            send: 'Mesaj Gönder',
            sending: 'Gönderiliyor...',
            successMsg: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.',
            errorMsg: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.',
            required: 'Bu alan zorunludur',
            invalidEmail: 'Geçerli bir e-posta adresi girin',
        }
    };

    const text = t[locale] || t.en;

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = text.required;
        }

        if (!formData.email.trim()) {
            newErrors.email = text.required;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = text.invalidEmail;
        }

        if (!formData.subject.trim()) {
            newErrors.subject = text.required;
        }

        if (!formData.message.trim()) {
            newErrors.message = text.required;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            success(text.successMsg);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            showError(text.errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{text.title}</h2>
                    <p className={styles.subtitle}>{text.subtitle}</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.label}>
                                {text.name}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`${styles.input} ${errors.name ? styles.error : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>
                                {text.email}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="subject" className={styles.label}>
                            {text.subject}
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.subject ? styles.error : ''}`}
                            disabled={isSubmitting}
                        />
                        {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="message" className={styles.label}>
                            {text.message}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="6"
                            className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
                            disabled={isSubmitting}
                        />
                        {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                    </div>

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? text.sending : text.send}
                        {!isSubmitting && (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}
