"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.insertUserSchema = void 0;
const zod_1 = require("zod");
const RoleEnum = zod_1.z.enum(["user", "admin"]);
exports.insertUserSchema = zod_1.z.object({
    username: zod_1.z.string({ required_error: "username field is required" }),
    email: zod_1.z.string({ required_error: "email field is required" }),
    googleId: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
    role: RoleEnum.default("user"),
    shippingDistrict: zod_1.z.string().optional(),
    shippingAddress: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    altPhone: zod_1.z.string().optional(),
});
exports.loginUserSchema = zod_1.z.object({
    username: zod_1.z.string().optional(),
    email: zod_1.z.string({ required_error: "email field is required" }),
    googleId: zod_1.z.string().optional(),
    password: zod_1.z.string({ required_error: "password field is required" }),
    role: RoleEnum.default("user"),
    shippingDistrict: zod_1.z.string().optional(),
    shippingAddress: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    altPhone: zod_1.z.string().optional(),
});
