import type {NextRequest} from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {AppError, AppResponse} from "@/app/_utils";
import {IUser, User} from "@/app/_lib/models/User";
import {asyncHandler, generateOTP} from "@/app/_utils/helper";
import {OtpVerificationHelper} from '@/app/_lib/resend/OtpVerification'
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

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 1000 * 60 * 5);

    const refreshToken = jwt.sign({_id: isUserExist._id, email: isUserExist.email}, process.env.SECRET_KEY || "", {expiresIn: "1d"});
    const accessToken = jwt.sign({_id: isUserExist._id}, process.env.SECRET_KEY || "", {expiresIn: "1h"});

    isUserExist.verificationCode = otp;
    isUserExist.expiryTime = otpExpires;
    isUserExist.refreshToken = refreshToken;
    isUserExist.accessToken = accessToken;

    await isUserExist.save({validateBeforeSave: false});

    const msgRes = await OtpVerificationHelper(isUserExist.fullName, otp, isUserExist.email);

    if (!msgRes.flag) throw new AppError("something wants wrong, please try again later", 500, false, "User not found");

    return Response.json(new AppResponse({accessToken, refreshToken}, "User logged in successfully", true, 200))
}

export const POST = asyncHandler(userLoginHandler)