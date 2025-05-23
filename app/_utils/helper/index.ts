/* eslint-disable */

import { AppError } from "@/app/_utils";


type AsyncHandler<T extends any[] = any> = (...args: T) => Promise<Response>;

export const asyncHandler = <T extends any[] = any>(fn: AsyncHandler<T>): AsyncHandler<T> => {
    return async (...args: T): Promise<Response> => {
        try {
            return await fn(...args);
        } catch (error: unknown) {
            if (error instanceof AppError) {
                return Response.json(
                    { flag: false, message: error.message },
                    { status: error.code }
                );
            }

            if (error instanceof Error) {
                return Response.json(
                    { flag: false, message: error.message },
                    { status: 500 }
                );
            }

            return Response.json(
                { flag: false, message: "Unknown error occurred" },
                { status: 500 }
            );
        }
    };
};


export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

