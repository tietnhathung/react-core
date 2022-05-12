import React from 'react';
import {Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import {authIsLogin} from "../store/auth/authSlice";

const AuthRoute = ( { children,auth }: { children: JSX.Element,auth:boolean }) => {
    const isLogin = useAppSelector(authIsLogin)
    let location = useLocation();
    if (auth && !isLogin) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (!auth && isLogin) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
}

export default AuthRoute;
