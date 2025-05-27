import { object, z } from "zod";

export const communityPostSchema = object({
    body: z.string().optional(),
    documentUrl: z.string().optional(),
    documentType: z.enum(["video", "poll","image"]).optional(),
    hashtags: z.array(z.string()).optional()
}).refine((val) => Object.values(val).length > 0,{
    message: "one of the value must be non-empty",
    path: []
})