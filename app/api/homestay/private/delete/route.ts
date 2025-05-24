import {NextRequest} from "next/server";
import {AppError, AppResponse} from "@/app/_utils";
import {HomeStay} from "@/app/_lib/models/HomeStay";
import {asyncHandler} from "@/app/_utils/helper";

const handleDelete = async (req:NextRequest) => {
    const {post_id} = await req.json();

    if (!post_id) {
        throw new AppError("No post_id found!", 400);
    }

    const deletePost = await HomeStay.findByIdAndDelete(post_id);

    if (!deletePost) {
        throw new AppError("No post_id found!", 400);
    }


    return Response.json(new AppResponse(deletePost, "post deleted successfully"));
}

export const DELETE = asyncHandler(handleDelete);