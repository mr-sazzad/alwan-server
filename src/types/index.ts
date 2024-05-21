export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginUserTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IProduct {
  name: string;
  prices: number[];
  sizes: string[];
  desc: string[];
  features: string[];
  images: string[];
  mSizeStock: number;
  lSizeStock: number;
  xlSizeStock: number;
  xxlSizeStock: number;
  color:
    | "black"
    | "white"
    | "skyBlue"
    | "gray"
    | "purple"
    | "lightGreen"
    | "multicolor";
  isFreeDeliveryAvailable: boolean;
  status: "in_stock" | "stock_out";
  isCouponApplicable: boolean;
}

export interface IOrderItem {
  productId: string;
  size?: string;
  quantity: number;
}

export interface IReturn {
  orderId: string;
  returnReason: string;
  returnNote: string;
}

export interface IOrder {
  userId?: string;
  email: string;
  shippingAddress: string;
  shippingCity: string;
  totalCost: number;
  phone: string;
  altPhone?: string;
  items: IOrderItem[];
  return: IReturn[];
  couponId?: string;
  orderNote?: string;
  paymentMethod: "cashOnDelivery" | "SSLCommerz";
}

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
