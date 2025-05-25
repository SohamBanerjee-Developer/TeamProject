
import {NextRequest, NextResponse} from "next/server";
// Removed import { cookies } from "next/headers" because it's not usable in middleware
import {decryptUserId} from "@/app/_utils/jose/helper";
import {JwtPayload} from "jsonwebtoken";
import {cookies} from "next/headers";


export async function middleware(request: NextRequest) {
    try {
        const pathname = request.nextUrl.pathname;
        const isPublicRoute = pathname.startsWith("/auth");

        // Get token from cookies in middleware
        const token = request.cookies.get("accessToken")?.value || "";

        let validSession: { _id: string; email: string; iat: number; exp: number } | null | JwtPayload = null;

        if (token) {
            try {
                validSession = await decryptUserId(token);
            } catch {
                validSession = null;
            }
        }

        // Redirect logged-in users away from /auth routes to home
        if (validSession?._id && isPublicRoute) {
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }

        // Redirect unauthenticated users trying to access protected routes to login
        if (!validSession?._id && !isPublicRoute) {

            const cookieStore = await cookies();
            cookieStore.delete("accessToken");
            cookieStore.delete("role");
            return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
        }


        if (validSession?._id) {
            const newHeaders = new Headers(request.headers);
            newHeaders.set("user_id", validSession?._id);

            return NextResponse.next({
                headers: newHeaders,
            });
        }

        // For public routes and no session, just continue
        return NextResponse.next();
    } catch (error) {
        console.error("middleware error:", error);
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
}

export const config = {
    matcher: ["/auth/:path*", "/api/homestay/private/:path*", "/home/university/:path+", "/api/upvote", "/api/comment/:path*"],

};
