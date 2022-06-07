import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {TApiResult} from "../types/TApiResult";
import {TApiResponse} from "../types/IApiResponse";
import history from "./history"
import {logout} from "../store/auth/authSlice";
import {Store} from "redux";
import tokenService from "../services/tokenService";
import * as authService from "../services/authService";
import {TApiErrors} from "../types/TApiErrors";
import authConstants from "../constants/authConstants";
import jwt_decode from "jwt-decode";
import TJwtEncode from "../types/auth/TJwtEncode";
import TJwt from "../types/auth/TJwt";

let store: Store;

export const httpInjectStore = (_store: Store) => {
    store = _store
};

enum StatusCode {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    TooManyRequests = 429,
    InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": true
};

class Http {
    private fetchRefreshToken: Promise<TApiResult<TJwt>> | null = null;
    private instance: AxiosInstance | null = null;

    private get http(): AxiosInstance {
        return this.instance ? this.instance : this.initHttp();
    }

    initHttp() {
        const http = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL,
            headers,
            withCredentials: true,
        });

        http.interceptors.request.use(this.injectToken, (error) => Promise.reject(error));

        http.interceptors.response.use((response: AxiosResponse<TApiResponse>) => response, (error: any) => this.handleError(error));

        this.instance = http;
        return http;
    }

    injectToken = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        try {
            let accessToken = tokenService.getAccessToken();
            if (store.getState().auth.isLogin && accessToken) {
                const tokenEncode: TJwtEncode = jwt_decode<TJwtEncode>(accessToken)
                if (!Object.values(authConstants.api).includes(config.url ?? "") &&
                    Date.now() >= tokenEncode.exp * 1000) {
                    if (this.fetchRefreshToken === null) {
                        let refreshToken = tokenService.getRefreshToken();
                        this.fetchRefreshToken = authService.refreshToken(refreshToken);
                    }
                    let response = await this.fetchRefreshToken;
                    if (response != null && response.status && response.data) {
                        tokenService.setToken(response.data);
                        accessToken = response.data.accessToken;
                        this.fetchRefreshToken = null;
                    }
                }
                config.headers = {
                    Authorization: `Bearer ${accessToken}`
                };
            }
            return config;
        } catch (error) {
            throw new Error(error);
        }
    };

    public get = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<TApiResult<T>> => {
        try {
            let response = await this.http.get<TApiResponse<T>>(url, config);
            return {status: true, data: response.data.content};
        } catch (error) {
            return {status: false, error: error};
        }
    };

    public post = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<TApiResult<T>> => {
        try {
            let response = await this.http.post<TApiResponse<T>>(url, data, config);
            return {status: true, data: response.data.content};
        } catch (error) {
            return {status: false, error: error};
        }

    };

    public put = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<TApiResult<T>> => {
        try {
            let response = await this.http.put<TApiResponse<T>>(url, data, config);
            return {status: true, data: response.data.content};
        } catch (error) {
            return {status: false, error: error};
        }
    };

    public delete = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<TApiResult<T>> => {
        try {
            let response = await this.http.delete<TApiResponse<T>>(url, config);
            return {status: true, data: response.data.content};
        } catch (error) {
            return {status: false, error: error};
        }
    };

    // Handle global app errors
    // We can handle generic app errors depending on the status code
    private handleError = async (errors: any) => {
        const {response, message, config} = errors;
        if (response) {
            const {status, data} = response;
            switch (status) {
                case StatusCode.BadRequest: {
                    const {errors} = data;
                    return Promise.reject(errors);
                }
                case StatusCode.NotFound: {
                    const {errors} = data;
                    return Promise.reject(errors);
                }
                case StatusCode.InternalServerError: {
                    const {errors} = data;
                    return Promise.reject(errors);
                }
                case StatusCode.Forbidden: {
                    const {errors} = data;
                    history.push("/403");
                    return Promise.reject(errors);
                }
                case StatusCode.Unauthorized: {
                    const {errors} = data;
                    if (store.getState().auth.isLogin && !Object.values(authConstants.api).includes(config.url) && !config._retry) {
                        config._retry = true;
                        if (this.fetchRefreshToken === null) {
                            let token = tokenService.getRefreshToken();
                            this.fetchRefreshToken = authService.refreshToken(token);
                        }
                        let response = await this.fetchRefreshToken;
                        if (response != null && response.status && response.data) {
                            tokenService.setToken(response.data);
                            this.fetchRefreshToken = null;
                            return this.http.request(config);
                        }
                    }
                    if (store.getState().auth.isLogin) {
                        store.dispatch(logout());
                        history.push("/login");
                    }
                    return Promise.reject(errors);
                }
                case StatusCode.TooManyRequests: {
                    const {errors} = data;
                    return Promise.reject(errors);
                }
            }
        }
        if (!response && message) {
            let apiErrors: TApiErrors = {
                message: message,
                status: "1",
                subErrors: []
            };
            return Promise.reject(apiErrors);
        }
        return Promise.reject(errors);
    }
}

export default new Http();
