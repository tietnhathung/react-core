import { TApiErrors } from "./TApiErrors";

export interface TApiResponse<T = any> {
    httpStatus: boolean;
    content: T;
    errors: TApiErrors;
}
