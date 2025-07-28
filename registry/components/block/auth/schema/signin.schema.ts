import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().min(4, "Unique Identifier must be at least 4 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});