import TJwt from "../types/auth/TJwt";

class LocalStorageService {
    setToken = function (jwt: TJwt):void {
        localStorage.setItem('accessToken', jwt.accessToken);
        localStorage.setItem('refreshToken', jwt.refreshToken);
    }
    clearToken = function ():void {
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

export default new LocalStorageService();
