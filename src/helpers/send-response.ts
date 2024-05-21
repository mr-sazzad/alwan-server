import { Response } from "express";

const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any
) => {
  res.status(statusCode).json({
    status: statusCode,
    message,
    data,
  });
};

export default sendResponse;
