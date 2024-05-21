import { RequestHandler } from "express";
import { commentServices } from "./comment-services";
import sendResponse from "../../helpers/send-response";

const createComment: RequestHandler = async (req, res, next) => {
  try {
    const commentData = req.body;
    const createdComment = await commentServices.createComment(commentData);
    sendResponse(res, 201, "Comment Created Successfully", createdComment);
  } catch (error) {
    next(error);
  }
};

const getAllCommentsByProductId: RequestHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const comments = await commentServices.getCommentsByProductId(productId);
    sendResponse(res, 200, "Comments Retrieved Successfully", comments);
  } catch (error) {
    next(error);
  }
};

const deleteCommentById: RequestHandler = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await commentServices.deleteCommentById(commentId);
    sendResponse(res, 200, "Comment Deleted Successfully", deletedComment);
  } catch (error) {
    next(error);
  }
};

export const commentController = {
  createComment,
  getAllCommentsByProductId,
  deleteCommentById,
};
