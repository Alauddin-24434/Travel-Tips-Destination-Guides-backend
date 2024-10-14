"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post("/register-user", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.userRegisterValidationSchema), auth_controller_1.AuthControllers.registerUser);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.userLoginValidationSchema), auth_controller_1.AuthControllers.loginUser);
router.put("/change-password", (0, auth_1.default)(user_constant_1.USER_ROLE.USER, user_constant_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(auth_validation_1.AuthValidation.changePasswordValidationSchema), auth_controller_1.AuthControllers.changePassword);
router.post("/forget-password", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.forgetPasswordValidationSchema), auth_controller_1.AuthControllers.forgetPassword);
router.post("/reset-password", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.resetPasswordValidationSchema), auth_controller_1.AuthControllers.resetPassword);
router.post("/refresh-token", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.refreshTokenValidationSchema), auth_controller_1.AuthControllers.refreshToken);
exports.AuthRoutes = router;
