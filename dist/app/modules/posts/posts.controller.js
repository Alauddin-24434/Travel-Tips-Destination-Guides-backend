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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const posts_service_1 = require("./posts.service");
// Controller for creating a post
const createPosts = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield posts_service_1.PostsService.createPosts(body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED, // 201 status code for post creation
        success: true,
        message: "Post has been created successfully.",
        data: result,
    });
}));
// Controller for getting all posts
const getAllPosts = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield posts_service_1.PostsService.getAllPosts();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK, // 200 status code for fetching posts
        success: true,
        message: "Posts retrieved successfully.",
        data: posts,
    });
}));
const votePost = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const { voteType, userId } = req.body;
    // Ensure voteType is properly passed to the service
    const result = yield posts_service_1.PostsService.votePost(postId, userId, voteType);
    const { post, votingResult } = result;
    console.log(post, votingResult);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK, // 200 for success
        success: true,
        message: `Post has been ${voteType}d successfully.`,
        data: { post, votingResult }
    });
}));
exports.PostsController = {
    createPosts,
    getAllPosts,
    votePost, // Export the voting controller
};
