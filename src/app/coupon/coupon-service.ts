import { Coupon } from "@prisma/client";
import ApiError from "../../errors/api-errors";
import prisma from "../../libs/prisma";

const createCoupon = async (data: Coupon) => {
  try {
    const result = await prisma.coupon.create({ data });

    return result;
  } catch (err: any) {
    throw new ApiError(500, "Internal Server Error Occurred");
  }
};

const getAllCoupons = async () => {
  try {
    const coupons = await prisma.coupon.findMany();
    return coupons;
  } catch (err: any) {
    throw new ApiError(404, "Coupons Not Found");
  }
};

const getSingleCouponById = async (couponId: string) => {
  try {
    const coupon = await prisma.coupon.findUnique({
      where: {
        id: couponId,
      },
    });
    return coupon;
  } catch (err: any) {
    throw new ApiError(404, "Coupon Not Found");
  }
};

const updateSingleCoupon = async (couponId: string, data: Partial<Coupon>) => {
  try {
    const coupon = await prisma.coupon.update({
      where: {
        id: couponId,
      },
      data,
    });
    return coupon;
  } catch (err: any) {
    throw new ApiError(404, "Coupons Not Found");
  }
};

const deleteSingleCoupon = async (couponId: string) => {
  try {
    const coupon = await prisma.coupon.delete({
      where: {
        id: couponId,
      },
    });
    return coupon;
  } catch (err: any) {
    throw new ApiError(404, "Coupons Not Found");
  }
};

export const couponService = {
  createCoupon,
  getAllCoupons,
  getSingleCouponById,
  updateSingleCoupon,
  deleteSingleCoupon,
};
