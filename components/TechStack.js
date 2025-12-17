"use client";

import styles from './TechStack.module.css';

// Popüler teknolojiler ve ikonları
const TECH_ICONS = {
    // Frontend
    'React': { icon: '⚛️', color: '#61DAFB' },
    'Next.js': { icon: '▲', color: '#000000' },
    'Vue.js': { icon: '💚', color: '#4FC08D' },
    'Angular': { icon: '🅰️', color: '#DD0031' },
    'TypeScript': { icon: '🔷', color: '#3178C6' },
    'JavaScript': { icon: '🟨', color: '#F7DF1E' },
    'Tailwind': { icon: '🎨', color: '#06B6D4' },

    // Backend
    'Node.js': { icon: '🟢', color: '#339933' },
    'Python': { icon: '🐍', color: '#3776AB' },
    'Django': { icon: '🎸', color: '#092E20' },
    'FastAPI': { icon: '⚡', color: '#009688' },
    'Go': { icon: '🔵', color: '#00ADD8' },
    'Rust': { icon: '🦀', color: '#DEA584' },
    'Java': { icon: '☕', color: '#007396' },
    'PHP': { icon: '🐘', color: '#777BB4' },

    // Database
    'PostgreSQL': { icon: '🐘', color: '#4169E1' },
    'MongoDB': { icon: '🍃', color: '#47A248' },
    'MySQL': { icon: '🐬', color: '#4479A1' },
    'Redis': { icon: '🔴', color: '#DC382D' },
    'Firebase': { icon: '🔥', color: '#FFCA28' },
    'Supabase': { icon: '⚡', color: '#3ECF8E' },

    // Cloud & DevOps
    'AWS': { icon: '☁️', color: '#FF9900' },
    'Google Cloud': { icon: '☁️', color: '#4285F4' },
    'Azure': { icon: '☁️', color: '#0078D4' },
    'Docker': { icon: '🐳', color: '#2496ED' },
    'Kubernetes': { icon: '☸️', color: '#326CE5' },
    'Vercel': { icon: '▲', color: '#000000' },

    // Mobile
    'React Native': { icon: '📱', color: '#61DAFB' },
    'Flutter': { icon: '🦋', color: '#02569B' },
    'Swift': { icon: '🍎', color: '#F05138' },
    'Kotlin': { icon: '🤖', color: '#7F52FF' },

    // AI/ML
    'TensorFlow': { icon: '🧠', color: '#FF6F00' },
    'PyTorch': { icon: '🔥', color: '#EE4C2C' },
    'OpenAI': { icon: '🤖', color: '#412991' },

    // Other
    'Stripe': { icon: '💳', color: '#635BFF' },
    'GraphQL': { icon: '◈', color: '#E10098' },
    'REST API': { icon: '🔗', color: '#0B4F3B' }
};

export function TechBadge({ name, showLabel = true }) {
    const tech = TECH_ICONS[name] || { icon: '⚙️', color: '#6B7280' };

    return (
        <span
            className={styles.badge}
            style={{ '--tech-color': tech.color }}
            title={name}
        >
            <span className={styles.icon}>{tech.icon}</span>
            {showLabel && <span className={styles.name}>{name}</span>}
        </span>
    );
}

export default function TechStack({ technologies = [], title = "Tech Stack" }) {
    if (!technologies || technologies.length === 0) return null;

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>{title}</h4>
            <div className={styles.grid}>
                {technologies.map((tech, index) => (
                    <TechBadge key={index} name={tech} />
                ))}
            </div>
        </div>
    );
}
