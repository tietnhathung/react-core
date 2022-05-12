import React from "react";
import coreRoutes from "./core";
import categoryRoutes from "./categories";

export type RoutesType = {
    path: string,
    element: React.FC,
    title: string,
    authority?: string
}

const routes: RoutesType[] = [
    ...categoryRoutes,
    ...coreRoutes
];

export default routes
