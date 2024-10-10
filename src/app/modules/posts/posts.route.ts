import { Router } from "express";
import { PostsController } from "./posts.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createPostValidationSchema } from "./posts.validation";

const router = Router();

// Route to create a new post
router.post(
    '/posts/create-posts',
    validateRequest(createPostValidationSchema),
    PostsController.createPosts
);

// Route to get all posts
router.get('/posts', PostsController.getAllPosts); // Add this line to retrieve all posts
// Route for voting on a post (upvote or downvote)
router.post('/posts/:postId/vote', PostsController.votePost)
export const PostRoutes = router;
