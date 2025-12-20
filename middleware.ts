import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';
import { createClient } from '@supabase/supabase-js';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const { pathname } = req.nextUrl;

    // Create Supabase client for middleware
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // Get token from cookies
    const token = req.cookies.get('sb-access-token')?.value ||
        req.cookies.get('supabase-auth-token')?.value;

    let user = null;
    let profile = null;

    if (token && supabaseUrl && supabaseAnonKey) {
        try {
            const supabase = createClient(supabaseUrl, supabaseAnonKey, {
                global: {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            });

            // Get user session
            const { data: { user: sessionUser } } = await supabase.auth.getUser();
            user = sessionUser;

            // If user exists, fetch profile
            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();
                profile = data;
            }
        } catch (error) {
            console.error('Middleware auth error:', error);
        }
    }

    // ============================================
    // STEP 2: Define route categories
    // ============================================

    // Always accessible (no authentication required)
    const publicRoutes = [
        '/',
        '/login',
        '/signup',
        '/register',
        '/auth/callback',
        '/about',
        '/contact',
        '/privacy',
        '/terms',
        '/cookies',
        '/help',
    ];

    // Read-only public access (can view without login)
    const readOnlyPublicRoutes = [
        '/startups',
        '/jobs',
        '/problems',
        '/news',
        '/forum',
        '/mentors',
        '/investors',
        '/events',
        '/resources',
        '/funding',
        '/collections',
        '/compare',
        '/guides',
        '/blog',
    ];

    // Requires authentication
    const protectedRoutes = [
        '/dashboard',
        '/profile',
        '/settings',
        '/messages',
        '/notifications',
        '/admin',
    ];

    // Requires authentication AND role
    const roleRequiredRoutes = [
        // Jobs
        '/jobs/new',
        '/jobs/post',
        '/jobs/create',

        // Startups
        '/startups/new',
        '/startups/create',
        '/submit-startup',

        // Problems
        '/problems/new',
        '/problems/create',
        '/submit-problem',

        // Events
        '/events/new',
        '/events/create',

        // Forum
        '/forum/new',
        '/forum/create',

        // Mentors
        '/mentors/apply',
        '/mentors/register',
    ];

    // Special: requires auth but NOT role (onboarding step)
    const onboardingRoute = '/onboarding';

    // ============================================
    // STEP 3: Check route type
    // ============================================

    const isPublic = publicRoutes.some(route => {
        if (route === '/') return pathname === '/';
        return pathname.startsWith(route);
    });

    const isReadOnlyPublic = readOnlyPublicRoutes.some(route =>
        pathname.startsWith(route)
    );

    const isProtected = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    const isRoleRequired = roleRequiredRoutes.some(route =>
        pathname.startsWith(route)
    );

    const isOnboarding = pathname.startsWith(onboardingRoute);

    // ============================================
    // STEP 4: Apply access control logic
    // ============================================

    // Public routes: always allow
    if (isPublic || isReadOnlyPublic) {
        return res;
    }

    // Protected routes: require authentication
    if (isProtected || isRoleRequired || isOnboarding) {
        if (!user) {
            // No session: redirect to login
            const redirectUrl = new URL('/login', req.url);
            redirectUrl.searchParams.set('next', pathname);
            return NextResponse.redirect(redirectUrl);
        }

        // User is authenticated, now check role requirements
        if (isRoleRequired || isProtected) {
            // No profile or no role: redirect to onboarding
            if (!profile || !profile.role) {
                if (!isOnboarding) {
                    return NextResponse.redirect(new URL('/onboarding', req.url));
                }
            }

            // Has role: allow access
        }

        // Onboarding route: user is authenticated, allow access
        return res;
    }

    // Default: allow
    return res;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc)
         * - api routes (handled separately)
         */
        '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};
