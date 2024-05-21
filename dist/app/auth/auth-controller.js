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
exports.authController = void 0;
const auth_service_1 = require("./auth-service");
const send_response_1 = __importDefault(require("../../helpers/send-response"));
const generate_token_1 = require("../../helpers/generate-token");
const signUpWithCredentials = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credential = req.body;
        const signedUpUser = yield auth_service_1.authServices.signupUserWithCredentials(credential);
        (0, send_response_1.default)(res, 201, "User Signed Up Successfully", signedUpUser);
    }
    catch (error) {
        next(error);
    }
});
const signInWithCredentials = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credential = req.body;
        const result = yield auth_service_1.authServices.signInUserWithCredentials(credential);
        const { refreshToken } = result;
        const cookieOptions = {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        };
        res.cookie("refreshToken", refreshToken, cookieOptions);
        (0, send_response_1.default)(res, 200, "User Signed In Successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const result = yield auth_service_1.authServices.forgotPassword(email);
        res.status(200).json({
            status: 200,
            message: "Email sent successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const googleLoginSuccess = (req, res, next) => {
    try {
        const user = req.user;
        const tokens = (0, generate_token_1.generateTokens)(user);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: tokens,
        });
    }
    catch (error) {
        next(error);
    }
};
const googleLoginFailure = (req, res, next) => {
    res.status(400).json({
        success: false,
        message: "Login failed",
        data: null,
    });
};
exports.authController = {
    signUpWithCredentials,
    signInWithCredentials,
    forgotPassword,
    googleLoginSuccess,
    googleLoginFailure,
};
