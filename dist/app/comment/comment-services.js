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
exports.commentServices = void 0;
const prisma_1 = __importDefault(require("../../libs/prisma"));
const api_errors_1 = __importDefault(require("../../errors/api-errors"));
const createComment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.comment.create({ data });
    }
    catch (error) {
        throw new api_errors_1.default(500, "Failed to create comment. Please try again later.");
    }
});
const getCommentsByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.comment.findMany({
            where: { productId },
        });
    }
    catch (error) {
        throw new api_errors_1.default(500, "Failed to retrieve comments for the product. Please try again later.");
    }
});
const deleteCommentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.comment.delete({
            where: { id },
        });
    }
    catch (error) {
        throw new api_errors_1.default(500, "Failed to delete comment. Please try again later.");
    }
});
exports.commentServices = {
    createComment,
    getCommentsByProductId,
    deleteCommentById,
};
