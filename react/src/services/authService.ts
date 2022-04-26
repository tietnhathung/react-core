import {TApiResult} from "../types/TApiResult";
import http from "../instants/axiosClient";
import authConstants from "../constants/authConstants";
import TFormLogin from "../types/auth/TFormLogin";
import TJwt from "../types/auth/TJwt";

export const login = async (formLogin: TFormLogin): Promise<TApiResult<TJwt>> => {
    return await http.post<TJwt>(authConstants.api.login,formLogin)
}
