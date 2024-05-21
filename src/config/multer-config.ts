import { Request } from "express";
import multer, { FileFilterCallback, StorageEngine } from "multer";
import path from "path";

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (!file.mimetype.startsWith("image/")) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter,
});

export default upload;

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
