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
exports.authServices = exports.forgotPassword = void 0;
const user_role_1 = require("../../constants/user-role");
const api_errors_1 = __importDefault(require("../../errors/api-errors"));
const prisma_1 = __importDefault(require("../../libs/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../../utils/utils");
const generate_token_1 = require("../../helpers/generate-token");
const signupUserWithCredentials = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const email = user.email;
    if (user.role === user_role_1.userRole.admin) {
        throw new api_errors_1.default(401, "you are not authorized");
    }
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: {
            email,
        },
    });
    if (isUserExist) {
        throw new Error("User already exists with this credentials");
    }
    if (user.password) {
        // Only hash the password if it's not null
        user.password = yield bcryptjs_1.default.hash(user.password, 12);
    }
    const newUser = yield prisma_1.default.user.create({
        data: user,
    });
    return newUser;
});
const signInUserWithCredentials = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const email = user.email;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!isUserExist) {
        throw new api_errors_1.default(500, "Internal Server Error Please try again later");
    }
    if (isUserExist.password) {
        const isPasswordMatch = yield bcryptjs_1.default.compare(user.password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
        if (!isPasswordMatch) {
            throw new Error("Password does not match");
        }
    }
    // const credentials = {
    //   id: isUserExist.id,
    //   email: isUserExist.email,
    //   name: isUserExist.username,
    //   role: isUserExist.role,
    // };
    // const accessToken = jwtHelpers.createToken(credentials, secret, "1d");
    // const refreshToken = jwtHelpers.createToken(credentials, secret, "365d");
    const { accessToken, refreshToken } = (0, generate_token_1.generateTokens)(isUserExist);
    return {
        accessToken,
        refreshToken,
    };
});
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new api_errors_1.default(404, "No user found with this email");
    }
    const token = (0, utils_1.generateToken)();
    const expiresAt = new Date(Date.now() + 3600000);
    const existingToken = yield prisma_1.default.passwordResetToken.findFirst({
        where: { userId: user.id },
    });
    if (existingToken) {
        // Update the existing token
        yield prisma_1.default.passwordResetToken.update({
            where: { id: existingToken.id },
            data: {
                token,
                expiresAt,
            },
        });
    }
    else {
        // Create a new token
        yield prisma_1.default.passwordResetToken.create({
            data: {
                token,
                userId: user.id,
                expiresAt,
            },
        });
    }
    yield (0, utils_1.sendEmail)(email, token);
});
exports.forgotPassword = forgotPassword;
exports.authServices = {
    signupUserWithCredentials,
    signInUserWithCredentials,
    forgotPassword: exports.forgotPassword,
};
