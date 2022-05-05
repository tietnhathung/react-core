import {TApiResult} from "../types/TApiResult";
import http from "../instants/axiosClient";
import authConstants from "../constants/authConstants";
import TFormLogin from "../types/auth/TFormLogin";
import TJwt from "../types/auth/TJwt";

export const login = async (formLogin: TFormLogin): Promise<TApiResult<TJwt>> => {
    return await http.post<TJwt>(authConstants.api.login, formLogin)
}
export const refreshToken = async (refreshToken:string|null): Promise<TApiResult<TJwt>> => {
    let payload = {
        "refreshToken": refreshToken
    }
    return await http.post<TJwt>(authConstants.api.refresh, payload);
}
