"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.insertProductSchema = void 0;
const zod_1 = require("zod");
exports.insertProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "name field is required" }),
        prices: zod_1.z.number({ required_error: "prices field is required" }).array(),
        sizes: zod_1.z.string({ required_error: "sizes field is required" }).array(),
        desc: zod_1.z.string({ required_error: "desc field is required" }).array(),
        features: zod_1.z
            .string({ required_error: "features field is required" })
            .array(),
        images: zod_1.z.string({ required_error: "images field is required" }).array(),
        mSizeStock: zod_1.z.number({ required_error: "mSizeStock field is required" }),
        lSizeStock: zod_1.z.number({ required_error: "lSizeStock field is required" }),
        xlSizeStock: zod_1.z.number({ required_error: "xlSizeStock field is required" }),
        xxlSizeStock: zod_1.z.number({
            required_error: "xxlSizeStock field is required",
        }),
        color: zod_1.z.string({ required_error: "color field is required" }),
        isFreeDeliveryAvailable: zod_1.z.boolean({
            required_error: "isFreeDeliveryAvailable field is required",
        }),
        status: zod_1.z.string({ required_error: "status field is required" }),
        isCouponApplicable: zod_1.z.boolean({
            required_error: "isCouponApplicable field is required",
        }),
    }),
});
exports.updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "name field is required" }).optional(),
        prices: zod_1.z
            .number({ required_error: "prices field is required" })
            .array()
            .optional(),
        sizes: zod_1.z
            .string({ required_error: "sizes field is required" })
            .array()
            .optional(),
        desc: zod_1.z
            .string({ required_error: "desc field is required" })
            .array()
            .optional(),
        features: zod_1.z
            .string({ required_error: "features field is required" })
            .array()
            .optional(),
        images: zod_1.z
            .string({ required_error: "images field is required" })
            .array()
            .optional(),
        mSizeStock: zod_1.z
            .number({ required_error: "mSizeStock field is required" })
            .optional(),
        lSizeStock: zod_1.z
            .number({ required_error: "lSizeStock field is required" })
            .optional(),
        xlSizeStock: zod_1.z
            .number({ required_error: "xlSizeStock field is required" })
            .optional(),
        xxlSizeStock: zod_1.z
            .number({ required_error: "xxlSizeStock field is required" })
            .optional(),
        color: zod_1.z.string({ required_error: "color field is required" }).optional(),
        isFreeDeliveryAvailable: zod_1.z
            .boolean({
            required_error: "isFreeDeliveryAvailable field is required",
        })
            .optional(),
        status: zod_1.z.string({ required_error: "status field is required" }).optional(),
        isCouponApplicable: zod_1.z
            .boolean({
            required_error: "isCouponApplicable field is required",
        })
            .optional(),
    }),
});
