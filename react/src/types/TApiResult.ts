import {TApiErrors} from "./TApiErrors";

export interface TApiResult<T= any>{
    status: boolean;
    data?: T;
    error?: TApiErrors;
}
