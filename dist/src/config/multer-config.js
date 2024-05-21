"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        cb(null, false);
    }
    else {
        cb(null, true);
    }
};
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter,
});
exports.default = upload;
// // For single file upload with a smaller limit
// const singleUpload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 * 2 },
//   fileFilter,
// }).single('fieldName');
// // For array file upload with a larger limit
// const arrayUpload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 * 10 },
//   fileFilter,
// }).array('fieldName', 5);
