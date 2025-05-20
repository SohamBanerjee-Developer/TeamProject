import {NextRequest} from "next/server";
import {AppError, AppResponse} from "@/app/_utils";
import {IUser, User} from "@/app/_lib/models/User";
import {asyncHandler, generateOTP} from "@/app/_utils/helper";
import {OtpVerificationHelper} from "@/app/_lib/resend/OtpVerification";

const resendOtpHelper =  async (req:NextRequest) => {
     const {userId} = await req.json();

     if(!userId) {
         throw new AppError("Invalid request, please provide all fields", 400)
     }

    const getUser = await User.findById(userId) as IUser;
    if (!getUser) {
        throw new AppError("User not found", 404)
    }
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 1000 * 60 * 5);
    getUser.verificationCode = otp;
    getUser.expiryTime = otpExpires;
    await getUser.save({validateBeforeSave: false});
    const msgRes = await OtpVerificationHelper(getUser.fullName, otp, getUser.email);
    if (!msgRes.flag) throw new AppError("something wants wrong, please try again later", 500, false, "User not found");

    return Response.json(new AppResponse("", "Otp sent successfully", true, 200))
}

export const POST = asyncHandler(resendOtpHelper);