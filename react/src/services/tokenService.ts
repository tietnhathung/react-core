import TJwt from "../types/auth/TJwt";
import {IUser} from "../types/entities/IUser";
import jwt_decode from "jwt-decode";
import {AuthState} from "../store/auth/authSlice";

class TokenService {
    setToken = function (jwt: TJwt): void {
        localStorage.setItem('accessToken', jwt.accessToken);
        localStorage.setItem('refreshToken', jwt.refreshToken);
    }
    clearToken = function (): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
    getAccessToken = (): string | null => {
        return localStorage.getItem("accessToken")
    }
    getRefreshToken = (): string | null => {
        return localStorage.getItem("refreshToken")
    }

}

export default new TokenService();
