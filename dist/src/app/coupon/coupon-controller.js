"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponController = void 0;
const coupon_service_1 = require("./coupon-service");
const createCoupon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield coupon_service_1.couponService.createCoupon(data);
        res.status(201).json({
            status: 201,
            message: "Coupon Created Successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllCoupons = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield coupon_service_1.couponService.getAllCoupons();
        res.status(201).json({
            status: 201,
            message: "Coupons Retrieved Successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getSingleCouponById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { couponId } = req.params;
        const result = yield coupon_service_1.couponService.getSingleCouponById(couponId);
        res.status(200).json({
            status: 200,
            message: "Coupon Retrieved Successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const updateSingleCoupon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { couponId } = req.params;
        const data = req.body;
        const result = yield coupon_service_1.couponService.updateSingleCoupon(couponId, data);
        res.status(200).json({
            status: 200,
            message: "Coupon Modified Successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteSingleCoupon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { couponId } = req.params;
        const result = yield coupon_service_1.couponService.deleteSingleCoupon(couponId);
        res.status(200).json({
            status: 200,
            message: "Coupon removed successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.couponController = {
    createCoupon,
    getAllCoupons,
    getSingleCouponById,
    updateSingleCoupon,
    deleteSingleCoupon,
};
