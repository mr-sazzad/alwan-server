import { Router } from "express";
import { couponController } from "./coupon-controller";
import auth from "../../middlewares/auth";
import { userRole } from "../../constants/user-role";

const router = Router();

router.post(
  "/create-coupon",
  auth(userRole.admin),
  couponController.createCoupon
);

router.post("/", auth(userRole.admin), couponController.getAllCoupons);

router.post(
  "/get-single/:couponId",
  auth(userRole.admin),
  couponController.getSingleCouponById
);

router.post(
  "/update-single/:couponId",
  auth(userRole.admin),
  couponController.updateSingleCoupon
);

router.post(
  "/remove-single/:couponId",
  auth(userRole.admin),
  couponController.deleteSingleCoupon
);

export const couponRoutes = router;
