import {asyncHandler} from "@/app/_utils/helper";
import {AppResponse} from "@/app/_utils";
import {NextRequest} from "next/server";
import {imageUploader} from "@/app/_lib/cloudinary/helper";

const createPost = async (req: NextRequest) => {

    const id = req.headers.get("user_id")
    const formData = await req.formData();
    const photos = formData.get("thumbnail") as File;


    // const resImage = await imageUploader()
    return Response.json(new AppResponse({id}, "Response get  successfully"));
}

export const POST = asyncHandler(createPost)