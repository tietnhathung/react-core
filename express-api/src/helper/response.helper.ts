import {Response} from "express-serve-static-core";
import ApiResult from "../type/apiResult";
import ApiError from "../type/apiError";

export const jsonBuilder = (res: Response, content: any, status: number = 200): Response => {
    let result: ApiResult = new ApiResult();
    result.httpStatus = status
    result.content = content
    return res.json(result).status(status);
}
export const errorBuilder = (res: Response, message: string, status: number): Response => {
    let result: ApiResult = new ApiResult();
    result.httpStatus = status
    let apiError: ApiError = new ApiError();
    apiError.message = message
    apiError.debugMessage = message
    apiError.status = status
    result.error = apiError
    return res.json(result).status(status);
}
