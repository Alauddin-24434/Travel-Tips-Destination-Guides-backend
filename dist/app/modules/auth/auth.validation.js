"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("../user/user.constant");
const userRegisterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Name is required" }).trim(),
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        password: zod_1.z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" }),
        gender: zod_1.z.enum(Object.keys(user_constant_1.GENDER)),
        birthDate: zod_1.z.string().min(1, { message: "Birth date is required" }),
        mobileNumber: zod_1.z.string().min(10, { message: "Mobile number is required" }),
    }),
});
const userLoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        password: zod_1.z.string({ required_error: "Password is required" }),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: "Old password is required",
        }),
        newPassword: zod_1.z.string({ required_error: "Password is required" }),
    }),
});
const forgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: "Invalid email address" }),
    }),
});
const resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        newPassword: zod_1.z.string({
            required_error: "User new password is required",
        }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh token is required!",
        }),
    }),
});
exports.AuthValidation = {
    userRegisterValidationSchema,
    userLoginValidationSchema,
    changePasswordValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema,
    refreshTokenValidationSchema,
};
