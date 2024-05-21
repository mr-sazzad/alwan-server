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
exports.feedbacksController = void 0;
const feedback_services_1 = require("./feedback-services");
const send_response_1 = __importDefault(require("../../helpers/send-response"));
const submitAFeedback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = req.body;
        const createdFeedback = yield feedback_services_1.feedbacksServices.submitAFeedback(content);
        (0, send_response_1.default)(res, 201, "Feedback Created Successfully", createdFeedback);
    }
    catch (error) {
        next(error);
    }
});
const getAllFeedbacks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedbacks = yield feedback_services_1.feedbacksServices.getFeedbacks();
        (0, send_response_1.default)(res, 200, "Feedbacks retrieved Successfully", feedbacks);
    }
    catch (error) {
        next(error);
    }
});
const getFeedbacksByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const feedbacks = yield feedback_services_1.feedbacksServices.getFeedbacksByUserId(userId);
        (0, send_response_1.default)(res, 200, "Feedbacks retrieved Successfully", feedbacks);
    }
    catch (error) {
        next(error);
    }
});
exports.feedbacksController = {
    submitAFeedback,
    getAllFeedbacks,
    getFeedbacksByUserId,
};
