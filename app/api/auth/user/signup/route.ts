import type {NextRequest} from "next/server";
import {asyncHandler} from "@/app/_utils/helper";
import {AppError, AppResponse} from "@/app/_utils";
import {IUser, User} from "@/app/_lib/models/User";
import {databaseConnection} from "@/app/_lib/db/database";
import bcrypt from "bcryptjs";
import {welcomeMessageHelper} from "@/app/_lib/resend/WelcomeMessage";




const userLoginHandler = async (req: NextRequest): Promise<Response> => {
    await databaseConnection();

    const data = await req.formData();

    const fullName = data.get("fullName")?.toString();
    const phoneNumber = data.get("phoneNumber")?.toString();
    const addharCard = data.get("addharCard")?.toString();
    const address = data.get("address")?.toString();
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    const role = data.get("role") as "user" | "owner";

    if ([fullName,
        phoneNumber,
        addharCard,
        address,
        email,
        password, role].some((item) => item?.trim() === "")) {
        throw new AppError("All fields are required!", 401, false, "Fields is required");
    }

    const isUserExist = await User.findOne({
        $or: [{email}, {phoneNumber}, {addharCard}]
    });


    if (isUserExist) {
        throw new AppError("User already exist!", 308, false, "User already exist");
    }

    const hashedPassword = await bcrypt.hash(password || "", 10);


    const userCreate = await User.create({
        fullName,
        phoneNumber,
        addharCard,
        address,
        email,
        password: hashedPassword,
        role,
    }) as IUser;


    if (!userCreate._id) {
        throw new AppError("User not created! please try again later!", 500, false, "User not created");
    }

   const msgRes =  await welcomeMessageHelper(userCreate.email, userCreate.fullName);

    if (!msgRes.flag) {
        await User.findByIdAndDelete(userCreate._id);
        throw new AppError("User not created! please try again later!", 500, false, "User not created");
    }

    return Response.json(new AppResponse( "ok", "User created successfully!", true));
}

export const POST = asyncHandler(userLoginHandler)