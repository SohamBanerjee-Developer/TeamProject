import type {NextRequest} from "next/server";
import {databaseConnection} from "@/app/_lib/db/database";
import {asyncHandler} from "@/app/_utils/helper";
import {AppError, AppResponse} from "@/app/_utils";
import {HomeStay} from "@/app/_lib/models/HomeStay";
import {ObjectId} from "mongodb";


const searchUniversity = async (req: NextRequest) => {
    await databaseConnection();

    const {searchParams} = new URL(req.url);
    const identifier = searchParams.get("identifier")?.toString() || "";


    // ❗Ensure at least one valid input
    if (!identifier) {
        throw new AppError("Invalid request: Provide post id", 400);
    }

    const findHomeStay = await HomeStay.aggregate([
        {
            $match: {_id: new ObjectId(identifier)}
        },
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
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "postId",
                as: "review",
                pipeline: [
                    {
                        $lookup: {
                            from: "upvotes",
                            localField: "_id",
                            foreignField: "postId",
                            as: "upvote"
                        }
                    },
                    {
                        $addFields: {
                            commentUpvotes: {$size: "$upvote"}
                        }
                    },
                    {

                        $project: {
                            _id: 1,
                            userId: 1,
                            postId: 1,
                            postModel: 1,
                            body: 1,
                            createdAt: 1,
                            updatedAt: 1,
                            commentUpvotes: 1
                        }
                    }
                ]
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
            $unwind: {
                path: "$university",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                tittle: 1,
                details: 1,
                caption: 1,
                rent: 1,
                maxRoom: 1,
                associateUniversity: 1,
                location: 1,
                thumbnail: 1,
                houseNumber: 1,
                owner: {
                    _id: 1,
                    fullName: 1,
                    email: 1,
                    phoneNumber: 1,
                    isVerified: 1,
                },
                university: {
                    _id: 1,
                    name: 1,
                },
                totalUpvotes: {$size: "$upvote"},
                review: 1
            }
        }])

    if (findHomeStay.length === 0) {
        throw new AppError("No universities found", 404);
    }

    return Response.json(
        new AppResponse(findHomeStay[0], "Universities fetched successfully", true, 200)
    );
};


export const GET = asyncHandler(searchUniversity);