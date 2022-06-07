import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import TFormLogin from "../../types/auth/TFormLogin";
import * as authService from '../../services/authService';
import {TApiResult} from "../../types/TApiResult";
import TJwt from "../../types/auth/TJwt";
import {RootState} from "../index";
import tokenService from "../../services/tokenService";
import {IAuth} from "../../types/auth/IAuth";

export interface AuthState {
    authUser?: IAuth,
    isLogin: boolean
}

const initialState: AuthState = authService.getInitialStateAuth();

export const loginAsync = createAsyncThunk('auth/login', async (formLogin: TFormLogin): Promise<TApiResult<TJwt>> => {
    return await authService.login(formLogin);
});

export const googleLoginAsync = createAsyncThunk('auth/googleLogin', async (token: string): Promise<TApiResult<TJwt>> => {
    return await authService.googleLogin(token);
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLogin = false
            state.authUser = undefined
            tokenService.clearToken()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            let {status, data} = action.payload;
            if (status && data) {
                tokenService.setToken(data)
                state.authUser = data.user;
                state.isLogin = true;
            }
        });
        builder.addCase(googleLoginAsync.fulfilled, (state, action) => {
            let {status, data} = action.payload;
            if (status && data) {
                tokenService.setToken(data)
                state.authUser = data.user;
                state.isLogin = true;
            }
        });
    },
})

//selector
export const authIsLogin = (state: RootState) => state.auth.isLogin;
export const authUser = (state: RootState) => state.auth.authUser;
export const getAuthorities = (state: RootState) => state.auth.authUser?.authorities?.map( (item) => item.authority ) ?? [];

export const {logout} = authSlice.actions

export default authSlice.reducer
