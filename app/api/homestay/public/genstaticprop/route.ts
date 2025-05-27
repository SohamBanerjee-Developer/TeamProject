
import {asyncHandler} from "@/app/_utils/helper";
import {AppError, AppResponse} from "@/app/_utils";
import {databaseConnection} from "@/app/_lib/db/database";
import {HomeStay} from "@/app/_lib/models/HomeStay";

const getHomeStay = async () => {
    await databaseConnection();

    const Homestays = await HomeStay.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "ownerId",
                    foreignField: "_id",
                    as: "owner"
                }
            },
            {
                $lookup: {
                    from: "universities",
                    localField: "associateUniversity",
                    foreignField: "_id",
                    as: "university"
                }
            },
            {
                $lookup: {
                    from: "upvotes",
                    localField: "_id",
                    foreignField: "postId",
                    as: "upvote"
                }
            },
            {
                $unwind: {
                    path: "$owner",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$university",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    tittle: 1,
                    caption: 1,
                    rent: 1,
                    thumbnail: 1,
                    university: "$university.name",
                    ownername: "$owner.fullName",
                    ownerVerified: "$owner.isVerified",
                    upvoteCount: {$size: "$upvote"}
                }
            }
        ]
    );

    if (Homestays.length === 0) throw new AppError("No homestays found", 404);

    return Response.json(new AppResponse({
        Homestays,
    }, "Homestays fetched successfully", true, 200))
}

export const GET = asyncHandler(getHomeStay)