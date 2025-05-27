
import {NextRequest, NextResponse} from "next/server";
// Removed import { cookies } from "next/headers" because it's not usable in middleware
import {decryptUserId} from "@/app/_utils/jose/helper";
import {JwtPayload} from "jsonwebtoken";



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
                // console.log(validSession)

            } catch {
                validSession = null;
            }
        }


        // Redirect logged-in users away from /auth routes to home
        if (validSession?._id && isPublicRoute) {
            console.log("hello")
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }

        // Redirect unauthenticated users trying to access protected routes to login
        if (!validSession?._id && !isPublicRoute) {
            console.log("hello2");
            const response = NextResponse.redirect(new URL("/auth/login", request.nextUrl));
            response.cookies.delete("accessToken");
            response.cookies.delete("role");
            return response;
        }


        if (validSession?._id) {
            console.log("hello3")
            const newHeaders = new Headers(request.headers);
            newHeaders.set("user_id", validSession?._id);
            return NextResponse.next({
                headers: newHeaders,
            });
        }

        // For public routes and no session, just continue
        console.log("hello4")

        return NextResponse.next();
    } catch (error) {
        console.error("middleware error:", error);
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
}

export const config = {
    matcher: ["/auth/:path*", "/home/university/:path+", "/api/upvote", "/api/comment/:path*", "/home/uploadpg"],
};
