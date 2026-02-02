import { z } from "zod";

export const CreateProjectSchema = z.object({
    title: z.string().min(3, { message: "Project title must be at least 3 characters long" }).max(50),
    description: z.string().optional(),
});