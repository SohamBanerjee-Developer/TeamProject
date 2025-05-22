import type {NextRequest} from "next/server";
import {databaseConnection} from "@/app/_lib/db/database";
import {asyncHandler} from "@/app/_utils/helper";
import {AppError, AppResponse} from "@/app/_utils";
import {univerSity} from "@/app/_lib/models/University";


const searchUniversity = async (req: NextRequest) => {
    await databaseConnection();

    const {searchParams} = new URL(req.url);
    const identifier = searchParams.get("identifier")?.toString() || "";


    // ❗Ensure at least one valid input
    if (!identifier) {
        throw new AppError("Invalid request: Provide universityName or governmentId", 400);
    }

    const findUniversity = await univerSity.findById(identifier);

    if (!findUniversity) {
        throw new AppError("No universities found", 404);
    }

    return Response.json(
        new AppResponse(findUniversity, "Universities fetched successfully", true, 200)
    );
};


export const GET = asyncHandler(searchUniversity);
