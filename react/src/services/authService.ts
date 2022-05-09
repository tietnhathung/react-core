import {TApiResult} from "../types/TApiResult";
import http from "../instants/axiosClient";
import authConstants from "../constants/authConstants";
import TFormLogin from "../types/auth/TFormLogin";
import TJwt from "../types/auth/TJwt";
import {AuthState} from "../store/auth/authSlice";
import {IUser} from "../types/entities/IUser";
import jwt_decode from "jwt-decode";
import tokenService from "./tokenService";

export const getInitialStateAuth = (): AuthState => {
    let initialState: AuthState = {
        authUser: undefined,
        isLogin: false
    }
    const token = tokenService.getAccessToken();
    if (token) {
        let decoded: { userDetails: IUser, sub: string, iat: number, exp: number } = jwt_decode(token);
        initialState.isLogin = true;
        initialState.authUser = decoded.userDetails
    }
    return initialState
}


export const login = async (formLogin: TFormLogin): Promise<TApiResult<TJwt>> => {
    return await http.post<TJwt>(authConstants.api.login, formLogin)
}
export const refreshToken = async (refreshToken:string|null): Promise<TApiResult<TJwt>> => {
    let payload = {
        "refreshToken": refreshToken
    }
    return await http.post<TJwt>(authConstants.api.refresh, payload);
}
