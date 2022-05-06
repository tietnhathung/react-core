import React from "react";


type RoutesType = {
    path: string,
    element: React.FC
}

//user
const UserIndex = React.lazy(() => import('./pages/users/Index'))
const UserCreate = React.lazy(() => import('./pages/users/Create'))
const UserEdit = React.lazy(() => import('./pages/users/Edit'))


const Page403 = React.lazy(() => import('./pages/403/Index'))
const Page404 = React.lazy(() => import('./pages/404/Index'))


const routes: RoutesType[] = [
    {path: '/user', element: UserIndex},
    {path: '/user/create', element: UserCreate},
    {path: '/user/edit/:id', element: UserEdit},
    {path: '/403', element: Page403},
    {path: '*', element: Page404}
];

export default routes
