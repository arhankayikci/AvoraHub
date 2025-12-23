"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './SkillsTagInput.module.css';

// Popular skills suggestions
const SUGGESTED_SKILLS = [
    'React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript',
    'Python', 'Django', 'Flask', 'Node.js', 'Express', 'GraphQL',
    'AWS', 'Azure', 'Docker', 'Kubernetes', 'DevOps', 'CI/CD',
    'Machine Learning', 'Data Science', 'AI', 'NLP', 'Computer Vision',
    'UI/UX Design', 'Figma', 'Adobe XD', 'Product Design',
    'Product Management', 'Agile', 'Scrum', 'Project Management',
    'Marketing', 'Digital Marketing', 'SEO', 'SEM', 'Content Marketing',
    'Sales', 'Business Development', 'Growth Hacking', 'Analytics',
    'Mobile Development', 'React Native', 'Flutter', 'iOS', 'Android',
    'Blockchain', 'Web3', 'Smart Contracts', 'Solidity',
    'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase',
    'Java', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby',
    'Leadership', 'Communication', 'Problem Solving', 'Teamwork'
];

export default function SkillsTagInput({ value = [], onChange }) {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    // Filter suggestions based on input
    useEffect(() => {
        if (inputValue.trim()) {
            const filtered = SUGGESTED_SKILLS.filter(
                skill =>
                    skill.toLowerCase().includes(inputValue.toLowerCase()) &&
                    !value.includes(skill)
            ).slice(0, 8);
            setSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
            setHighlightedIndex(0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [inputValue, value]);

    // Close suggestions on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const addSkill = (skill) => {
        if (skill && !value.includes(skill)) {
            onChange([...value, skill]);
        }
        setInputValue('');
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    const removeSkill = (skillToRemove) => {
        onChange(value.filter(skill => skill !== skillToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (showSuggestions && suggestions[highlightedIndex]) {
                addSkill(suggestions[highlightedIndex]);
            } else if (inputValue.trim()) {
                addSkill(inputValue.trim());
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(prev =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
            removeSkill(value[value.length - 1]);
        }
    };

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.inputWrapper} onClick={() => inputRef.current?.focus()}>
                {/* Selected Tags */}
                <div className={styles.tagsContainer}>
                    {value.map((skill, index) => (
                        <span key={index} className={styles.tag}>
                            {skill}
                            <button
                                type="button"
                                className={styles.removeBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeSkill(skill);
                                }}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => inputValue && setSuggestions.length > 0 && setShowSuggestions(true)}
                        placeholder={value.length === 0 ? "Yetenek ekleyin..." : ""}
                        className={styles.input}
                    />
                </div>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
                <div className={styles.suggestions}>
                    {suggestions.map((skill, index) => (
                        <button
                            key={skill}
                            type="button"
                            className={`${styles.suggestionItem} ${index === highlightedIndex ? styles.highlighted : ''}`}
                            onClick={() => addSkill(skill)}
                            onMouseEnter={() => setHighlightedIndex(index)}
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            )}

            {/* Helper Text */}
            <p className={styles.helperText}>
                Yazmaya başlayın veya listeden seçin. Enter ile ekleyin.
            </p>
        </div>
    );
}
