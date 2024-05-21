import { Prisma, Order } from "@prisma/client";
import prisma from "../../libs/prisma";
import { IOrder, IOrderItem, IReturn } from "../../types";
import ApiError from "../../errors/api-errors";

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

const createOrder = async (orderData: IOrder): Promise<Order> => {
  const {
    items = [],
    couponId,
    totalCost,
    return: returns = [],
    ...orderDetails
  } = orderData;

  let finalTotalCost = totalCost;

  if (couponId) {
    const coupon = await prisma.coupon.findUnique({
      where: { id: couponId },
    });

    if (coupon && coupon.isActive) {
      const discount = (totalCost * coupon.discountPercentage) / 100;
      finalTotalCost = totalCost - discount;
    } else {
      throw new Error("Invalid or inactive coupon");
    }
  }

  const createdOrder = await prisma.order.create({
    data: {
      ...orderDetails,
      totalCost: finalTotalCost,
      items: {
        create: items.map(({ productId, size, quantity }: IOrderItem) => ({
          productId,
          size,
          quantity,
        })),
      },
      return: {
        create: returns.map(({ returnReason, returnNote }: IReturn) => ({
          returnReason,
          returnNote,
        })),
      },
    },
  });

  return createdOrder;
};

const getOrders = async (): Promise<Order[] | null> => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
    });
    return orders;
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};

const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        items: true,
      },
    });

    return orders;
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error");
  }
};

const getOrderByOrderId = async (orderId: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        items: true,
      },
    });

    return order;
  } catch (err) {
    throw new ApiError(500, "Internal Server Error");
  }
};

const updateOrderByOrderId = async (
  orderId: string,
  data: Partial<Order>
): Promise<Order> => {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: data,
    });

    return updatedOrder;
  } catch (error) {
    console.error("Failed to update order:", error);
    throw new ApiError(500, "Internal Server Error");
  }
};

const removeOrderByOrderId = async (orderId: string): Promise<Order> => {
  try {
    const deleteOrder = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    return deleteOrder;
  } catch (error) {
    console.error("Failed to update order:", error);
    throw new ApiError(500, "Internal Server Error");
  }
};

export const orderServices = {
  createOrder,
  getOrders,
  getOrdersByUserId,
  getOrderByOrderId,
  updateOrderByOrderId,
  removeOrderByOrderId,
};
