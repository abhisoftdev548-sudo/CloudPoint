class AppError extends Error{
    statusCode: number = 500;
    message: string;
    isOperational: boolean;
    constructor(statusCode: number, message: string, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;