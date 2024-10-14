"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateSchema = exports.userRegisterSchema = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
exports.userRegisterSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Name is required" }).trim(),
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        password: zod_1.z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" }),
        gender: zod_1.z.enum(Object.keys(user_constant_1.GENDER)),
        profileImage: zod_1.z
            .string()
            .url()
            .optional(),
        bio: zod_1.z.string().optional(),
        birthDate: zod_1.z.string().min(1, { message: "Birth date is required" }),
        mobileNumber: zod_1.z.string().min(10, { message: "Mobile number is required" }),
        address: zod_1.z.string().min(1, { message: "Address is required" }),
        isVerified: zod_1.z.boolean().optional().default(false),
        followers: zod_1.z.array(zod_1.z.string().optional()).optional(),
        following: zod_1.z.array(zod_1.z.string().optional()).optional(),
    }),
});
exports.userUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Name is required" }).trim().optional(),
        gender: zod_1.z.enum(Object.keys(user_constant_1.GENDER)).optional(),
        profileImage: zod_1.z
            .string()
            .url({ message: "Invalid profile image URL" })
            .optional()
            .default("https://i.ibb.co/vkVW6s0/download.png"),
        bio: zod_1.z.string().optional(),
        birthDate: zod_1.z
            .string()
            .min(1, { message: "Birth date is required" })
            .optional(),
        mobileNumber: zod_1.z
            .string()
            .min(10, { message: "Mobile number must be at least 10 digits" })
            .optional(),
        address: zod_1.z.string().optional(),
    }),
});
