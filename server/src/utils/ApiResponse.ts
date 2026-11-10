class ApiResponse<T>{
    success: boolean;
    message: string;
    statusCode: number;
    data: T;
    constructor(statusCode: number, message: string,  data: T){
        this.statusCode = statusCode;
        this.success = statusCode < 400 ? true : false;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;