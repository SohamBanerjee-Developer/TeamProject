import type {NextRequest} from "next/server";
import {asyncHandler} from "@/app/_utils/helper";
import {univerSity} from "@/app/_lib/models/University";
import {AppError, AppResponse} from "@/app/_utils";
import {databaseConnection} from "@/app/_lib/db/database";

const getUniversities = async (req: NextRequest) => {
    await databaseConnection();

    const {searchParams} = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const universities = await univerSity.find().skip((page - 1) * limit).limit(limit).exec();

    if (universities.length === 0) throw new AppError("No universities found", 404);

    const totalUniversities = await univerSity.countDocuments();

    return Response.json(new AppResponse({
        universities,
        totalUniversities,
        totalPages: Math.ceil(totalUniversities / limit)
    }, "Universities fetched successfully", true, 200))
}

export const GET = asyncHandler(getUniversities)