export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/dashboard/',
                    '/profile/',
                    '/settings/',
                    '/onboarding/',
                ],
            },
        ],
        sitemap: 'https://avorahub.com.tr/sitemap.xml',
    };
}
