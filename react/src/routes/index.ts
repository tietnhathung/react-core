import {TRoutes} from "../types/TRoutes";
import React from "react";
import categoryRoutes from "./categories";
import coreRoutes from "./core";

const Login = React.lazy(() => import('../pages/core/login/Index'))
const Callback = React.lazy(() => import('../pages/core/login/Callback'))
const DefaultLayout = React.lazy(() => import('../layouts/DefaultLayout'))

const index: TRoutes[] = [
    {path: 'login', element: Login, title: 'Login', authentication: false},
    {path: 'callback', element: Callback, title: 'Login with google', authentication: false},
    {
        path: '/',
        element: DefaultLayout,
        title: '',
        authentication: true,
        children: [
            ...coreRoutes,
            ...categoryRoutes
        ]
    },
];

export default index
