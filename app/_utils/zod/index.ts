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



export type loginSchemaType = z.infer<typeof loginSchema>;
