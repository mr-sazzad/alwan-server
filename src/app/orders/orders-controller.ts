import { RequestHandler } from "express";
import { orderServices } from "./orders-service";
import sendResponse from "../../helpers/send-response";

const createOrder: RequestHandler = async (req, res, next) => {
  try {
    const createdOrder = await orderServices.createOrder(req.body);
    sendResponse(res, 200, "Order Created Successfully", createdOrder);
  } catch (error: any) {
    next(error);
  }
};

const getOrders: RequestHandler = async (req, res, next) => {
  try {
    const orders = await orderServices.getOrders();
    sendResponse(res, 200, "Orders Retrieved Successfully", orders);
  } catch (error: any) {
    next(error);
  }
};

const getOrdersByUserId: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orders = await orderServices.getOrdersByUserId(userId);
    sendResponse(res, 200, "Orders Retrieved Successfully", orders);
  } catch (error: any) {
    next(error);
  }
};

const getOrderByOrderId: RequestHandler = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orders = await orderServices.getOrderByOrderId(orderId);
    sendResponse(res, 200, "Order Retrieved Successfully", orders);
  } catch (error: any) {
    next(error);
  }
};

const updateOrderByOrderId: RequestHandler = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const data = req.body;
    const updatedOrder = await orderServices.updateOrderByOrderId(
      orderId,
      data
    );
    sendResponse(res, 200, "Order Updated Successfully", updatedOrder);
  } catch (error: any) {
    next(error);
  }
};

const deleteOrderByOrderId: RequestHandler = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await orderServices.removeOrderByOrderId(orderId);
    sendResponse(res, 200, "Orders Deleted Successfully", updatedOrder);
  } catch (error: any) {
    next(error);
  }
};

export const orderController = {
  createOrder,
  getOrders,
  getOrdersByUserId,
  getOrderByOrderId,
  updateOrderByOrderId,
  deleteOrderByOrderId,
};
