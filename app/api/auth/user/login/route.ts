import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import {AppError, AppResponse} from "@/app/_utils";
import {IUser, User} from "@/app/_lib/models/User";
import {asyncHandler} from "@/app/_utils/helper";
import {databaseConnection} from "@/app/_lib/db/database";
import { encryptToken, } from "@/app/_utils/jose/helper";

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

    if (!isUserExist) throw new AppError("Invalid credentials", 401, false, "Invalid credentials");

    const comparePassword = await bcrypt.compare(String(password), isUserExist.password);

    if (!comparePassword) throw new AppError("Invalid credentials", 401, false, "Invalid credentials");


    const refreshToken = await encryptToken({_id: String(isUserExist._id)}, '3h');

    const accessToken =  await encryptToken({_id: String(isUserExist._id), email: isUserExist.email}, '3h');

    isUserExist.refreshToken = refreshToken;
    isUserExist.accessToken = accessToken;


    await isUserExist.save({validateBeforeSave: false});
     const res =  NextResponse.json(new AppResponse({
         accessToken,
         refreshToken,
         role: isUserExist.role
     }, "User logged in successfully", true, 200))

    res.cookies.set("accessToken", accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
        httpOnly: true,
        sameSite: "strict",
    })

    return res;
    // return Response.json(new AppResponse({
    //     accessToken,
    //     refreshToken,
    //     role: isUserExist.role
    // }, "User logged in successfully", true, 200))
}

export const POST = asyncHandler(userLoginHandler)