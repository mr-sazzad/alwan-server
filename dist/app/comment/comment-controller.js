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
exports.commentController = void 0;
const comment_services_1 = require("./comment-services");
const send_response_1 = __importDefault(require("../../helpers/send-response"));
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentData = req.body;
        const createdComment = yield comment_services_1.commentServices.createComment(commentData);
        (0, send_response_1.default)(res, 201, "Comment Created Successfully", createdComment);
    }
    catch (error) {
        next(error);
    }
});
const getAllCommentsByProductId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const comments = yield comment_services_1.commentServices.getCommentsByProductId(productId);
        (0, send_response_1.default)(res, 200, "Comments Retrieved Successfully", comments);
    }
    catch (error) {
        next(error);
    }
});
const deleteCommentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const deletedComment = yield comment_services_1.commentServices.deleteCommentById(commentId);
        (0, send_response_1.default)(res, 200, "Comment Deleted Successfully", deletedComment);
    }
    catch (error) {
        next(error);
    }
});
exports.commentController = {
    createComment,
    getAllCommentsByProductId,
    deleteCommentById,
};
