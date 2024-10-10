import { model, Schema, Types } from "mongoose";

// Define the post interface with upvotes and downvotes as arrays of strings (user IDs)
export type TPosts = {
  userId: Types.ObjectId;
  title: string;
  content: string;
  category: string;
  isPremium: boolean;
  images: string[];
  isDeleted: boolean;
  upvotes: string[]; // Array of user IDs who upvoted
  downvotes: string[]; // Array of user IDs who downvoted
};

const postsSchema = new Schema<TPosts>(
  {
    userId: {
      type: Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

// Export the Posts model
export const Posts = model<TPosts>("Post", postsSchema);
