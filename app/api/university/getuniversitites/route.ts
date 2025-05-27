import {asyncHandler} from "@/app/_utils/helper";
import {univerSity} from "@/app/_lib/models/University";
import {AppError, AppResponse} from "@/app/_utils";
import {databaseConnection} from "@/app/_lib/db/database";

const getUniversities = async () => {
    await databaseConnection();

    const universities = await univerSity.find();
    if (universities.length === 0) throw new AppError("No universities found", 404);

    const totalUniversities = await univerSity.countDocuments();

    return Response.json(new AppResponse({
        universities,
        totalUniversities,
    }, "Universities fetched successfully", true, 200))
}

export const GET = asyncHandler(getUniversities)