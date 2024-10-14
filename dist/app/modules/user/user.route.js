"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("./user.constant");
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post("/create-user", (0, validateRequest_1.default)(user_validation_1.userRegisterSchema), user_controller_1.UserControllers.createUser);
router.get("/", user_controller_1.UserControllers.getAllUsers);
router.get("/current-user", (0, auth_1.default)(user_constant_1.USER_ROLE.USER, user_constant_1.USER_ROLE.ADMIN), user_controller_1.UserControllers.getCurrentUser);
router.put("/toggle-follower", (0, auth_1.default)(user_constant_1.USER_ROLE.USER, user_constant_1.USER_ROLE.ADMIN), user_controller_1.UserControllers.toggleFollowUser);
router.put("/toggle-bookmark", (0, auth_1.default)(user_constant_1.USER_ROLE.USER, user_constant_1.USER_ROLE.ADMIN), user_controller_1.UserControllers.bookmarkPost);
router.put("/update-user", (0, auth_1.default)(user_constant_1.USER_ROLE.USER, user_constant_1.USER_ROLE.ADMIN), multer_config_1.multerUpload.single("profileImage"), (req, res, next) => {
    req.body = JSON.parse(req.body.userData);
    next();
}, (0, validateRequest_1.default)(user_validation_1.userUpdateSchema), user_controller_1.UserControllers.updateUser);
router.get("/get-single-user/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.USER, user_constant_1.USER_ROLE.ADMIN), user_controller_1.UserControllers.getSingleUser);
router.put("/status-toggle/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), user_controller_1.UserControllers.toggleStatus);
exports.UserRoutes = router;
