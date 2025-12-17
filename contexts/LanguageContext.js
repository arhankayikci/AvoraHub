"use client";

import { createContext, useState, useContext, useEffect } from 'react';
import tr from '../locales/tr.json';
import en from '../locales/en.json';

const translations = { tr, en };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [locale, setLocale] = useState('tr');

    useEffect(() => {
        // Check localStorage for saved preference
        const saved = localStorage.getItem('locale');
        if (saved && (saved === 'tr' || saved === 'en')) {
            setLocale(saved);
        }
    }, []);

    const changeLocale = (newLocale) => {
        setLocale(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[locale];

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ locale, changeLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
