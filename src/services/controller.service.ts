import { z } from "zod";

export const challengeSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
});

export const solutionSchema = z.object({
    code: z.string().min(10, "Solution code must be at least 10 characters long"),
});