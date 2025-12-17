import styles from './SkeletonLoader.module.css';

export default function SkeletonLoader({ type = 'card', count = 1 }) {
    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return <CardSkeleton />;
            case 'list':
                return <ListSkeleton />;
            case 'profile':
                return <ProfileSkeleton />;
            case 'text':
                return <TextSkeleton />;
            default:
                return <CardSkeleton />;
        }
    };

    return (
        <div className={styles.container}>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}>{renderSkeleton()}</div>
            ))}
        </div>
    );
}

function CardSkeleton() {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.avatar}></div>
                <div className={styles.textBlock}>
                    <div className={styles.title}></div>
                    <div className={styles.subtitle}></div>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.lineShort}></div>
            </div>
            <div className={styles.footer}>
                <div className={styles.badge}></div>
                <div className={styles.badge}></div>
            </div>
        </div>
    );
}

function ListSkeleton() {
    return (
        <div className={styles.listItem}>
            <div className={styles.avatarSmall}></div>
            <div className={styles.textBlock}>
                <div className={styles.titleSmall}></div>
                <div className={styles.subtitleSmall}></div>
            </div>
        </div>
    );
}

function ProfileSkeleton() {
    return (
        <div className={styles.profile}>
            <div className={styles.avatarLarge}></div>
            <div className={styles.profileInfo}>
                <div className={styles.profileName}></div>
                <div className={styles.profileBio}></div>
                <div className={styles.profileBio}></div>
            </div>
        </div>
    );
}

function TextSkeleton() {
    return (
        <div className={styles.textLines}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.lineShort}></div>
        </div>
    );
}
