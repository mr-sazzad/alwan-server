"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("./comment-controller");
const router = (0, express_1.default)();
router.post("/create-comment", comment_controller_1.commentController.createComment);
router.get("/product-id/:productId", comment_controller_1.commentController.getAllCommentsByProductId);
router.delete("/product-id/:productId", comment_controller_1.commentController.deleteCommentById);
exports.commentRoutes = router;
