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
exports.feedbacksServices = void 0;
const prisma_1 = __importDefault(require("../../libs/prisma"));
const api_errors_1 = __importDefault(require("../../errors/api-errors"));
const submitAFeedback = (feedback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Await the creation operation
        const newFeedback = yield prisma_1.default.feedback.create({
            data: feedback,
        });
        return newFeedback;
    }
    catch (error) {
        // More specific error handling can be done here
        throw new api_errors_1.default(500, "Internal Server Error. Please try again later.");
    }
});
const getFeedbacks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Directly return the promise
        return yield prisma_1.default.feedback.findMany({});
    }
    catch (error) {
        throw new api_errors_1.default(500, "Internal Server Error. Please try again later.");
    }
});
const getFeedbacksByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Directly return the promise
        return yield prisma_1.default.feedback.findMany({
            where: { userId },
        });
    }
    catch (error) {
        throw new api_errors_1.default(500, "Internal Server Error. Please try again later.");
    }
});
exports.feedbacksServices = {
    submitAFeedback,
    getFeedbacks,
    getFeedbacksByUserId,
};
