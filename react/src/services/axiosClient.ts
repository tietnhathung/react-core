import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {TApiResult} from "../types/TApiResult";
import {TApiResponse} from "../types/IApiResponse";

enum StatusCode {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
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

        http.interceptors.response.use((response: AxiosResponse<TApiResponse>) => response, (error: any) => Http.handleError(error));

        this.instance = http;
        return http;
    }

    async get(url: string, config?: AxiosRequestConfig): Promise<TApiResult> {
        try {
            let response = await this.http.get<TApiResponse>(url, config)
            return {status: true, data: response.data.content, error: {}};
        } catch (error) {
            return {status: false, data: {}, error: error};
        }
    }

    async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<TApiResult> {
        try {
            let response = await this.http.post<TApiResponse>(url, data, config);
            return {status: true, data: response.data.content, error: {}};
        } catch (error) {
            return {status: false, data: {}, error: error};
        }

    }

    async put(url: string, data?: any, config?: AxiosRequestConfig): Promise<TApiResult> {
        try {
            let response = await this.http.put<TApiResponse>(url, data, config);
            return {status: true, data: response.data.content, error: {}};
        } catch (error) {
            return {status: false, data: {}, error: error};
        }
    }

    async delete(url: string, config?: AxiosRequestConfig): Promise<TApiResult> {
        try {
            let response = await this.http.delete<TApiResponse>(url, config);
            return {status: true, data: response.data.content, error: {}};
        } catch (error) {
            return {status: false, data: {}, error: error};
        }
    }

    // Handle global app errors
    // We can handle generic app errors depending on the status code
    private static handleError(errors: any) {
        const {response, message} = errors;
        if (response) {
            const {status,data} = response;
            switch (status) {
                case StatusCode.BadRequest: {
                    const {content} = data;
                    if (content){
                        return Promise.reject(content);
                    }
                    break;
                }
                case StatusCode.InternalServerError: {
                    const {content} = data;
                    if (content){
                        return Promise.reject(content);
                    }
                    break;
                }
                case StatusCode.Forbidden: {
                    const {content} = data;
                    if (content){
                        return Promise.reject(content);
                    }
                    break;
                }
                case StatusCode.Unauthorized: {
                    const {content} = data;
                    if (content){
                        return Promise.reject(content);
                    }
                    break;
                }
                case StatusCode.TooManyRequests: {
                    const {content} = data;
                    if (content){
                        return Promise.reject(content);
                    }
                    break;
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
