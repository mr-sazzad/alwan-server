"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product-controller");
const validate_request_1 = __importDefault(require("../../middlewares/validate-request"));
const product_validation_1 = require("./product-validation");
const router = (0, express_1.Router)();
// Use POST on /register to create a new product
router.post("/register-a-product", (0, validate_request_1.default)(product_validation_1.insertProductSchema), product_controller_1.productController.registerAProduct);
// GET on /products to retrieve all products
router.get("/", product_controller_1.productController.getAllProducts);
// Use :productId for consistency
router.get("/single-product/:productId", product_controller_1.productController.getSingleProduct);
// PATCH on /products/:productId to update a product
router.patch("/single-product/:productId", (0, validate_request_1.default)(product_validation_1.updateProductSchema), product_controller_1.productController.updateSingleProduct);
// DELETE on /products/:productId to remove a product
router.delete("/single-product/:productId", product_controller_1.productController.deleteSingleProduct);
exports.productRoutes = router;
