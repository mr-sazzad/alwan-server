import { Router } from "express";
import { orderController } from "./orders-controller";

const router = Router();

router.post("/create-a-order", orderController.createOrder);
router.get("/", orderController.getOrders);
router.get("/:userId", orderController.getOrdersByUserId);
router.get("/:orderId", orderController.getOrderByOrderId);
router.patch("/update-order/:orderId", orderController.updateOrderByOrderId);
router.delete("/delete-order", orderController.deleteOrderByOrderId);

export const orderRoutes = router;
