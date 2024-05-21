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
exports.userController = void 0;
const user_service_1 = require("./user-service");
const send_response_1 = __importDefault(require("../../helpers/send-response"));
const getAllAdmins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield user_service_1.userServices.getAllAdmins();
        (0, send_response_1.default)(res, 200, "Admins Retrieved Successfully", admins);
    }
    catch (error) {
        next(error);
    }
});
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.userServices.getAllUsers();
        (0, send_response_1.default)(res, 200, "Users Retrieved Successfully", users);
    }
    catch (error) {
        next(error);
    }
});
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield user_service_1.userServices.getSingleUser(userId);
        (0, send_response_1.default)(res, 200, "User Retrieved Successfully", user);
    }
    catch (error) {
        next(error);
    }
});
const updateSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const data = req.body;
    try {
        const user = yield user_service_1.userServices.updateSingleUser(userId, data);
        (0, send_response_1.default)(res, 200, "User Updated Successfully", user);
    }
    catch (error) {
        next(error);
    }
});
const removeSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield user_service_1.userServices.removeSingleUser(userId);
        (0, send_response_1.default)(res, 200, "User Removed Successfully", user);
    }
    catch (error) {
        next(error);
    }
});
exports.userController = {
    getAllAdmins,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    removeSingleUser,
};
