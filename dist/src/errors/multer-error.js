"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMulterError = (error) => {
    const errors = [
        {
            path: "file",
            message: error.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "File Upload Error",
        errorMessages: errors,
    };
};
exports.default = handleMulterError;
