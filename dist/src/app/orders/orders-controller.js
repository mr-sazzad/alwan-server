"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const orders_service_1 = require("./orders-service");
const send_response_1 = __importDefault(require("../../helpers/send-response"));
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdOrder = yield orders_service_1.orderServices.createOrder(req.body);
        (0, send_response_1.default)(res, 200, "Order Created Successfully", createdOrder);
    }
    catch (error) {
        next(error);
    }
});
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orders_service_1.orderServices.getOrders();
        (0, send_response_1.default)(res, 200, "Orders Retrieved Successfully", orders);
    }
    catch (error) {
        next(error);
    }
});
const getOrdersByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orders = yield orders_service_1.orderServices.getOrdersByUserId(userId);
        (0, send_response_1.default)(res, 200, "Orders Retrieved Successfully", orders);
    }
    catch (error) {
        next(error);
    }
});
const getOrderByOrderId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const orders = yield orders_service_1.orderServices.getOrderByOrderId(orderId);
        (0, send_response_1.default)(res, 200, "Order Retrieved Successfully", orders);
    }
    catch (error) {
        next(error);
    }
});
const updateOrderByOrderId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const data = req.body;
        const updatedOrder = yield orders_service_1.orderServices.updateOrderByOrderId(orderId, data);
        (0, send_response_1.default)(res, 200, "Order Updated Successfully", updatedOrder);
    }
    catch (error) {
        next(error);
    }
});
const deleteOrderByOrderId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const updatedOrder = yield orders_service_1.orderServices.removeOrderByOrderId(orderId);
        (0, send_response_1.default)(res, 200, "Orders Deleted Successfully", updatedOrder);
    }
    catch (error) {
        next(error);
    }
});
exports.orderController = {
    createOrder,
    getOrders,
    getOrdersByUserId,
    getOrderByOrderId,
    updateOrderByOrderId,
    deleteOrderByOrderId,
};
