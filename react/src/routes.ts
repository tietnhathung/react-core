import React from "react";


type RoutesType = {
    path: string,
    element:React.FC
}


const UserIndex = React.lazy(() => import('./pages/users/Index'))
const UserCreate = React.lazy(() => import('./pages/users/Create'))
const Page404 = React.lazy(() => import('./pages/404/Index'))


const routes:RoutesType[] = [
    { path: '/user', element: UserIndex },
    { path: '/user/create', element: UserCreate },
    { path: '*', element: Page404 }
];

export default routes
