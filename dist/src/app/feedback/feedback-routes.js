"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const feedback_controller_1 = require("./feedback-controller");
const router = (0, express_1.default)();
router.post("/create-feedback", feedback_controller_1.feedbacksController.submitAFeedback);
router.get("/", feedback_controller_1.feedbacksController.getAllFeedbacks);
router.get("/:userId", feedback_controller_1.feedbacksController.getFeedbacksByUserId);
exports.feedbackRoutes = router;
