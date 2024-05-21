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
exports.productController = void 0;
const products_service_1 = require("./products-service");
const api_errors_1 = __importDefault(require("../../errors/api-errors"));
const send_response_1 = __importDefault(require("../../helpers/send-response"));
const registerAProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registeredProduct = yield products_service_1.productServices.registerAProduct(req.body);
        (0, send_response_1.default)(res, 201, "Product Registered Successfully", registeredProduct);
    }
    catch (error) {
        next(error);
    }
});
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield products_service_1.productServices.getAllProducts();
        (0, send_response_1.default)(res, 200, "Product's Retrieved Successfully", products);
    }
    catch (error) {
        next(error);
    }
});
const getSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = yield products_service_1.productServices.getSingleProduct(productId);
        if (!product) {
            return next(new api_errors_1.default(404, "Product Not Found"));
        }
        (0, send_response_1.default)(res, 200, "Single Product Retrieved Successfully", product);
    }
    catch (error) {
        next(error);
    }
});
const updateSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const data = req.body;
        const updatedProduct = yield products_service_1.productServices.updateSingleProduct(productId, data);
        (0, send_response_1.default)(res, 200, "Single Product Updated Successfully", updatedProduct);
    }
    catch (error) {
        next(error);
    }
});
const deleteSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield products_service_1.productServices.deleteSingleProduct(productId);
        // 204 No Content is appropriate for delete operations
        (0, send_response_1.default)(res, 200, "Product deleted successfully", null);
    }
    catch (error) {
        next(error);
    }
});
exports.productController = {
    registerAProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};
