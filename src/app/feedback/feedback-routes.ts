import Router from "express";
import { feedbacksController } from "./feedback-controller";

const router = Router();

router.post("/create-feedback", feedbacksController.submitAFeedback);

router.get("/", feedbacksController.getAllFeedbacks);

router.get("/:userId", feedbacksController.getFeedbacksByUserId);

export const feedbackRoutes = router;
