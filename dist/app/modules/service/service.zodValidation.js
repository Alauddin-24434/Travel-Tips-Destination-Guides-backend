"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodServiceValidations = void 0;
const zod_1 = require("zod");
const serviceZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        price: zod_1.z.number(),
        duration: zod_1.z.number(),
        image: zod_1.z.string(),
        isDeleted: zod_1.z.boolean(),
    }),
});
const updateServiceZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        duration: zod_1.z.number().optional(),
        image: zod_1.z.string(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.zodServiceValidations = {
    serviceZodValidationSchema,
    updateServiceZodValidationSchema,
};
