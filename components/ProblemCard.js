"use client";

import Link from 'next/link';
import FavoriteButton from './FavoriteButton';
import VoteButton from './VoteButton';
import styles from './ProblemCard.module.css';

const ProblemCard = ({ id, title, description, category, votes, comments, author, timeAgo, countryCode, countryName }) => {
    return (
        <Link href={`/problems/${id}`} className={styles.cardLink}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <span className={`badge badge-primary ${styles.category}`}>{category}</span>
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
                </div>

                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>

                <div className={styles.footer}>
                    <div className={styles.author}>
                        <div className={styles.avatar}>
                            {(author || 'A').split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={styles.authorInfo}>
                            <span className={styles.authorName}>{author || 'Anonim'}</span>
                            <span className={styles.timeAgo}>{timeAgo || 'Yeni'}</span>
                        </div>
                    </div>

                    <div className={styles.stats}>
                        <VoteButton itemId={id} itemType="problem" initialCount={votes} />
                        <button className={styles.stat} onClick={(e) => e.preventDefault()}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 9.06385 2.25819 10.0656 2.71574 10.9421L2.06726 13.4906C2.01259 13.7126 2.20265 13.9177 2.42789 13.8814L5.18359 13.4268C6.03197 13.8142 6.98936 14 8 14Z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            {comments}
                        </button>
                        <FavoriteButton itemId={id} itemType="problem" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProblemCard;
