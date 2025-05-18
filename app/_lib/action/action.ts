"use server"

import {databaseConnection} from "@/app/_lib/db/database";

export const handleAdminLogin = async (data: FormData): Promise<void> => {
    const identifier = data.get("identifier");
    const password = data.get("password");
    console.log(password)

}

export const loginUser = async (data: FormData): Promise<void> => {
    await databaseConnection();

    const identifier = data.get("identifier");
    const password = data.get("password");

}