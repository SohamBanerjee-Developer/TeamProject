import { hashtagModel, postModel } from "@/app/_lib/models/Community";
import { asyncHandler } from "@/app/_utils/helper";
import { communityPostSchema } from "@/app/_utils/zod/community";
import { Schema, Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {
    console.log("here1");
    
  const Body = await req.json();
  console.log(Body);
  
  const parsedBody = communityPostSchema.safeParse(Body);
  console.log(parsedBody);
  if (!parsedBody.success) {
    return NextResponse.json({
      message: "invalid inputs",
      error: parsedBody.error,
    });
  }
  const userId = req.headers.get("user_id") as string;
  const universityId = req.headers.get("universityId") as string;
  console.log(universityId);
  
  const { body, documentUrl, hashtags, documentType } = Body;
console.log("here2");

let hashtagIds:Types.ObjectId[] = []
if (hashtags){
  await Promise.all( hashtags.map(async (hashtag:string) => {
    await hashtagModel.updateOne(
      { hashtag: hashtag }, // Filter
      { $setOnInsert: { hashtag: hashtag } }, // Insert if not found
      { upsert: true }
    );
    let res = await hashtagModel.findOne({hashtag: hashtag})
    console.log(res?._id);
    
     if(res)  hashtagIds.push(res._id)
      console.log(hashtagIds);
      
  }));}
console.log("here3");
console.log(hashtagIds);

 

  try{const response = await postModel.create({
    userId,
    universityId,
    documentUrl,
    body,
    hashtags: hashtagIds,
    documentType,
  })
  console.log(response);
}catch(e){
    console.log(e);
    
  }
  return NextResponse.json({
    message: "suceesfully post is created",
  });
});

export const PUT = asyncHandler(async (req: NextRequest) => {
  const Body = await req.json();
  const parsedBody = communityPostSchema.safeParse(Body);
  if (!parsedBody.success) {
    return NextResponse.json({
      message: "invalid inputs",
      error: parsedBody.error,
    });
  }
  const userId = req.headers.get("user_id") as string;
  const postId = req.headers.get("postId") as string;
  const { body, documentUrl, hashtag, documentType } = Body;
  await postModel.updateOne(
    {
      $and: [{ _id: postId }, { userId: userId }],
    },
    { body, documentUrl, hashtag, documentType }
  );
  return NextResponse.json({
    message: " updated successfully",
  });
});

export const DELETE = asyncHandler(async (req: NextRequest) => {
  const userId = req.headers.get("userId") as string;
  const postId = req.headers.get("postId") as string;

  await postModel.deleteOne({ $and: [{ _id: postId }, { userId: userId }] });
  return NextResponse.json({
    message: "successfully deleted post",
  });
});
