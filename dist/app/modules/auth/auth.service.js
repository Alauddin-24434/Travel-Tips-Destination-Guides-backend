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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const user_constant_1 = require("../user/user.constant");
const jwtVerification_1 = require("../../utils/jwtVerification");
const config_1 = __importDefault(require("../../config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sendEmail_1 = require("../../utils/sendEmail");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(payload === null || payload === void 0 ? void 0 : payload.email);
    if (user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User is already exist!");
    }
    payload.role = user_constant_1.USER_ROLE.USER;
    //create new user
    const newUser = yield user_model_1.User.create(payload);
    // jwt payload for create access and refresh token
    const jwtPayload = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobileNumber: newUser.mobileNumber,
        gender: newUser.gender,
        role: newUser.role,
        birthDate: newUser.birthDate,
        status: newUser.status,
        profileImage: newUser.profileImage,
    };
    // create access token and send it to the client
    const accessToken = (0, jwtVerification_1.createToken)(jwtPayload, config_1.default.access_secret, config_1.default.access_expires_in);
    // create refresh token and send it to the client
    const refreshToken = (0, jwtVerification_1.createToken)(jwtPayload, config_1.default.refresh_secret, config_1.default.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist in our data base
    const user = yield user_model_1.User.isUserExistsByEmail(payload === null || payload === void 0 ? void 0 : payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User is not found!");
    }
    // checking if the user is blocked by the admin
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "BLOCKED") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is blocked!");
    }
    //checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password do not matched");
    // jwt payload for create access and refresh token
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        gender: user.gender,
        role: user.role,
        birthDate: user.birthDate,
        status: user.status,
        profileImage: user.profileImage,
    };
    // create access token and send it to the client
    const accessToken = (0, jwtVerification_1.createToken)(jwtPayload, config_1.default.access_secret, config_1.default.access_expires_in);
    // create refresh token and send it to the client
    const refreshToken = (0, jwtVerification_1.createToken)(jwtPayload, config_1.default.refresh_secret, config_1.default.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist in the database
    const user = yield user_model_1.User.isUserExistsByEmail(userData.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User is not found!");
    }
    // checking if the user is blocked by the admin
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "BLOCKED") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked!");
    }
    //checking if the given password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload.oldPassword, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password do not matched");
    //hash new password
    const newHashedPassword = yield bcryptjs_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findOneAndUpdate({
        email: userData.email,
        role: userData.role,
    }, {
        password: newHashedPassword,
        passwordChangedAt: new Date(),
    });
    return null;
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: email });
    // check if the user is exist
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // checking if the user is blocked by the admin
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "BLOCKED") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked!");
    }
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        gender: user.gender,
        role: user.role,
        birthDate: user.birthDate,
        status: user.status,
    };
    const resetToken = (0, jwtVerification_1.createToken)(jwtPayload, config_1.default.access_secret, "10m");
    const resetUILink = `${config_1.default.reset_pass_ui_link}?email=${user === null || user === void 0 ? void 0 : user.email}&token=${resetToken}`;
    const emailHTML = `<div style="text-align: center; padding: 40px; background-color: #f4f4f4; font-family: Arial, sans-serif; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333; margin-bottom: 20px;">Password Reset</h2>
    <p style="color: #555; margin-bottom: 30px; font-size: 16px;">
      Click the button below to reset your password:
    </p>
    <a href="${resetUILink}" target="_blank" style="display: inline-block; padding: 12px 30px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s ease, transform 0.3s ease; font-weight: bold;" onmousedown="this.style.backgroundColor='#0056b3'; this.style.transform='scale(0.95)';" onmouseup="this.style.backgroundColor='#007bff'; this.style.transform='scale(1)';" onmouseout="this.style.backgroundColor='#007bff'; this.style.transform='scale(1)';">
      Reset Password
    </a>
    <p style="color: #777; margin-top: 40px; font-size: 14px;">
      This link will expire in 10 minutes.
    </p>
  </div>
</div>
`;
    yield (0, sendEmail_1.sendEmail)(user === null || user === void 0 ? void 0 : user.email, emailHTML);
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsByEmail(payload === null || payload === void 0 ? void 0 : payload.email);
    // check if the user is exist in the data base
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // checking if the user is blocked by the admin
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "BLOCKED") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is blocked!");
    }
    // check if the token is valid or not
    const decoded = (0, jwtVerification_1.verifyToken)(token, config_1.default.access_secret);
    if ((decoded === null || decoded === void 0 ? void 0 : decoded.email) !== (payload === null || payload === void 0 ? void 0 : payload.email)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are forbidden");
    }
    const newHashedPassword = yield bcryptjs_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findOneAndUpdate({
        email: decoded === null || decoded === void 0 ? void 0 : decoded.email,
        role: decoded === null || decoded === void 0 ? void 0 : decoded.role,
    }, {
        password: newHashedPassword,
        passwordChangedAt: new Date(),
    });
    return null;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the token is valid or not
    const decoded = (0, jwtVerification_1.verifyToken)(token, config_1.default.refresh_secret);
    const { email, iat } = decoded;
    // checking if the user is exist in the database
    const user = yield user_model_1.User.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User is not found!");
    }
    // checking if the user is blocked by admin
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "BLOCKED") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is blocked!");
    }
    if (user.passwordChangedAt &&
        user_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    // jwt payload for create access token
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        gender: user.gender,
        role: user.role,
        birthDate: user.birthDate,
        status: user.status,
    };
    // create access token and send it to the client
    const accessToken = (0, jwtVerification_1.createToken)(jwtPayload, config_1.default.access_secret, config_1.default.access_expires_in);
    return {
        accessToken,
    };
});
exports.AuthServices = {
    registerUser,
    loginUser,
    changePassword,
    forgetPassword,
    resetPassword,
    refreshToken,
};
