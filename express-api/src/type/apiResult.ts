import ApiError from "./apiError";

class ApiResult {
    httpStatus: number
    content: any
    error: ApiError
}

export default ApiResult;
