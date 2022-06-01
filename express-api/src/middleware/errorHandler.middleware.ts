import {NextFunction, Request, Response} from "express-serve-static-core";
import {errorBuilder} from "../helper/response.helper";
import {appLogger} from "../helper/logger.helper";

export const errorHandler = function (err: any, _req: Request, res: Response, _next: NextFunction) {
    appLogger.error("Middleware",err)
    let status = err.status ? err.status : (res.statusCode >= 400 && res.statusCode <= 599 ? res.statusCode : 500);
    let message = err.message ? err.message : "Server errors";

    errorBuilder(res, message, status)
}

