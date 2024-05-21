"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product-controller");
const router = (0, express_1.Router)();
// Use POST on /register to create a new product
router.post("/register-a-product", product_controller_1.productController.registerAProduct);
// GET on /products to retrieve all products
router.get("/", product_controller_1.productController.getAllProducts);
// Use :productId for consistency
router.get("/single-product/:productId", product_controller_1.productController.getSingleProduct);
// PATCH on /products/:productId to update a product
router.patch("/single-product/:productId", product_controller_1.productController.updateSingleProduct);
// DELETE on /products/:productId to remove a product
router.delete("/single-product/:productId", product_controller_1.productController.deleteSingleProduct);
exports.productRoutes = router;
