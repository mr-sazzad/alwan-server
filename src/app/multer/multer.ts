import upload from "../../config/multer-config";
import { NextFunction, Request, Response } from "express";

const uploadMultipleFiles = (
  fileNames: string,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = upload.array(fileNames)(req, res, (err) => {
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
