import { z } from "zod";

export const insertProductSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "name field is required" }),
    prices: z.number({ required_error: "prices field is required" }).array(),
    sizes: z.string({ required_error: "sizes field is required" }).array(),
    desc: z.string({ required_error: "desc field is required" }).array(),
    features: z
      .string({ required_error: "features field is required" })
      .array(),
    images: z.string({ required_error: "images field is required" }).array(),
    mSizeStock: z.number({ required_error: "mSizeStock field is required" }),
    lSizeStock: z.number({ required_error: "lSizeStock field is required" }),
    xlSizeStock: z.number({ required_error: "xlSizeStock field is required" }),
    xxlSizeStock: z.number({
      required_error: "xxlSizeStock field is required",
    }),
    color: z.string({ required_error: "color field is required" }),
    isFreeDeliveryAvailable: z.boolean({
      required_error: "isFreeDeliveryAvailable field is required",
    }),
    status: z.string({ required_error: "status field is required" }),
    isCouponApplicable: z.boolean({
      required_error: "isCouponApplicable field is required",
    }),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "name field is required" }).optional(),
    prices: z
      .number({ required_error: "prices field is required" })
      .array()
      .optional(),
    sizes: z
      .string({ required_error: "sizes field is required" })
      .array()
      .optional(),
    desc: z
      .string({ required_error: "desc field is required" })
      .array()
      .optional(),
    features: z
      .string({ required_error: "features field is required" })
      .array()
      .optional(),
    images: z
      .string({ required_error: "images field is required" })
      .array()
      .optional(),
    mSizeStock: z
      .number({ required_error: "mSizeStock field is required" })
      .optional(),
    lSizeStock: z
      .number({ required_error: "lSizeStock field is required" })
      .optional(),
    xlSizeStock: z
      .number({ required_error: "xlSizeStock field is required" })
      .optional(),
    xxlSizeStock: z
      .number({ required_error: "xxlSizeStock field is required" })
      .optional(),
    color: z.string({ required_error: "color field is required" }).optional(),
    isFreeDeliveryAvailable: z
      .boolean({
        required_error: "isFreeDeliveryAvailable field is required",
      })
      .optional(),
    status: z.string({ required_error: "status field is required" }).optional(),
    isCouponApplicable: z
      .boolean({
        required_error: "isCouponApplicable field is required",
      })
      .optional(),
  }),
});
