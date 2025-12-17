"use client";

import Link from 'next/link';
import FavoriteButton from './FavoriteButton';
import VoteButton from './VoteButton';
import styles from './StartupCard.module.css';

const StartupCard = ({ id, name, tagline, category, likes, comments, featured, countryCode, countryName }) => {
    return (
        <Link href={`/startups/${id}`} className={styles.cardLink}>
            <div className={styles.card}>
                {/* Header row: Flag + Featured badge */}
                <div className={styles.header}>
                    {countryCode && (
                        <div className={styles.countryFlag} title={countryName}>
                            <img
                                src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w80/${countryCode.toLowerCase()}.png 2x`}
                                width="24"
                                alt={countryName}
                                className={styles.flagImage}
                            />
                        </div>
                    )}
                    {featured && (
                        <span className={styles.featuredBadge}>
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.5L6 8.885L2.91 10.5L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="currentColor" />
                            </svg>
                            Öne Çıkan
                        </span>
                    )}
                </div>

                {/* Logo */}
                <div className={styles.logoWrapper}>
                    <div className={styles.logo}>
                        {(name || 'S').substring(0, 2).toUpperCase()}
                    </div>
                </div>

                {/* Content */}
                <div className={styles.content}>
                    <h3 className={styles.name}>{name}</h3>
                    <p className={styles.tagline}>{tagline}</p>
                    <span className={`badge badge-primary ${styles.category}`}>{category}</span>
                </div>

                {/* Footer with stats */}
                <div className={styles.footer}>
                    <div className={styles.stats}>
                        <VoteButton itemId={id} itemType="startup" initialCount={likes} />
                        <div className={styles.stat}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 9.06385 2.25819 10.0656 2.71574 10.9421L2.06726 13.4906C2.01259 13.7126 2.20265 13.9177 2.42789 13.8814L5.18359 13.4268C6.03197 13.8142 6.98936 14 8 14Z" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                            {comments}
                        </div>
                        <FavoriteButton itemId={id} itemType="startup" />
                    </div>

                    <span className={`btn btn-outline btn-sm ${styles.viewBtn}`}>
                        İncele
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default StartupCard;
