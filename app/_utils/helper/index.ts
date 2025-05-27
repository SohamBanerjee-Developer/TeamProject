/* eslint-disable */

import {AppError} from "@/app/_utils";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {decryptUserId} from "@/app/_utils/jose/helper";

type AsyncHandler<T extends any[] = any> = (...args: T) => Promise<Response>;

export const asyncHandler = <T extends any[] = any>(fn: AsyncHandler<T>): AsyncHandler<T> => {
    return async (...args: T): Promise<Response> => {
        try {
            return await fn(...args);
        } catch (error: unknown) {
            if (error instanceof AppError) {
                console.log(error.message)

                return Response.json(
                    {flag: false, message: error.message},
                    {status: error.code}
                );
            }

            if (error instanceof Error) {
                console.log(error.message)
                return Response.json(
                    {flag: false, message: error.message},
                    {status: 500}
                );
            }

            return Response.json(
                {flag: false, message: "Unknown error occurred"},
                {status: 500}
            );
        }
    };
};


export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const getToken = async (): Promise<string> => {
    try {
        const cookie = await cookies();
        const {_id} = await decryptUserId(cookie.get("accessToken")?.value || "");
        return _id;
    } catch (e: unknown) {
        console.log(e);
        redirect("/auth/login")
    }
}