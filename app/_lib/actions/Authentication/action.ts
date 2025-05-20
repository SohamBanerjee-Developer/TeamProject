"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {toast} from "react-toastify";

/**
 * Logs in a user by sending login data to the API.
 * Sets the accessToken and role as cookies on success.
 * Redirects to homepage.
 */
export const userLogin = async (data: FormData): Promise<void> => {
    try {
        const res = await axios.post("http://localhost:3000/api/auth/user/login", data);
        const {
            data: { accessToken, role },
        } = res.data;

        const cookieStore = await cookies();

        cookieStore.set("accessToken", accessToken, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
            httpOnly: true,
            sameSite: "strict",
        });

        cookieStore.set("role", role, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
        });

        redirect("/");
    } catch (e: unknown) {
        // Don't block Next.js redirects
        if (axios.isAxiosError(e)) {
            console.error("Axios Error:", e.response?.data?.message || e.message);
            toast.error(e.response?.data?.message || "Login failed. Please try again.")

        } else {
            console.error("Unknown Error:", e);
            // toast.error( "Login failed. Please try again.")
        }
    }
};

/**
 * Registers a user by sending signup data to the API.
 * Redirects to login page on success.
 */
export const userSignup = async (data: FormData): Promise<void> => {
    try {
        await axios.post("http://localhost:3000/api/auth/user/signup", data);
        redirect("/auth/login");
    } catch (e: unknown) {
        // Don't block Next.js redirects

        if (axios.isAxiosError(e)) {
            console.error("Axios Error:", e.response?.data?.message || e.message);
            toast.error(e.response?.data?.message || "Signup failed. Please try again.")

        } else {
            console.error("Unknown Error:", e);
            // toast.error( "An unexpected error occurred during signup.")
        }
    }
};
