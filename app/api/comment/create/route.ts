import {NextRequest} from "next/server";
import {asyncHandler} from "@/app/_utils/helper";
import {AppError, AppResponse} from "@/app/_utils";
import {CommentModel} from "@/app/_lib/models/Comment";

const commentHandler = async (req: NextRequest) => {
    const user_id = req.headers.get("user_id") as string;

    if (!user_id) throw new AppError("Please validate your credential ", 401);

    const {postId, body, postModel} = await req.json();

    if ([postId, body, postModel].some((item) => item.trim() === "")) {
        throw new AppError("Please provide all fields", 400);
    }

    const newComment = await CommentModel.create({
        userId: user_id,
        postId,
        body,
        postModel
    });

    if (!newComment) throw new AppError("Something went wrong, please try again", 500);

    return Response.json(new AppResponse(newComment, "Comment added successfully", true, 200));
}

export const POST = asyncHandler(commentHandler)