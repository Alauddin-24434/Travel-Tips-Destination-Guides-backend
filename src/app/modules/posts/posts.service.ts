import { Types } from "mongoose";
import { TPosts, TVoteType } from "./posts.interface"; // Ensure this interface includes upvotes and downvotes
import { Posts } from "./posts.model"; // Import the Posts model

// Create a new post
const createPosts = async (payload: TPosts) => {
  const create = await Posts.create(payload);
  return create;
};

// Get all posts with the latest posts first
const getAllPosts = async () => {
  const posts = await Posts.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
  return posts;
};

// Type for votes
type Vote = {
  userId: string;
};


 const votePost = async (
  postId: string,
  userId: string,
  voteType: string // Accept any string format for the vote type
) => {
  const post = await Posts.findById(postId);
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
  } else if (normalizedVoteType === "downvote") {
    post.downvotes.push(userId);
  }

  // Save the updated post
  await post.save();

  // Calculate the voting result
  const votingResult = post.upvotes.length - post.downvotes.length;

  // Return updated post with voting result
  return {
    post,
    votingResult
  };
};



// Export the PostsService with all methods
export const PostsService = {
  createPosts,
  votePost,
  getAllPosts,
};
