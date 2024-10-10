"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const posts_model_1 = require("./posts.model"); // Import the Posts model
// Create a new post
const createPosts = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const create = yield posts_model_1.Posts.create(payload);
    return create;
});
// Get all posts with the latest posts first
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield posts_model_1.Posts.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
    return posts;
});
const votePost = (postId, userId, voteType // Accept any string format for the vote type
) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_model_1.Posts.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    }
    // Normalize the voteType to lowercase
    const normalizedVoteType = voteType.toLowerCase();
    // Validate that voteType is either "upvote" or "downvote"
    if (normalizedVoteType !== "upvote" && normalizedVoteType !== "downvote") {
        throw new Error("Invalid vote type");
    }
    // Remove the user from both upvotes and downvotes to prevent double voting
    post.upvotes = post.upvotes.filter(id => id !== userId);
    post.downvotes = post.downvotes.filter(id => id !== userId);
    // Add the user to the appropriate vote list
    if (normalizedVoteType === "upvote") {
        post.upvotes.push(userId);
    }
    else if (normalizedVoteType === "downvote") {
        post.downvotes.push(userId);
    }
    // Save the updated post
    yield post.save();
    // Calculate the voting result
    const votingResult = post.upvotes.length - post.downvotes.length;
    // Return updated post with voting result
    return {
        post,
        votingResult
    };
});
// Export the PostsService with all methods
exports.PostsService = {
    createPosts,
    votePost,
    getAllPosts,
};
