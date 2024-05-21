import { Feedback } from "@prisma/client";
import prisma from "../../libs/prisma";
import ApiError from "../../errors/api-errors";

const submitAFeedback = async (feedback: Feedback) => {
  try {
    // Await the creation operation
    const newFeedback = await prisma.feedback.create({
      data: feedback,
    });
    return newFeedback;
  } catch (error) {
    // More specific error handling can be done here
    throw new ApiError(500, "Internal Server Error. Please try again later.");
  }
};

const getFeedbacks = async () => {
  try {
    // Directly return the promise
    return await prisma.feedback.findMany({});
  } catch (error) {
    throw new ApiError(500, "Internal Server Error. Please try again later.");
  }
};

const getFeedbacksByUserId = async (userId: string) => {
  try {
    // Directly return the promise
    return await prisma.feedback.findMany({
      where: { userId },
    });
  } catch (error) {
    throw new ApiError(500, "Internal Server Error. Please try again later.");
  }
};

export const feedbacksServices = {
  submitAFeedback,
  getFeedbacks,
  getFeedbacksByUserId,
};
