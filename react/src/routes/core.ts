import React from "react";
import {TRoutes} from "../types/TRoutes";

const Profile = React.lazy(() => import('../pages/core/auth/Profile'))
const Page403 = React.lazy(() => import('../pages/core/403/Index'))
const Page404 = React.lazy(() => import('../pages/core/404/Index'))
const Home = React.lazy(() => import('../pages/core/home/Index'))

const coreRoutes: TRoutes[] = [
    {path: 'profile', element: Profile, title: 'Profile',authentication:true},
    {path: '403', element: Page403, title: 'Access denied',authentication:true},
    {path: '/home', element: Home, title: 'Home',authentication:true},
    {path: '/', element: Home, title: 'Home',authentication:true},
    {path: '*', element: Page404, title: 'Page not found',authentication:true}
];

export default coreRoutes
