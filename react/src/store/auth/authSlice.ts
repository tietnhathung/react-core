import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import TFormLogin from "../../types/auth/TFormLogin";
import * as authService from '../../services/authService';
import {IUser} from "../../types/entities/IUser";
import {TApiResult} from "../../types/TApiResult";
import TJwt from "../../types/auth/TJwt";
import {RootState} from "../index";
import jwt_decode from "jwt-decode";

export interface AuthState {
    authUser?: IUser,
    isLogin: boolean
}

const initialState: AuthState = {
    authUser: undefined,
    isLogin: false
}
const token = localStorage.getItem("accessToken");

if (token) {
    let decoded: { userDetails: IUser, sub: string, iat: number, exp: number } = jwt_decode(token);
    initialState.isLogin = true;
    initialState.authUser = decoded.userDetails
}

export const loginAsync = createAsyncThunk('auth/login', async (formLogin: TFormLogin): Promise<TApiResult<TJwt>> => {
    return await authService.login(formLogin);
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLogin = false
            state.authUser = undefined
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            let {status, data} = action.payload;
            if (status && data) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                state.authUser = data.user;
                state.isLogin = true;
            }
        });
    },
})

export const authIsLogin = (state: RootState) => state.auth.isLogin;

export const {logout} = authSlice.actions

export default authSlice.reducer
