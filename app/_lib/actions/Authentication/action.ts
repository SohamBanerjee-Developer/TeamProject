"use server";

import {cookies} from "next/headers";
import {decryptUserId} from "@/app/_utils/jose/helper";



export const userLogin = async (fromData: FormData): Promise<{ error?: string } | void> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/login`, {
        method: "POST",
        body: fromData,
    })

    const resData = await res.json();

    if (resData.code === 401 || resData.code === 400 || resData.flag === false) {
        return {error: resData.message || "Invalid credentials"};
    }


    const cookieStore = await cookies();

    cookieStore.set("accessToken", resData.data.accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
        httpOnly: true,
        sameSite: "strict",
    });

    cookieStore.set("role",resData.data.role, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
    });
};

/**
 * Registers a user by sending signup data to the API.
 * Redirects to login page on success.
 */

export const userSignup = async (data: FormData): Promise<{ error?: string } | void> => {
    const res = await fetch(`${process.env.DEPLOY_URL}/api/auth/user/signup`, {
        method: "POST",
        body: data,
    })

    const resData = await res.json();

    if (resData.code === 401 || resData.code === 400 || resData.flag === false) {
        return {error: resData.message || "Invalid credentials"};
    }

};

export const userSession = async ():Promise<{userId:string} | null> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "";
    let userValid: {userId:string} | null = null;
    try {
        const {_id} = await decryptUserId(accessToken);
        userValid = {userId: _id};
    }catch {
        userValid = null;
    }

    return userValid;
}

export const userLogout = async ():Promise<{ flag: boolean}> => {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("role");
    return {flag: true}
}