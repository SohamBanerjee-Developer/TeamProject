"use server"

import {IHome} from "@/app/_lib/models/HomeStay";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";
import {JwtPayload} from "jsonwebtoken";
import {decryptUserId} from "@/app/_utils/jose/helper";
import {HomeStayItem} from "@/app/_components/Home/HomeStay/Edit";


interface Thumbnail {
    url: string;
    publicId: string;
}

interface university {
    name: string;
    _id: string;
}

export interface HomeStayData {
    title: string;
    caption: string;
    maxRoom: number;
    rent: number;
    details: string;
    location: string;
    associatedUniversity: string; // assuming this is an ID string
    houseNumber: string;
    thumbnail: Thumbnail;
    postId?: string,
    _id?: string | unknown
}

export interface pgUpdate {
    _id: string;
    title: string; // ⚠️ Consider correcting to `title` for consistency
    caption: string;
    thumbnail: {
        url: string;
        publicId: string;
    };
    maxRoom: number;
    rent: number;
    details: string;
    location: string;
    associatedUniversity: string;
    houseNumber: string;
}

export const createPg = async (pg:HomeStayData) => {


    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value || "";
    let validSession: { _id: string; email: string; iat: number; exp: number } | null | JwtPayload = null;

    if (token) {
        try {
            validSession = await decryptUserId(token);
            // console.log(validSession)

        } catch {
            validSession = null;
        }
    }
    if (!validSession?._id) {
        return {error: "login", flag: false};
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/homestay/private/create`,{
        body: JSON.stringify(pg),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user_id": String(validSession?._id)
        }
    });

    if (!res.ok) {
        return {error: "login"};
    }

    const resData = await res.json();

    if (!resData.flag) {
        return {error: resData.message, flag: false};
    }

    revalidatePath("/home/homestay")
}

export const updatePg = async (pg:HomeStayItem) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value || "";
    let validSession: { _id: string; email: string; iat: number; exp: number } | null | JwtPayload = null;

    if (token) {
        try {
            validSession = await decryptUserId(token);
        } catch {
            validSession = null;
        }
    }
    if (!validSession?._id) {
        return {error: "login", flag: false};
    }

    const res = await fetch(`${process.env.DEPLOY_URL}/api/homestay/private/update`,{
        body: JSON.stringify(pg),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user_id": String(validSession?._id)
        }

    });
    if (!res.ok) {
        return {error: "login"};
    }
    const resData = await res.json();

    if (!resData.flag) {
        return {error: resData.message};
    }

    revalidatePath("/home/homestay")
    return true;
}

export const deletePg = async (pgId:string) =>{

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value || "";
    let validSession: { _id: string; email: string; iat: number; exp: number } | null | JwtPayload = null;

    if (token) {
        try {
            validSession = await decryptUserId(token);
            // console.log(validSession)

        } catch {
            validSession = null;
        }
    }
    if (!validSession?._id) {
        return {error: "login", flag: false};
    }

    const res = await fetch(`${process.env.DEPLOY_URL}/api/homestay/private/delete`,{
        body: JSON.stringify({pgId}),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user_id": String(validSession?._id)
        }
    })

    if (!res.ok) {
        return {error: "login"};
    }
    const resData = await res.json();

    if (!resData.flag) {
        return {error: resData.message};
    }

    revalidatePath("/home/homestay");
    return {flag: true}
}