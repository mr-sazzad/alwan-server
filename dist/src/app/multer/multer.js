"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_config_1 = __importDefault(require("../../config/multer-config"));
const uploadMultipleFiles = (fileNames, req, res, next) => {
    const result = multer_config_1.default.array(fileNames)(req, res, (err) => {
        if (err) {
            next(err);
        }
        res.status(200).json({
            status: 200,
            message: "Files uploaded successfully.",
            data: result,
        });
    });
};
