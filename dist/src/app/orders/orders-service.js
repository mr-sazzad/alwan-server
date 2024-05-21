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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const prisma_1 = __importDefault(require("../../libs/prisma"));
const api_errors_1 = __importDefault(require("../../errors/api-errors"));
// const createOrder = async (orderData: IOrder): Promise<Order> => {
//   const { items, couponId, totalCost, ...orderDetails } = orderData;
//   let finalTotalCost = totalCost;
//   if (couponId) {
//     const coupon = await prisma.coupon.findUnique({
//       where: { id: couponId },
//     });
//     if (coupon && coupon.isActive) {
//       const discount = (totalCost * coupon.discountPercentage) / 100;
//       finalTotalCost = totalCost - discount;
//     } else {
//       throw new Error("Invalid or inactive coupon");
//     }
//   }
//   const createOrder = await prisma.order.create({
//     data: {
//       ...orderDetails,
//       totalCost: finalTotalCost,
//       items: {
//         createMany: {
//           data: items.map(({ productId, size, quantity }: IOrderItem) => ({
//             productId,
//             size,
//             quantity,
//           })),
//         },
//       },
//     },
//   });
//   return createOrder;
// };
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { items = [], couponId, totalCost, return: returns = [] } = orderData, orderDetails = __rest(orderData, ["items", "couponId", "totalCost", "return"]);
    let finalTotalCost = totalCost;
    if (couponId) {
        const coupon = yield prisma_1.default.coupon.findUnique({
            where: { id: couponId },
        });
        if (coupon && coupon.isActive) {
            const discount = (totalCost * coupon.discountPercentage) / 100;
            finalTotalCost = totalCost - discount;
        }
        else {
            throw new Error("Invalid or inactive coupon");
        }
    }
    const createdOrder = yield prisma_1.default.order.create({
        data: Object.assign(Object.assign({}, orderDetails), { totalCost: finalTotalCost, items: {
                create: items.map(({ productId, size, quantity }) => ({
                    productId,
                    size,
                    quantity,
                })),
            }, return: {
                create: returns.map(({ returnReason, returnNote }) => ({
                    returnReason,
                    returnNote,
                })),
            } }),
    });
    return createdOrder;
});
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield prisma_1.default.order.findMany({
            include: {
                items: true,
            },
        });
        return orders;
    }
    catch (error) {
        throw new api_errors_1.default(500, "Internal Server Error");
    }
});
const getOrdersByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield prisma_1.default.order.findMany({
            where: {
                userId: userId,
            },
            include: {
                items: true,
            },
        });
        return orders;
    }
    catch (error) {
        throw new api_errors_1.default(500, "Internal Server Error");
    }
});
const getOrderByOrderId = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield prisma_1.default.order.findUnique({
            where: {
                id: orderId,
            },
            include: {
                items: true,
            },
        });
        return order;
    }
    catch (err) {
        throw new api_errors_1.default(500, "Internal Server Error");
    }
});
const updateOrderByOrderId = (orderId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOrder = yield prisma_1.default.order.update({
            where: {
                id: orderId,
            },
            data: data,
        });
        return updatedOrder;
    }
    catch (error) {
        console.error("Failed to update order:", error);
        throw new api_errors_1.default(500, "Internal Server Error");
    }
});
const removeOrderByOrderId = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteOrder = yield prisma_1.default.order.delete({
            where: {
                id: orderId,
            },
        });
        return deleteOrder;
    }
    catch (error) {
        console.error("Failed to update order:", error);
        throw new api_errors_1.default(500, "Internal Server Error");
    }
});
exports.orderServices = {
    createOrder,
    getOrders,
    getOrdersByUserId,
    getOrderByOrderId,
    updateOrderByOrderId,
    removeOrderByOrderId,
};
