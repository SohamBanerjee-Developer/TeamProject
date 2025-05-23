import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {decryptUserId} from "@/app/_utils/jose/helper";


export async function middleware(request: NextRequest) {
    try {
        const pathname = request.nextUrl.pathname;
        const isPublicRoute = pathname.startsWith("/auth");

        const store = await cookies();
        const token = store.get("accessToken")?.value as string;

        const validSession = await decryptUserId(token) as { _id: string, email: string, iat: number, exp: number };

        // ✅ If a user is logged in and trying to access /auth routes, redirect to home
        if (validSession._id && isPublicRoute) {
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }

        // ⛔️ If a user is NOT logged in and trying to access protected routes, redirect to login
        if (!validSession._id && !isPublicRoute) {
            return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
        }

        const newheader = new Headers(request.headers);
        newheader.set("user_id", String(validSession._id));

        return NextResponse.next({
            headers: newheader
        });

    } catch (e: unknown) {
        const err = e as Error;
        console.log(err.message);
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));

    }
}

export const config = {
    matcher: ["/auth/:path*", "/api/post/private/:path*"], // Adjust this to match all protected routes
};
