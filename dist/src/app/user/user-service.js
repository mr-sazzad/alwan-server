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
exports.userServices = void 0;
const api_errors_1 = __importDefault(require("../../errors/api-errors"));
const prisma_1 = __importDefault(require("../../libs/prisma"));
const getAllAdmins = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_1.default.user.findMany({
        where: {
            role: "admin",
        },
    });
    if (!users.length) {
        return null;
    }
    return users;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_1.default.user.findMany({
        where: {
            role: "user",
        },
    });
    if (!users.length) {
        return null;
    }
    return users;
});
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new api_errors_1.default(404, "User not found");
    }
    return user;
});
const updateSingleUser = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Remove the email field from the data object if it exists
    if ("email" in data) {
        delete data.email;
    }
    try {
        const user = yield prisma_1.default.user.update({
            where: {
                id: userId,
            },
            data,
        });
        return user;
    }
    catch (error) {
        throw new api_errors_1.default(500, "Internal Server Error");
    }
});
const removeSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const removedUser = yield prisma_1.default.user.delete({
            where: {
                id: userId,
            },
        });
        return removedUser;
    }
    catch (error) {
        throw new api_errors_1.default(500, "Internal Server Error");
    }
});
exports.userServices = {
    getAllAdmins,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    removeSingleUser,
};
