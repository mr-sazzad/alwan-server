import { RequestHandler } from "express";
import { userServices } from "./user-service";
import sendResponse from "../../helpers/send-response";

const getAllAdmins: RequestHandler = async (req, res, next) => {
  try {
    const admins = await userServices.getAllAdmins();

    sendResponse(res, 200, "Admins Retrieved Successfully", admins);
  } catch (error: any) {
    next(error);
  }
};

const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await userServices.getAllUsers();

    sendResponse(res, 200, "Users Retrieved Successfully", users);
  } catch (error: any) {
    next(error);
  }
};

const getSingleUser: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await userServices.getSingleUser(userId);

    sendResponse(res, 200, "User Retrieved Successfully", user);
  } catch (error: any) {
    next(error);
  }
};

const updateSingleUser: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const user = await userServices.updateSingleUser(userId, data);

    sendResponse(res, 200, "User Updated Successfully", user);
  } catch (error: any) {
    next(error);
  }
};

const removeSingleUser: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await userServices.removeSingleUser(userId);

    sendResponse(res, 200, "User Removed Successfully", user);
  } catch (error: any) {
    next(error);
  }
};

export const userController = {
  getAllAdmins,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  removeSingleUser,
};
