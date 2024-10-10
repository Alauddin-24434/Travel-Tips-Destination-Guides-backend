"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoutes = void 0;
const express_1 = require("express");
const posts_controller_1 = require("./posts.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const posts_validation_1 = require("./posts.validation");
const router = (0, express_1.Router)();
// Route to create a new post
router.post('/posts/create-posts', (0, validateRequest_1.default)(posts_validation_1.createPostValidationSchema), posts_controller_1.PostsController.createPosts);
// Route to get all posts
router.get('/posts', posts_controller_1.PostsController.getAllPosts); // Add this line to retrieve all posts
// Route for voting on a post (upvote or downvote)
router.post('/posts/:postId/vote', posts_controller_1.PostsController.votePost);
exports.PostRoutes = router;
