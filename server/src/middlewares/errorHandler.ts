import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";
import ENV from "../configs/envConfig.js";
import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err instanceof AppError ? err.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = err.message || MESSAGES.SERVER.INTERNAL_ERROR;


    return new ApiResponse(statusCode, message, {StackTrace: ENV.NODE_ENV === "development"? err.stack : undefined})

}

export default errorHandler;