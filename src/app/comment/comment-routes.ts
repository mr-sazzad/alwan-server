import Router from "express";
import { commentController } from "./comment-controller";

const router = Router();

router.post("/create-comment", commentController.createComment);

router.get(
  "/product-id/:productId",
  commentController.getAllCommentsByProductId
);

router.delete("/product-id/:productId", commentController.deleteCommentById);

export const commentRoutes = router;
