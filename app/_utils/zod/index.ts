import { object, z } from "zod";

const emailOrUsernameSchema = z.union([
    z.string().email("Invalid email"), // email validation
    z.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
]);

export const loginSchema = z.object({
    identifier: emailOrUsernameSchema,
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const communityPostSchema = z.object({
    title: z.string().optional(),
    body: z.string().optional(),
    documentUrl: z.string().optional(),
    hashtag: z.string().optional()
}).refine((val) => Object.values(val).length !== 0,{
    message: "one of the value must be non-empty",
    path: []
})

export type loginSchemaType = z.infer<typeof loginSchema>;
