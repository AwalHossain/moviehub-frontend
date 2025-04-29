import { NextRequest, NextResponse } from "next/server";
import isValidToken from "./utils/validateToken";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/api') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get('accessToken');


    if (pathname === '/' || pathname === '/404') {
        return NextResponse.next();
    }
    
    if (!accessToken || !isValidToken(accessToken.value)) {
        const url = new URL('/', request.url);
        url.searchParams.set('authRequired', 'true'); 
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}




export const config = {
    matcher: ['/((?!_next/static|favicon.ico).*)?'],
}
