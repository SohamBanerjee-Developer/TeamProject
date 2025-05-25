import { Post } from "@/app/_lib/models/Community";
import { asyncHandler } from "@/app/_utils/helper";
import { communityPostSchema } from "@/app/_utils/zod";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(
    async (req: NextRequest)=>{
    const body = await req.json()
    const universityId = body.universityId
     
    
    return NextResponse.json({
        message: "got all the posts"
    })
   
})



export const POST = asyncHandler(
    async (req: NextRequest) =>{
    return NextResponse.json({
        message: "successfully posted"
    })
    
})

export function PUT(){

    NextResponse.json({
        message: " successfully updated the post"
    })
}

export function DELETE () {

    NextResponse.json({
        message: "successfully deleted all the posts"
    })
}