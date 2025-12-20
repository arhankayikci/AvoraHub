"use client";

import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    {/* Brand Section */}
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18 2C9.163 2 2 9.163 2 18C2 26.837 9.163 34 18 34C26.837 34 34 26.837 34 18C34 9.163 26.837 2 18 2Z"
                                    stroke="url(#spiralGradient1)"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                                <path
                                    d="M18 6C11.373 6 6 11.373 6 18C6 24.627 11.373 30 18 30C24.627 30 30 24.627 30 18C30 11.373 24.627 6 18 6Z"
                                    stroke="url(#spiralGradient2)"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                                <path
                                    d="M18 10C13.582 10 10 13.582 10 18C10 22.418 13.582 26 18 26C22.418 26 26 22.418 26 18C26 13.582 22.418 10 18 10Z"
                                    stroke="url(#spiralGradient3)"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                                <circle cx="18" cy="18" r="3" fill="url(#centerGradient)" />
                                <defs>
                                    <linearGradient id="spiralGradient1" x1="2" y1="2" x2="34" y2="34">
                                        <stop stopColor="#0B4F3B" />
                                        <stop offset="1" stopColor="#1B6B54" />
                                    </linearGradient>
                                    <linearGradient id="spiralGradient2" x1="6" y1="6" x2="30" y2="30">
                                        <stop stopColor="#1B6B54" />
                                        <stop offset="1" stopColor="#2E8B70" />
                                    </linearGradient>
                                    <linearGradient id="spiralGradient3" x1="10" y1="10" x2="26" y2="26">
                                        <stop stopColor="#2E8B70" />
                                        <stop offset="1" stopColor="#3AA082" />
                                    </linearGradient>
                                    <linearGradient id="centerGradient" x1="15" y1="15" x2="21" y2="21">
                                        <stop stopColor="#D4AF37" />
                                        <stop offset="1" stopColor="#F4D03F" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span className={styles.logoText}>
                                <span className={styles.logoAvora}>AVORA</span>
                                <span className={styles.logoHub}>HUB</span>
                            </span>
                        </Link>
                        <p className={styles.tagline}>
                            Dünya çapında problem çözücüleri, startup&apos;ları ve yatırımcıları buluşturan önde gelen ağ.
                        </p>
                        <div className={styles.social}>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M18.521 0H1.476C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.476 20h17.045c.815 0 1.479-.645 1.479-1.44V1.44C20 .645 19.336 0 18.521 0zM5.93 17.02H2.964V7.498H5.93v9.522zM4.447 6.194a1.72 1.72 0 110-3.439 1.72 1.72 0 010 3.439zM17.02 17.02h-2.964v-4.632c0-1.103-.02-2.526-1.538-2.526-1.541 0-1.776 1.203-1.776 2.444v4.714H7.778V7.498h2.844v1.302h.041c.396-.75 1.364-1.54 2.808-1.54 3.004 0 3.558 1.978 3.558 4.548v5.212h-.009z" />
                                </svg>
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className={styles.links}>
                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkTitle}>Platform</h4>
                            <ul className={styles.linkList}>
                                <li><Link href="/problems">Problemler</Link></li>
                                <li><Link href="/startups">Startup&apos;lar</Link></li>
                                <li><Link href="/mentors">Mentörler</Link></li>
                                <li><Link href="/events">Etkinlikler</Link></li>
                                <li><Link href="/jobs">Kariyer</Link></li>
                            </ul>
                        </div>

                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkTitle}>Topluluk</h4>
                            <ul className={styles.linkList}>
                                <li><Link href="/forum">Forum</Link></li>
                                <li><Link href="/resources">Kaynaklar</Link></li>
                                <li><Link href="/collections">Koleksiyonlar</Link></li>
                                <li><Link href="/investors">Yatırımcılar</Link></li>
                            </ul>
                        </div>
                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkTitle}>Yasal</h4>
                            <ul className={styles.linkList}>
                                <li><Link href="/privacy">Gizlilik Politikası</Link></li>
                                <li><Link href="/terms">Kullanım Şartları</Link></li>
                                <li><Link href="/about">Hakkımızda</Link></li>
                                <li><Link href="/contact">İletişim</Link></li>
                            </ul>
                        </div>

                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkTitle}>Bülten</h4>
                            <p className={styles.newsletterText}>
                                İnovasyon ekosisteminden en son içgörüleri e-posta kutunuza alın.
                            </p>
                            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="E-posta adresiniz"
                                    className={styles.newsletterInput}
                                />
                                <button type="submit" className={styles.newsletterBtn}>
                                    Abone Ol
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} AvoraHub. Tüm hakları saklıdır.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
