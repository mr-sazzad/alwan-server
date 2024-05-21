import { Product } from "@prisma/client";
import prisma from "./../../libs/prisma";
import ApiError from "../../errors/api-errors";

const registerAProduct = async (product: Product): Promise<Product> => {
  try {
    const createdProduct = await prisma.product.create({ data: product });
    if (!createdProduct) {
      throw new ApiError(500, "Failed to create product");
    }
    return createdProduct;
  } catch (error: any) {
    // If Prisma or database operation fails, throw an ApiError with a descriptive message
    throw new ApiError(500, error.message);
  }
};

const getAllProducts = async (): Promise<Product[]> => {
  try {
    const products = await prisma.product.findMany();
    // Assuming you want to return an empty array if no products are found
    return products.length > 0 ? products : [];
  } catch (error: any) {
    throw new ApiError(500, error.message);
  }
};

const getSingleProduct = async (productId: string): Promise<Product | null> => {
  try {
    console.log(productId, "single product");
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      // It's usually better to return null if a specific item isn't found,
      // but if your application logic requires throwing an error, keep this line.
      throw new ApiError(404, "Product not found");
    }

    return product;
  } catch (error: any) {
    throw new ApiError(500, error.message);
  }
};

const updateSingleProduct = async (
  productId: string,
  data: Partial<Product>
): Promise<Product> => {
  try {
    // Directly attempt to update the product without checking if it exists first
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data,
    });

    // Assuming successful update returns the product, no need to check for null
    return updatedProduct;
  } catch (error: any) {
    // Prisma throws a P2025 error when trying to update a record that doesn't exist
    if (error.code === "P2025") {
      throw new ApiError(404, "Product not found");
    } else {
      throw new ApiError(500, error.message);
    }
  }
};

const deleteSingleProduct = async (productId: string): Promise<Product> => {
  try {
    // Attempt to delete the product directly
    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    // Assuming delete was successful, return the deleted product
    return deletedProduct;
  } catch (error: any) {
    // Handle case where product does not exist
    if (error.code === "P2025") {
      throw new ApiError(404, "Product not found");
    } else {
      // Log unexpected errors for debugging
      throw new ApiError(500, error.message);
    }
  }
};

export const productServices = {
  registerAProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
