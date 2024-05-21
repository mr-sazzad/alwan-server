import { Prisma, Comment } from "@prisma/client";
import prisma from "../../libs/prisma";
import ApiError from "../../errors/api-errors";

const createComment = async (data: Prisma.CommentCreateInput) => {
  try {
    return await prisma.comment.create({ data });
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to create comment. Please try again later."
    );
  }
};

const getCommentsByProductId = async (productId: string) => {
  try {
    return await prisma.comment.findMany({
      where: { productId },
    });
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to retrieve comments for the product. Please try again later."
    );
  }
};

const deleteCommentById = async (id: string) => {
  try {
    return await prisma.comment.delete({
      where: { id },
    });
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to delete comment. Please try again later."
    );
  }
};

export const commentServices = {
  createComment,
  getCommentsByProductId,
  deleteCommentById,
};
