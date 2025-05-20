
import type {NextRequest} from "next/server";
import {AppResponse} from "@/app/_utils";
import {AppError} from "@/app/_utils";
import {IUser, User} from "@/app/_lib/models/User";
import {asyncHandler} from "@/app/_utils/helper";


export const verifyUser = async (req: NextRequest) => {
    const {userId, otp} = await req.json();


    if (!userId || !otp) {
        throw new AppError("Invalid request, please provide all fields", 400)
    }

    const getUser = await User.findById(userId) as IUser;
    if (!getUser) {
        throw new AppError("User not found", 404)
    }

    if (Date.now() > new Date(getUser.expiryTime).getTime()) {
        throw new AppError("OTP expired", 400);
    }

    if (otp !== getUser.verificationCode) {
        throw new AppError("Invalid OTP", 400);
    }

    getUser.verificationCode = "";
    await getUser.save({validateBeforeSave: false});

    return Response.json(new AppResponse("ok", "OTP verified successfully", true));
}

export const POST = asyncHandler(verifyUser);