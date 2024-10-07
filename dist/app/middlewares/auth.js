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
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const verifyJWT_1 = require("../utils/verifyJWT");
const user_model_js_1 = require("../modules/User/user.model.js");
const catchAsync_1 = require("../utils/catchAsync");
// Middleware function to validate authentication and authorization
const authValidation = (...requiredRoles) => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Extract the token from the Authorization header
        const token = req.headers.authorization;
        // Check if the token is missing
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
        }
        const decoded = (0, verifyJWT_1.verifyToken)(token, config_1.default.jwt_access_secret);
        const { role, email, } = decoded;
        // Check if the user exists
        const user = yield user_model_js_1.User.isUserExistsByEmail(email);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found!");
        }
        // Check if the user is deleted
        if (user.isDeleted) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted!");
        }
        // Check if the user is blocked
        if (user.status === "BLOCKED") {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked!");
        }
        // Check if the user has the required role
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
        }
        // Attach the user information to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    }));
};
exports.default = authValidation;
