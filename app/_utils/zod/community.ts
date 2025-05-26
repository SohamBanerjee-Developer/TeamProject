import { object, z } from "zod";

export const communityPostSchema = object({
    body: z.string().optional(),
    documentUrl: z.string().optional(),
    hashtag: z.string().optional()
}).refine((val) => Object.values(val).length !== 0,{
    message: "one of the value must be non-empty",
    path: []
})