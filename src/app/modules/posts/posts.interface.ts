import { Types } from "mongoose";

// Define the post interface
export type TPosts = {
  userId: Types.ObjectId;    // Reference to the user who created the post
  title: string;             // Title of the post
  content: string;           // Post content
  category: string;          // Post category
  isPremium: boolean;        // Whether the post is premium
  images: string[];          // Array of image URLs
  isDeleted: boolean;        // Soft delete flag
  upvotes: string[];         // Array of user IDs who upvoted
  downvotes: string[];       // Array of user IDs who downvoted
  createdAt?: Date;          // Auto-generated timestamp for creation
  updatedAt?: Date;          // Auto-generated timestamp for update
};



export type TVoteType ={
  voteType: "upvote" | "downvote";
}