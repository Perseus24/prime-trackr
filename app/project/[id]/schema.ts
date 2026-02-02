import { z } from "zod";

export const CreateTaskSchema = z.object({
    title: z.string().min(3, { message: "Task title must be at least 3 characters long" }).max(50),
    description: z.string().optional(),
    priority: z.enum(["high", "medium", "low"]),
});