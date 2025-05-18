import { AppError } from "@/app/_utils";

type AsyncFunction<T extends any[] = [], R = any> = (...args: T) => Promise<R | AppError>;

export const asyncHandler = <T extends any[] = [], R = any>(
    fn: (...args: T) => Promise<R>
): AsyncFunction<T, R> => {
    return async (...args: T): Promise<R | AppError> => {
        try {
            return await fn(...args);
        } catch (e: unknown) {
            if (e instanceof AppError) {
                return e;
            }

            if (e instanceof Error) {
                return new AppError(e.message, 500);
            }

            return new AppError(String(e) || "Something went wrong!", 500);
        }
    };
};
