import { RequestHandler } from "express";
import { couponService } from "./coupon-service";

const createCoupon: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await couponService.createCoupon(data);

    res.status(201).json({
      status: 201,
      message: "Coupon Created Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const getAllCoupons: RequestHandler = async (req, res, next) => {
  try {
    const result = await couponService.getAllCoupons();

    res.status(201).json({
      status: 201,
      message: "Coupons Retrieved Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const getSingleCouponById: RequestHandler = async (req, res, next) => {
  try {
    const { couponId } = req.params;
    const result = await couponService.getSingleCouponById(couponId);

    res.status(200).json({
      status: 200,
      message: "Coupon Retrieved Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const updateSingleCoupon: RequestHandler = async (req, res, next) => {
  try {
    const { couponId } = req.params;
    const data = req.body;
    const result = await couponService.updateSingleCoupon(couponId, data);

    res.status(200).json({
      status: 200,
      message: "Coupon Modified Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const deleteSingleCoupon: RequestHandler = async (req, res, next) => {
  try {
    const { couponId } = req.params;
    const result = await couponService.deleteSingleCoupon(couponId);

    res.status(200).json({
      status: 200,
      message: "Coupon removed successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const couponController = {
  createCoupon,
  getAllCoupons,
  getSingleCouponById,
  updateSingleCoupon,
  deleteSingleCoupon,
};
