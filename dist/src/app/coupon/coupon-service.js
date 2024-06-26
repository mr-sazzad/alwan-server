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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponService = void 0;
const api_errors_1 = __importDefault(require("../../errors/api-errors"));
const prisma_1 = __importDefault(require("../../libs/prisma"));
const createCoupon = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.coupon.create({ data });
        return result;
    }
    catch (err) {
        throw new api_errors_1.default(500, "Internal Server Error Occurred");
    }
});
const getAllCoupons = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupons = yield prisma_1.default.coupon.findMany();
        return coupons;
    }
    catch (err) {
        throw new api_errors_1.default(404, "Coupons Not Found");
    }
});
const getSingleCouponById = (couponId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupon = yield prisma_1.default.coupon.findUnique({
            where: {
                id: couponId,
            },
        });
        return coupon;
    }
    catch (err) {
        throw new api_errors_1.default(404, "Coupon Not Found");
    }
});
const updateSingleCoupon = (couponId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupon = yield prisma_1.default.coupon.update({
            where: {
                id: couponId,
            },
            data,
        });
        return coupon;
    }
    catch (err) {
        throw new api_errors_1.default(404, "Coupons Not Found");
    }
});
const deleteSingleCoupon = (couponId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupon = yield prisma_1.default.coupon.delete({
            where: {
                id: couponId,
            },
        });
        return coupon;
    }
    catch (err) {
        throw new api_errors_1.default(404, "Coupons Not Found");
    }
});
exports.couponService = {
    createCoupon,
    getAllCoupons,
    getSingleCouponById,
    updateSingleCoupon,
    deleteSingleCoupon,
};
