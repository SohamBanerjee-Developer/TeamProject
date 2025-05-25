import { NextRequest } from "next/server";
import { asyncHandler } from "@/app/_utils/helper";
import { AppError, AppResponse } from "@/app/_utils";
import { CommentModel } from "@/app/_lib/models/Comment";

const commentDeleteHandler = async (req: NextRequest) => {
    const user_id = req.headers.get("user_id") as string;

    if (!user_id) throw new AppError("Please validate your credential", 401);

    const { commentId } = await req.json();

    if (!commentId || commentId.trim() === "") {
        throw new AppError("Please provide a commentId", 400);
    }

    const deletedComment = await CommentModel.findByIdAndDelete(commentId);

    if (!deletedComment) {
        throw new AppError("Something went wrong, please try again", 500);
    }

    return Response.json(new AppResponse(deletedComment, "Comment deleted successfully", true, 200));
}

export const DELETE = asyncHandler(commentDeleteHandler);
