import { RequestHandler } from "express";
import { feedbacksServices } from "./feedback-services";
import sendResponse from "../../helpers/send-response";

const submitAFeedback: RequestHandler = async (req, res, next) => {
  try {
    const content = req.body;
    const createdFeedback = await feedbacksServices.submitAFeedback(content);
    sendResponse(res, 201, "Feedback Created Successfully", createdFeedback);
  } catch (error: any) {
    next(error);
  }
};

const getAllFeedbacks: RequestHandler = async (req, res, next) => {
  try {
    const feedbacks = await feedbacksServices.getFeedbacks();
    sendResponse(res, 200, "Feedbacks retrieved Successfully", feedbacks);
  } catch (error: any) {
    next(error);
  }
};

const getFeedbacksByUserId: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const feedbacks = await feedbacksServices.getFeedbacksByUserId(userId);
    sendResponse(res, 200, "Feedbacks retrieved Successfully", feedbacks);
  } catch (error: any) {
    next(error);
  }
};

export const feedbacksController = {
  submitAFeedback,
  getAllFeedbacks,
  getFeedbacksByUserId,
};
