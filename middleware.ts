import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export  async function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname;
    const isPublicRoute = pathname.startsWith("/auth");

    const store = await cookies();
    const token = store.get("accessToken")?.value;

    // If user is logged in and trying to access /auth routes, redirect to home
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    // If user is NOT logged in and trying to access protected routes, redirect to login
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }

    // Allow request to continue
    return NextResponse.next();
    
}

    export const config = {
    matcher: ["/", "/auth/:path*"],
};