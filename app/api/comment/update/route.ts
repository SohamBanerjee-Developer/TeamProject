import { NextRequest } from "next/server";
import { asyncHandler } from "@/app/_utils/helper";
import { AppError, AppResponse } from "@/app/_utils";
import { CommentModel } from "@/app/_lib/models/Comment";

const commentUpdateHandler = async (req: NextRequest) => {
    const user_id = req.headers.get("user_id") as string;

    if (!user_id) throw new AppError("Please validate your credential", 401);

    const { commentId, body } = await req.json();

    if (!commentId || commentId.trim() === "") {
        throw new AppError("Please provide a commentId", 400);
    }

    if (!body || body.trim() === "") {
        throw new AppError("Please provide the updated comment body", 400);
    }

    // Find the comment to verify ownership before updating
    const comment = await CommentModel.findOne({
        $and:[{_id: commentId}, {userId: user_id}]
    });

    if (!comment) {
        throw new AppError("Comment not found OR You are not a valid person", 404);
    }

    // Update the comment body
    comment.body = body;
    const updatedComment = await comment.save();

    if (!updatedComment) {
        throw new AppError("Something went wrong, please try again", 500);
    }

    return Response.json(new AppResponse(updatedComment, "Comment updated successfully", true, 200));
}

export const PUT = asyncHandler(commentUpdateHandler);
