import React, {useEffect} from 'react';
import {useAppSelector} from "../hooks";
import {authIsLogin, getAuthorities} from "../store/auth/authSlice";
import {Navigate, useLocation} from "react-router-dom";

type PageRouteProp = {
    title?: string,
    children: JSX.Element,
    authentication?: boolean,
    authorization?: string,
}

const PageRoute = ({children, authentication, authorization, title}: PageRouteProp) => {
    const location = useLocation();
    const isLogin = useAppSelector(authIsLogin)
    const authorities = useAppSelector(getAuthorities)
    useEffect(function () {
        if (title) {
            document.title = title
        }
    }, [title])

    if (authentication && !isLogin) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    if (authorization && !authorities.includes(authorization)) {
        return <Navigate to="/403" state={{from: location}} replace/>;
    }
    return children;
};

export default PageRoute;
