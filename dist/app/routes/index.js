"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const post_route_1 = require("../modules/post/post.route");
const comment_route_1 = require("../modules/comment/comment.route");
const payment_route_1 = require("../modules/payment/payment.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/post",
        route: post_route_1.PostRoutes,
    },
    {
        path: "/comment",
        route: comment_route_1.CommentRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
