import { asyncHandler } from "@/app/_utils/helper";
import {  NextResponse } from "next/server";

export const POST = asyncHandler(
    async()=>{
        return NextResponse.json({
            message: "comment successfully created"
        })
    }
)