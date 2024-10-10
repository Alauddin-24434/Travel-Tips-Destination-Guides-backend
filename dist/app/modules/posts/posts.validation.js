"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostValidationSchema = void 0;
const zod_1 = require("zod");
// Validation schema for creating posts
exports.createPostValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().refine((val) => val.match(/^[0-9a-fA-F]{24}$/), {
            message: "Invalid user ID format.", // Ensures valid MongoDB ObjectId
        }),
        title: zod_1.z.string().min(1, { message: "Title is required." }), // Title must be non-empty
        content: zod_1.z.string().min(1, { message: "Content is required." }), // Content must be non-empty
        category: zod_1.z.string().min(1, { message: "Category is required." }), // Category must be non-empty
        isPremium: zod_1.z.boolean(), // Validates that isPremium is a boolean
        images: zod_1.z.array(zod_1.z.string()).optional(), // Optional array of strings for images (URLs)
        isDeleted: zod_1.z.boolean().default(false), // Defaults to false
        upvotes: zod_1.z.array(zod_1.z.string()).default([]), // Validates array of strings (user IDs) for upvotes
        downvotes: zod_1.z.array(zod_1.z.string()).default([]), // Validates array of strings (user IDs) for downvotes
    }),
});
