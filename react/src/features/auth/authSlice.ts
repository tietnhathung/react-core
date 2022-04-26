import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import TFormLogin from "../../types/auth/TFormLogin";
import * as authService from '../../services/authService';
import {IUser} from "../../types/entities/IUser";
import {TApiResult} from "../../types/TApiResult";
import TJwt from "../../types/auth/TJwt";

export interface AuthState {
    authUser?: IUser,
    isLogin: boolean
}

const initialState: AuthState = {
    authUser: undefined,
    isLogin: false
}

export const loginAsync = createAsyncThunk('auth/login', async (formLogin: TFormLogin):Promise<TApiResult<TJwt>> => {
    return await authService.login(formLogin);
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
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

export const {} = authSlice.actions

export default authSlice.reducer
