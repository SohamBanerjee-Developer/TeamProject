"use server"

import axios from "axios";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";


export const userLogin = async (data: FormData): Promise<void> => {
    try {
        const res = await axios.post("http://localhost:3000/api/auth/user/login", data);
        const {data:{accessToken, role}} = res.data;

        const cookie = await cookies();

        cookie.set("accessToken", accessToken, {
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
            httpOnly: true,
            sameSite: "strict",
        });

        cookie.set("role", role, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
        })
        cookie.set("verify", "false", {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
        })
        
        redirect("/auth/verify");
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            console.error("Axios Error:", e.response?.data?.message || e.message);
            throw new Error(e.response?.data?.message || "Something went wrong");
        } else {
            console.error("Unknown Error:", e);
            throw e;
        }
    }
};


export const userSignup = async (data: FormData): Promise<void> => {
    try {
        const res = await axios.post("http://localhost:3000/api/auth/user/signup", data);
        const resData = res.data;
        console.log("I am called", resData);
        redirect("/auth/login");
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            console.error("Axios Error:", e.response?.data?.message || e.message);
            throw new Error(e.response?.data?.message || "Something went wrong");
        } else {
            console.error("Unknown Error:", e);
            throw e;
        }
    }
};

