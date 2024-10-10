import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostsService } from "./posts.service";

// Controller for creating a post
const createPosts = catchAsync(async (req, res) => {
    const body = req.body;
    const result = await PostsService.createPosts(body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED, // 201 status code for post creation
        success: true,
        message: "Post has been created successfully.",
        data: result,
    });
});

// Controller for getting all posts
const getAllPosts = catchAsync(async (req, res) => {
    const posts = await PostsService.getAllPosts();
    sendResponse(res, {
        statusCode: httpStatus.OK, // 200 status code for fetching posts
        success: true,
        message: "Posts retrieved successfully.",
        data: posts,
    });
});



const votePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const { voteType, userId } = req.body as { voteType: "upvote" | "downvote", userId: string };

  // Ensure voteType is properly passed to the service
  const result = await PostsService.votePost(postId, userId, voteType);
const {post,votingResult}=result;
console.log(post, votingResult)
  sendResponse(res, {
    statusCode: httpStatus.OK, // 200 for success
    success: true,
    message: `Post has been ${voteType}d successfully.`,
    data:{post,votingResult}
  });
});

export const PostsController = {
    createPosts,
    getAllPosts,
    votePost, // Export the voting controller
};
