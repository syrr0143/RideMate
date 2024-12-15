import { z } from "zod";

const userValidationSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name should be at least 3 characters long")
    .max(100, "Full name should not exceed 100 characters") // Optional max length
    .trim()
    .toLowerCase(),
  email: z
    .string()
    .email("Please provide a valid email address")
    .trim()
    .toLowerCase(),
  password: z.string().min(8, "Password should be at least 8 characters long"),
  socketId: z.string().optional(),
});

// Export schema for validation
export default userValidationSchema;
