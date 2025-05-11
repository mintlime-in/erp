import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token)
        return NextResponse.redirect(new URL("/api/auth/signin", request.url));

    // const userid = token.userid as string;
    const roles = token.roles as string[];
    // const permissions = token.permissions as string[];

    if (!isAuthorized(request.nextUrl.pathname, roles)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next()
}

const isAuthorized = (route: string, roles: string[]) => {
    if (roles.includes("admin")) return true;
    const routeConfig = protectedRoutes[route];
    if (!routeConfig) return true;
    if (routeConfig.roles.length === 0) return false;
    return routeConfig.roles.some(role => roles.includes(role));
}

const protectedRoutes: Record<string, { roles: string[] }> = {
    '/admin': {
        roles: ['admin']
    },
    '/user': {
        roles: ['user', 'admin']
    },
    "/dashboard/profile": {
        roles: []
    }
}

export const config = {
    matcher: '/((?!api/auth).*)'
}