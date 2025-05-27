import {asyncHandler} from "@/app/_utils/helper";
import {AppError, AppResponse} from "@/app/_utils";
import {NextRequest} from "next/server";
import {HomeStay, IHome} from "@/app/_lib/models/HomeStay";
import {databaseConnection} from "@/app/_lib/db/database";
import {ObjectId} from "mongodb";

interface reqJson extends IHome {
    postId: string;
}

const updatePost = async (req: NextRequest) => {
    await databaseConnection();

    const user_id = req.headers.get("user_id") as string;

    if (!user_id) {
        throw new AppError(
            "Invalid request, please provide all fields and must be authenticated",
            400
        );
    }

    const {
        title,
        details,
        caption,
        rent,
        maxRoom,
        associatedUniversity,
        location,
        thumbnail,
        houseNumber,
        _id
    } = (await req.json()) as reqJson;

    if (!_id) {
        throw new AppError("Invalid or missing post ID", 400);
    }
    // Validate required fields
    if ([title, details, caption, location, houseNumber].some((item) => item.trim() === "")) {
        throw new AppError("Invalid data", 400);
    }

    if (!maxRoom || !rent || !thumbnail || !associatedUniversity) {
        throw new AppError("Must provide required fields", 400);
    }


    const existingPost = await HomeStay.findOne({_id: new ObjectId(String(_id))});

    if (!existingPost) {
        throw new AppError("Post not found", 404);
    }

    if (existingPost.ownerId.toString() !== user_id) {
        throw new AppError("Unauthorized to update this post", 403);
    }


    // Update the post
    const updated = await HomeStay.findOneAndUpdate(
        {_id: new ObjectId(String(_id))},
        {
            $set: {
                title,
                details,
                caption,
                rent,
                maxRoom,
                associatedUniversity: new ObjectId(String(associatedUniversity)),
                location,
                thumbnail,
                houseNumber,
            },
        },
        {returnDocument: "after"}
    );

    if (!updated) {
        throw new AppError("Failed to update post", 500);
    }

    // Aggregate to populate owner and university details
    const postResponse = await HomeStay.aggregate([
        {$match: {_id: updated._id}},
        {
            $lookup: {
                from: "users",
                localField: "ownerId",
                foreignField: "_id",
                as: "owner",
            },
        },
        {
            $lookup: {
                from: "universities",
                localField: "associateUniversity",
                foreignField: "_id",
                as: "university",
            },
        },
        {$unwind: "$owner"},
        {$unwind: "$university"},
        {
            $project: {
                _id: 1,
                tittle: 1,
                details: 1,
                caption: 1,
                rent: 1,
                maxRoom: 1,
                associatedUniversity: 1,
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
            },
        },
    ]);

    return Response.json(
        new AppResponse(postResponse[0], "Post updated successfully", true, 200)
    );
};

export const PUT = asyncHandler(updatePost);
