import React, {useEffect} from 'react';
import {useAppSelector} from "../hooks/hooks";
import { getAuthorities} from "../store/auth/authSlice";
import {Navigate, useLocation} from "react-router-dom";

type PageRouteProp = {
    title?: string,
    children: JSX.Element,
    authority: string
}

const PageRoute = ({children, authority, title}: PageRouteProp) => {
    let location = useLocation();
    useEffect(function () {
        if (title) {
            document.title = title
        }
    }, [title])
    const authorities = useAppSelector(getAuthorities)
    if (authorities.includes(authority)) {
        return children;
    }
    return <Navigate to="/403" state={{from: location}} replace/>;
};

export default PageRoute;
