"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const mongoose_1 = require("mongoose");
const postsSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    images: [String], // Array of image URLs
    isDeleted: {
        type: Boolean,
        default: false,
    },
    upvotes: {
        type: [String], // Array of user IDs who upvoted
        default: [],
    },
    downvotes: {
        type: [String], // Array of user IDs who downvoted
        default: [],
    },
}, { timestamps: true });
// Export the Posts model
exports.Posts = (0, mongoose_1.model)("Post", postsSchema);
