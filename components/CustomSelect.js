"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.css';

export default function CustomSelect({
    value,
    onChange,
    options,
    placeholder = "Seçiniz",
    icon
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button
                type="button"
                className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {icon && <span className={styles.icon}>{icon}</span>}
                <span className={styles.value}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`${styles.option} ${value === option.value ? styles.selected : ''}`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                            {value === option.value && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
