import { RequestHandler } from "express";
import { productServices } from "./products-service";
import ApiError from "../../errors/api-errors";
import sendResponse from "../../helpers/send-response";

const registerAProduct: RequestHandler = async (req, res, next) => {
  try {
    const registeredProduct = await productServices.registerAProduct(req.body);

    sendResponse(
      res,
      201,
      "Product Registered Successfully",
      registeredProduct
    );
  } catch (error) {
    next(error);
  }
};

const getAllProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await productServices.getAllProducts();
    sendResponse(res, 200, "Product's Retrieved Successfully", products);
  } catch (error) {
    next(error);
  }
};

const getSingleProduct: RequestHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await productServices.getSingleProduct(productId);
    if (!product) {
      return next(new ApiError(404, "Product Not Found"));
    }
    sendResponse(res, 200, "Single Product Retrieved Successfully", product);
  } catch (error) {
    next(error);
  }
};

const updateSingleProduct: RequestHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const data = req.body;
    const updatedProduct = await productServices.updateSingleProduct(
      productId,
      data
    );
    sendResponse(
      res,
      200,
      "Single Product Updated Successfully",
      updatedProduct
    );
  } catch (error) {
    next(error);
  }
};

const deleteSingleProduct: RequestHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    await productServices.deleteSingleProduct(productId);
    // 204 No Content is appropriate for delete operations
    sendResponse(res, 200, "Product deleted successfully", null);
  } catch (error) {
    next(error);
  }
};

export const productController = {
  registerAProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
