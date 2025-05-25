import type {NextRequest} from "next/server";
import {databaseConnection} from "@/app/_lib/db/database";
import {asyncHandler} from "@/app/_utils/helper";
import {AppError, AppResponse} from "@/app/_utils";
import {univerSity} from "@/app/_lib/models/University";

// 🛡️ Utility: Escapes regex special characters from user input
function escapeRegex(str: string): string {
    const data = str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

    return data;
}

const searchUniversity = async (req: NextRequest) => {
    await databaseConnection();
    console.log(req.headers.get("user_id"))

    const {searchParams} = new URL(req.url);
    const identifier = searchParams.get("identifier");

    // ❗Ensure at least one valid input
    if (!identifier) {
        throw new AppError("Invalid request: Provide universityName or governmentId", 400);
    }


    const findUniversity = await univerSity.find({
        $or: [{
            name: {
                $regex: `^${escapeRegex(identifier)}`,
                $options: 'i'
            }
        },
            {
                governmentId: {
                    $regex: `^${escapeRegex(identifier)}`,
                    $options: 'i'
                }
            },
        ]
    });

    if (!findUniversity.length) {
        throw new AppError("No universities found", 404);
    }

    return Response.json(
        new AppResponse(findUniversity, "Universities fetched successfully", true, 200)
    );
};


export const GET = asyncHandler(searchUniversity);
