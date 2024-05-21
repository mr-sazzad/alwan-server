"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalRoutes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../auth/auth-routes");
const user_routes_1 = require("../user/user-routes");
const product_routes_1 = require("../products/product-routes");
const orders_routes_1 = require("../orders/orders-routes");
const feedback_routes_1 = require("../feedback/feedback-routes");
const comment_routes_1 = require("../comment/comment-routes");
const carousel_routes_1 = require("../carousel/carousel-routes");
const coupon_routes_1 = require("../coupon/coupon-routes");
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.authRoutes);
router.use("/users", user_routes_1.userRoutes);
router.use("/products", product_routes_1.productRoutes);
router.use("/orders", orders_routes_1.orderRoutes);
router.use("/feedbacks", feedback_routes_1.feedbackRoutes);
router.use("/comments", comment_routes_1.commentRoutes);
router.use("/coupons", coupon_routes_1.couponRoutes);
router.use("/carousel", carousel_routes_1.carouselRoutes);
exports.globalRoutes = router;