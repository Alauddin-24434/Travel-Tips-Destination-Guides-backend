import { z } from "zod";

// Validation schema for creating posts
export const createPostValidationSchema = z.object({
  body: z.object({
    userId: z.string().refine((val) => val.match(/^[0-9a-fA-F]{24}$/), {
      message: "Invalid user ID format.", // Ensures valid MongoDB ObjectId
    }),
    title: z.string().min(1, { message: "Title is required." }), // Title must be non-empty
    content: z.string().min(1, { message: "Content is required." }), // Content must be non-empty
    category: z.string().min(1, { message: "Category is required." }), // Category must be non-empty
    isPremium: z.boolean(), // Validates that isPremium is a boolean
    images: z.array(z.string()).optional(), // Optional array of strings for images (URLs)
    isDeleted: z.boolean().default(false), // Defaults to false
    upvotes: z.array(z.string()).default([]), // Validates array of strings (user IDs) for upvotes
    downvotes: z.array(z.string()).default([]), // Validates array of strings (user IDs) for downvotes
  }),
});
