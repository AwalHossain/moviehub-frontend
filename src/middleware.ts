import { NextRequest, NextResponse } from "next/server";
import { tokenRefresh } from "./action/set-cookie";
import isValidToken from "./utils/validateToken";

const PUBLIC_FILE = /\.(.*)$/;

// List of routes that require authentication
const PROTECTED_ROUTES = [
    '/profile',
    '/account',
    '/settings'
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Always allow static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/api') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    const isProtectedRoute = PROTECTED_ROUTES.some(route =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

    // If route is not protected, allow access
    if (!isProtectedRoute) {
        return NextResponse.next();
    }

    // For protected routes, validate tokens
    const accessToken = request.cookies.get('accessToken');
    const refreshToken = request.cookies.get('refreshToken');

    if (!accessToken || !isValidToken(accessToken.value)) {
        if (!refreshToken || !isValidToken(refreshToken.value)) {
            // No valid tokens, redirect to login
            const url = new URL('/', request.url);
            url.searchParams.set('authRequired', 'true');
            return NextResponse.redirect(url);
        } else {
            const token = await tokenRefresh();
            console.log(token, "middleware token refresh");
            if (token) {
                return NextResponse.next();
            } else {
                const url = new URL('/', request.url);
                url.searchParams.set('authRequired', 'true');
                return NextResponse.redirect(url);
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|favicon.ico).*)?'],
}
