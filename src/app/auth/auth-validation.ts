import { z } from "zod";

const RoleEnum = z.enum(["user", "admin"]);

export const insertUserSchema = z.object({
  username: z.string({ required_error: "username field is required" }),
  email: z.string({ required_error: "email field is required" }),
  googleId: z.string().optional(),
  password: z.string().optional(),
  role: RoleEnum.default("user"),
  shippingDistrict: z.string().optional(),
  shippingAddress: z.string().optional(),
  phone: z.string().optional(),
  altPhone: z.string().optional(),
});

export const loginUserSchema = z.object({
  username: z.string().optional(),
  email: z.string({ required_error: "email field is required" }),
  googleId: z.string().optional(),
  password: z.string({ required_error: "password field is required" }),
  role: RoleEnum.default("user"),
  shippingDistrict: z.string().optional(),
  shippingAddress: z.string().optional(),
  phone: z.string().optional(),
  altPhone: z.string().optional(),
});
