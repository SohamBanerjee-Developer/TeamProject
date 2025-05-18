"use server"

import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {databaseConnection} from "@/app/_lib/db/database";
import {AppError} from "@/app/_utils";
import {IUser, User} from "@/app/_lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userLogin = async (data: FormData): Promise<void> => {
    await databaseConnection();
    const identifier = data.get("identifier")?.toString();
    const password = data.get("password")?.toString();

    if (!identifier && !password) {
        throw new AppError("All fields are required!", 401);
    }

    const isUserExist = await User.findOne({
        $or: [{email: identifier}, {username: identifier}]
    }) as IUser | null;

    if (!isUserExist) {
        redirect("/auth/signup/user");
    }

    const isPasswordCorrect = bcrypt.compare(password || "", isUserExist.password);

    if (!isPasswordCorrect) {
        throw new AppError("Invalid user!", 401);
    }

    const generatedToken =  jwt.sign({_id: isUserExist._id}, process.env.SECRET_KEY || "", {expiresIn: "1h"});

    const cookieStore = await cookies();
    cookieStore.set("accessToken",generatedToken, {
        httpOnly: true,
        maxAge: 3600,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    });

    redirect("/auth/verify")
}

export const userSignup = async (data: FormData): Promise<void> => {
    await databaseConnection();

    const fullName = data.get("fullName")?.toString();
    const phoneNumber = data.get("phoneNumber")?.toString();
    const addharCard = data.get("addharCard")?.toString();
    const address = data.get("address")?.toString();
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();


    if (!fullName || !phoneNumber || !addharCard || !address || !email || !password) {
        throw new AppError("All fields are required!", 400);
    }


    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new AppError("User already exists!", 409);
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({
        fullName,
        phoneNumber,
        addharCard,
        address,
        email,
        password: hashedPassword,
    });

    if (!newUser) {
        throw new AppError("Something went wrong! while creating user", 500);
    }

    // ✅ Redirect to verification
    redirect("/");
};