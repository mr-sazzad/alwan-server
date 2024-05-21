import { MulterError } from "multer";
import { IGenericErrorMessage, IGenericErrorResponse } from "../types";

const handleMulterError = (error: MulterError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
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

export default handleMulterError;
