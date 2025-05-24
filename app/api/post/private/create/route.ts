import {asyncHandler} from "@/app/_utils/helper";
import {AppError, AppResponse} from "@/app/_utils";
import {NextRequest} from "next/server";
import {HomeStay, IHome} from "@/app/_lib/models/HomeStay";
import {databaseConnection} from "@/app/_lib/db/database";
import {ObjectId} from "mongodb";


const createPost = async (req: NextRequest) => {
    await databaseConnection();

    const user_id = req.headers.get("user_id") as string;
    if (!user_id) {
        throw new AppError("Invalid request, please provide all fields And must be authenticate", 400);
    }

    const {
        tittle,
        details,
        caption,
        rent,
        maxRoom,
        associateUniversity,
        location,
        thumbnail,
        houseNumber
    } = await req.json() as IHome;

    if ([tittle, details, caption, location, houseNumber].some((item) => item.trim() === "")) {
        throw new AppError("Invalid data", 400);
    }

    if (!maxRoom || !rent || !thumbnail || !associateUniversity) {
        throw new AppError("Must be provided required fields", 400);
    }

    const checkIsDuplicate = await HomeStay.findOne({
        $and: [{associateUniversity}, {houseNumber}]
    })

    if (checkIsDuplicate) {
        throw new AppError("Post already exist!", 400, false, "Post already exist");
    }

    const createPost = await HomeStay.create({
        tittle,
        details,
        caption,
        rent,
        maxRoom,
        associateUniversity: new ObjectId(String(associateUniversity)),
        location,
        thumbnail,
        ownerId: new ObjectId(user_id),
        houseNumber
    }) as IHome;

    if (!createPost._id) {
        throw new AppError("Post not created! please try again later!", 500, false, "Post not created");
    }

    const postResponse = await HomeStay.aggregate([
        {
            $match: {_id: createPost._id}
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
            $unwind: "$owner"
        }, {
            $unwind: "$university"
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
            }
        }
    ]);

    return Response.json(new AppResponse(postResponse[0], "Post created successfully", true, 200))
}

export const POST = asyncHandler(createPost)