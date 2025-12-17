import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({ size = 'medium', fullScreen = false }) {
    if (fullScreen) {
        return (
            <div className={styles.fullScreenContainer}>
                <div className={`${styles.spinner} ${styles[size]}`}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.spinner} ${styles[size]}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
