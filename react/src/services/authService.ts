import {TApiResult} from "../types/TApiResult";
import http from "../instants/axiosClient";
import authConstants from "../constants/authConstants";
import TFormLogin from "../types/auth/TFormLogin";
import TJwt from "../types/auth/TJwt";
import {AuthState} from "../store/auth/authSlice";
import jwt_decode from "jwt-decode";
import tokenService from "./tokenService";
import { IAuth } from "../types/auth/IAuth";

export const getInitialStateAuth = (): AuthState => {
    let initialState: AuthState = {
        authUser: undefined,
        isLogin: false
    }
    const token = tokenService.getAccessToken();
    if (token) {
        let decoded: { userDetails: IAuth, sub: string, iat: number, exp: number } = jwt_decode(token);
        initialState.isLogin = true;
        initialState.authUser = decoded.userDetails
    }
    return initialState
}


export const login = async (formLogin: TFormLogin): Promise<TApiResult<TJwt>> => {
    return await http.post<TJwt>(authConstants.api.login, formLogin)
}
export const googleLogin = async (token:string): Promise<TApiResult<TJwt>> => {
    return await http.post<TJwt>(authConstants.api.googleLogin, {
        access_token:token
    })
}
export const refreshToken = async (refreshToken:string|null): Promise<TApiResult<TJwt>> => {
    console.log("refresh token!")
    let payload = {
        "refreshToken": refreshToken
    }
    return await http.post<TJwt>(authConstants.api.refresh, payload);
}
