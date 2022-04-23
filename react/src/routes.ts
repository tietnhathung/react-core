import React from "react";


type RoutesType = {
    path: string,
    element:React.FC
}


const UserIndex = React.lazy(() => import('./pages/users/index'))
const lineIndex = React.lazy(() => import('./pages/lines/index'))


const routes:RoutesType[] = [
    { path: '/user', element: UserIndex },
    { path: '/line', element: lineIndex },
];

export default routes
