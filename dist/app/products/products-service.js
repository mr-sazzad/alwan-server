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
exports.productServices = void 0;
const prisma_1 = __importDefault(require("./../../libs/prisma"));
const api_errors_1 = __importDefault(require("../../errors/api-errors"));
const registerAProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdProduct = yield prisma_1.default.product.create({ data: product });
        if (!createdProduct) {
            throw new api_errors_1.default(500, "Failed to create product");
        }
        return createdProduct;
    }
    catch (error) {
        // If Prisma or database operation fails, throw an ApiError with a descriptive message
        throw new api_errors_1.default(500, error.message);
    }
});
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma_1.default.product.findMany();
        // Assuming you want to return an empty array if no products are found
        return products.length > 0 ? products : [];
    }
    catch (error) {
        throw new api_errors_1.default(500, error.message);
    }
});
const getSingleProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(productId, "single product");
        const product = yield prisma_1.default.product.findUnique({
            where: {
                id: productId,
            },
        });
        if (!product) {
            // It's usually better to return null if a specific item isn't found,
            // but if your application logic requires throwing an error, keep this line.
            throw new api_errors_1.default(404, "Product not found");
        }
        return product;
    }
    catch (error) {
        throw new api_errors_1.default(500, error.message);
    }
});
const updateSingleProduct = (productId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Directly attempt to update the product without checking if it exists first
        const updatedProduct = yield prisma_1.default.product.update({
            where: {
                id: productId,
            },
            data,
        });
        // Assuming successful update returns the product, no need to check for null
        return updatedProduct;
    }
    catch (error) {
        // Prisma throws a P2025 error when trying to update a record that doesn't exist
        if (error.code === "P2025") {
            throw new api_errors_1.default(404, "Product not found");
        }
        else {
            throw new api_errors_1.default(500, error.message);
        }
    }
});
const deleteSingleProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Attempt to delete the product directly
        const deletedProduct = yield prisma_1.default.product.delete({
            where: {
                id: productId,
            },
        });
        // Assuming delete was successful, return the deleted product
        return deletedProduct;
    }
    catch (error) {
        // Handle case where product does not exist
        if (error.code === "P2025") {
            throw new api_errors_1.default(404, "Product not found");
        }
        else {
            // Log unexpected errors for debugging
            throw new api_errors_1.default(500, error.message);
        }
    }
});
exports.productServices = {
    registerAProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};
