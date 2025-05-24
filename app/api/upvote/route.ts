import {NextRequest} from "next/server";
import {AppError, AppResponse} from "@/app/_utils";
import {Upvote} from "@/app/_lib/models/Review";
import {HomeStay} from "@/app/_lib/models/HomeStay";
import {asyncHandler} from "@/app/_utils/helper";

export const handelUpvote = async (req: NextRequest) => {
    const user_id = req.headers.get("user_id") as string;
    const {post_id,} = await req.json() as { post_id: string};


    if (!user_id || !post_id) {
        throw new AppError("Invalid request, please provide all fields", 400)
    }

    const isPostExist = await HomeStay.findById(post_id);

    if (!isPostExist) {
        throw new AppError("Post not found", 404);
    }

    const findUpvote = await Upvote.findOne({
        $and: [{postId: post_id}, {userId: user_id}]
    });

    let totalUpvote = 0;

    if (findUpvote) {
        await Upvote.findByIdAndDelete(findUpvote._id);
        totalUpvote = await Upvote.countDocuments({postId: post_id});
        return Response.json(new AppResponse(totalUpvote, "Upvote removed successfully", true));
    }

    await Upvote.create({postId: post_id, userId: user_id});

    totalUpvote = await Upvote.countDocuments({postId: post_id});
    //
    return Response.json(new AppResponse(totalUpvote, "Upvote added successfully", true));
}

export const POST = asyncHandler(handelUpvote);