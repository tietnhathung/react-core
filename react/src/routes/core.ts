import React from "react";
import {TRoutes} from "../types/TRoutes";

const Profile = React.lazy(() => import('../pages/core/auth/Profile'));
const Page403 = React.lazy(() => import('../pages/core/403/Index'));
const Page404 = React.lazy(() => import('../pages/core/404/Index'));
const Home = React.lazy(() => import('../pages/core/home/Index'));

const coreRoutes: TRoutes[] = [
    {path: 'profile', element: Profile, title: 'Profile'},
    {path: '403', element: Page403, title: 'Access denied'},
    {path: '/home', element: Home, title: 'Home'},
    {path: '/', element: Home, title: 'Home'},
    {path: '*', element: Page404, title: 'Page not found'}
];

export default coreRoutes
