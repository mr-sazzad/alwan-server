import { Router } from "express";
import { authRoutes } from "../auth/auth-routes";
import { userRoutes } from "../user/user-routes";
import { productRoutes } from "../products/product-routes";
import { orderRoutes } from "../orders/orders-routes";
import { feedbackRoutes } from "../feedback/feedback-routes";
import { commentRoutes } from "../comment/comment-routes";
import { carouselRoutes } from "../carousel/carousel-routes";
import { couponRoutes } from "../coupon/coupon-routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/feedbacks", feedbackRoutes);
router.use("/comments", commentRoutes);
router.use("/coupons", couponRoutes);
router.use("/carousel", carouselRoutes);

export const globalRoutes = router;
