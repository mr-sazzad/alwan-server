"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponRoutes = void 0;
const express_1 = require("express");
const coupon_controller_1 = require("./coupon-controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_role_1 = require("../../constants/user-role");
const router = (0, express_1.Router)();
router.post("/create-coupon", (0, auth_1.default)(user_role_1.userRole.admin), coupon_controller_1.couponController.createCoupon);
router.post("/", (0, auth_1.default)(user_role_1.userRole.admin), coupon_controller_1.couponController.getAllCoupons);
router.post("/get-single/:couponId", (0, auth_1.default)(user_role_1.userRole.admin), coupon_controller_1.couponController.getSingleCouponById);
router.post("/update-single/:couponId", (0, auth_1.default)(user_role_1.userRole.admin), coupon_controller_1.couponController.updateSingleCoupon);
router.post("/remove-single/:couponId", (0, auth_1.default)(user_role_1.userRole.admin), coupon_controller_1.couponController.deleteSingleCoupon);
exports.couponRoutes = router;
