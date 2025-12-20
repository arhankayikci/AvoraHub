import { Outfit } from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata = {
  title: 'AvoraHub | Türkiye\'nin Lider Startup ve Problem Çözüm Platformu',
  description: 'AvoraHub, girişimcileri, yatırımcıları ve problem sahiplerini bir araya getiren Türkiye\'nin en kapsamlı startup ekosistemidir. Yenilikçi çözümler keşfedin, yatırım fırsatları bulun, startup dünyasına adım atın.',
  keywords: [
    'startup platformu',
    'girişimcilik',
    'yatırımcı ağı',
    'problem çözüm platformu',
    'inovasyon merkezi',
    'Türkiye startup ekosistemi',
    'yatırım fırsatları',
    'kurumsal inovasyon',
    'melek yatırımcı',
    'venture capital',
    'startup haberleri',
    'girişimci topluluk',
    'mentor ağı',
    'startup yarışması'
  ],
  authors: [{ name: 'AvoraHub' }],
  creator: 'AvoraHub',
  publisher: 'AvoraHub',
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL('https://avorahub.com'),
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/tr',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'AvoraHub | Türkiye\'nin Lider Startup ve Problem Çözüm Platformu',
    description: 'Girişimciler, yatırımcılar ve problem sahipleri için Türkiye\'nin en kapsamlı startup ekosistemi. Yenilikçi çözümler keşfedin.',
    url: 'https://avorahub.com',
    siteName: 'AvoraHub',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AvoraHub - Türkiye\'nin Lider Startup Platformu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AvoraHub | Türkiye\'nin Lider Startup Platformu',
    description: 'Girişimciler, yatırımcılar ve problem sahipleri için Türkiye\'nin en kapsamlı startup ekosistemi.',
    images: ['/og-image.png'],
    creator: '@avorahub',
    site: '@avorahub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
      </head>
      <body className={outfit.className}>
        <LanguageProvider>
          <AuthProvider>
            <Layout>{children}</Layout>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
