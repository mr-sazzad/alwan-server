"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServiceLogger = exports.serverLogger = void 0;
const winston_1 = __importDefault(require("./winston"));
exports.serverLogger = (0, winston_1.default)({ service: "application-server" });
exports.orderServiceLogger = (0, winston_1.default)({ service: "order-service" });
