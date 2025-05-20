"use server";

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const userLogin = async (fromData: FormData): Promise<{ error?: string }> => {
    const res = await fetch("https://team-project-livid.vercel.app/api/auth/user/login", {
        method: "POST",
        body: fromData,
    })

    const {data} = await res.json()

    if (!data.accessToken) {
        return {error: "Invalid credentials"}
    }


    const cookieStore = await cookies();

    cookieStore.set("accessToken", data.accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
        httpOnly: true,
        sameSite: "strict",
    });

    cookieStore.set("role", data.role, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
    });

    redirect("/");
};

/**
 * Registers a user by sending signup data to the API.
 * Redirects to login page on success.
 */
export const userSignup = async (data: FormData): Promise<{ error?: string }> => {
    const res = await fetch("https://team-project-livid.vercel.app/api/auth/user/signup", {
        method: "POST",
        body: data,
    })

    const resData = await res.json();

    if (!resData.flag) {
        return {error: resData.message};
    }
    redirect("/auth/login");
};
