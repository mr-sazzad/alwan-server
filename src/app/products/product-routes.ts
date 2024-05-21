import { Router } from "express";
import { productController } from "./product-controller";
import validateRequest from "../../middlewares/validate-request";
import { insertProductSchema, updateProductSchema } from "./product-validation";

const router = Router();

// Use POST on /register to create a new product
router.post(
  "/register-a-product",
  validateRequest(insertProductSchema),
  productController.registerAProduct
);

// GET on /products to retrieve all products
router.get("/", productController.getAllProducts);

// Use :productId for consistency
router.get("/single-product/:productId", productController.getSingleProduct);

// PATCH on /products/:productId to update a product
router.patch(
  "/single-product/:productId",
  validateRequest(updateProductSchema),
  productController.updateSingleProduct
);

// DELETE on /products/:productId to remove a product
router.delete(
  "/single-product/:productId",
  productController.deleteSingleProduct
);

export const productRoutes = router;
