import { postModel } from "@/app/_lib/models/Community";
import { AppError } from "@/app/_utils";
import { asyncHandler } from "@/app/_utils/helper";
import { communityPostSchema } from "@/app/_utils/zod/community";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest)=>{
    const Body = await req.json()
    const parsedBody = communityPostSchema.safeParse(Body)
    if(!parsedBody.success){
        return NextResponse.json({
            message: "invalid inputs",
            error: parsedBody.error
        })
        
    }
    const userId =  req.headers.get('userId') as string
    const universityId = req.headers.get('universityId') as string
    const {title, body, documentUrl, hashtag} = Body
    await postModel.create({
        userId,
        universityId,
        title,
        documentUrl,
        body,
        hashtag
    })

    return NextResponse.json({
        message: "suceesfully post is created"
    })
})

export const PUT = asyncHandler(
    async (req: NextRequest)=>{
        const Body = await req.json()
    const parsedBody = communityPostSchema.safeParse(Body)
    if(!parsedBody.success){
        return NextResponse.json({
            message: "invalid inputs",
            error: parsedBody.error
        })
        
    }
    const userId =  req.headers.get('userId') as string
    const universityId = req.headers.get('universityId') as string
    const postId = req.headers.get('postId') as string
    const {title, body, documentUrl, hashtag} = Body
    await postModel.updateOne({_id:{postId}},{title,body,documentUrl,hashtag})
        return NextResponse.json({
            message: " updated successfully"
        })
    }
)

export const DELETE = asyncHandler(
    async(req:NextRequest)=>{
        
    const userId =  req.headers.get('userId') as string
    const universityId = req.headers.get('universityId') as string
    const postId = req.headers.get('postId') as string

    await postModel.deleteOne({_id:{postId}})
        return NextResponse.json({
            message: "successfully deleted post"
        })
    }
)