import { User } from "@prisma/client";
import ApiError from "../../errors/api-errors";
import prisma from "../../libs/prisma";

const getAllAdmins = async (): Promise<User[] | null> => {
  const users = await prisma.user.findMany({
    where: {
      role: "admin",
    },
  });

  if (!users.length) {
    return null;
  }

  return users;
};

const getAllUsers = async (): Promise<User[] | null> => {
  const users = await prisma.user.findMany({
    where: {
      role: "user",
    },
  });

  if (!users.length) {
    return null;
  }

  return users;
};

const getSingleUser = async (userId: string): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const updateSingleUser = async (
  userId: string,
  data: Partial<User>
): Promise<User | null> => {
  // Remove the email field from the data object if it exists
  if ("email" in data) {
    delete data.email;
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });

    return user;
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};

const removeSingleUser = async (userId: string): Promise<User> => {
  try {
    const removedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return removedUser;
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};

export const userServices = {
  getAllAdmins,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  removeSingleUser,
};
