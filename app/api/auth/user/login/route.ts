import type {NextRequest} from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {AppError, AppResponse} from "@/app/_utils";
import {IUser, User} from "@/app/_lib/models/User";
import {asyncHandler} from "@/app/_utils/helper";
import {databaseConnection} from "@/app/_lib/db/database";

const userLoginHandler = async (req: NextRequest) => {
    await databaseConnection();

    const data = await req.formData();

    const identifier = data.get('identifier')?.toString();
    const password = data.get('password')?.toString();

    if ([identifier, password].includes(undefined)) {
        throw new AppError("Invalid data", 400);
    }

    const isUserExist = await User.findOne({
        $or: [{email: identifier}, {addharCard: identifier}]
    }) as IUser;

    if (!isUserExist) return Response.json(new AppResponse("", "User not found", true, 400));

    const comparePassword = await bcrypt.compare(String(password), isUserExist.password);

    if (!comparePassword) throw new AppError("Invalid credentials", 401, false, "Invalid credentials");

    const refreshToken = jwt.sign({
        _id: isUserExist._id,
        email: isUserExist.email
    }, process.env.SECRET_KEY || "", {expiresIn: "1d"});

    const accessToken = jwt.sign({_id: isUserExist._id}, process.env.SECRET_KEY || "", {expiresIn: "1h"});

    isUserExist.refreshToken = refreshToken;
    isUserExist.accessToken = accessToken;

    await isUserExist.save({validateBeforeSave: false});

    return Response.json(new AppResponse({
        accessToken,
        refreshToken,
        role: isUserExist.role
    }, "User logged in successfully", true, 200))
}

export const POST = asyncHandler(userLoginHandler)