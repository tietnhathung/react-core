import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {TApiResult} from "../types/TApiResult";
import {TApiResponse} from "../types/IApiResponse";
import history from "./history"
import {logout} from "../store/auth/authSlice";
import {Store} from "redux";

let store:Store

export const httpInjectStore = (_store:Store) => {
    store = _store
}

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

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
    try {
        const token = localStorage.getItem("accessToken");
        if (token != null) {
            config.headers = {
                Authorization: `Bearer ${token}`
            };
        }
        return config;
    } catch (error) {
        throw new Error(error);
    }
};

class Http {
    private instance: AxiosInstance | null = null;

    private get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttp();
    }

    initHttp() {
        const http = axios.create({
            baseURL: "http://localhost:8080/api",
            headers,
            withCredentials: true,
        });

        http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

        http.interceptors.response.use((response: AxiosResponse<TApiResponse>) => response, (error: any) => this.handleError(error));

        this.instance = http;
        return http;
    }

    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<TApiResult<T>> {
        try {
            let response = await this.http.get<TApiResponse<T>>(url, config)
            return {status: true, data: response.data.content};
        } catch (error) {
            return {status: false, error: error};
        }
    }

    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<TApiResult<T>> {
        try {
            let response = await this.http.post<TApiResponse<T>>(url, data, config);
            return {status: true, data: response.data.content};
        } catch (error) {
            return {status: false, error: error};
        }

    }

    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<TApiResult<T>> {
        try {
            let response = await this.http.put<TApiResponse<T>>(url, data, config);
            return {status: true, data: response.data.content};
        } catch (error) {
            return {status: false, error: error};
        }
    }

    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<TApiResult<T>> {
        try {
            let response = await this.http.delete<TApiResponse<T>>(url, config);
            return {status: true, data: response.data.content};
        } catch (error) {
            return {status: false, error: error};
        }
    }

    // Handle global app errors
    // We can handle generic app errors depending on the status code
    private  handleError = (errors: any) => {
        const {response, message,config} = errors;
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
                    return Promise.reject(errors);
                }
                case StatusCode.Unauthorized: {
                    const {errors} = data;
                    // if (!config._retry){
                    //     config._retry = true;
                    //     return this.http.request(config);
                    // }
                    history.push("/login");
                    store.dispatch(logout());
                    return Promise.reject(errors);
                }
                case StatusCode.TooManyRequests: {
                    const {errors} = data;
                    return Promise.reject(errors);
                }
            }
        }
        if (!response && message) {
            return Promise.reject(message);
        }
        return Promise.reject(errors);
    }
}

export default new Http();
