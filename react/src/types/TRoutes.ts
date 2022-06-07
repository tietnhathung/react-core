import React from "react";

export type TRoutes = {
    path: string,
    element: React.FC,
    title: string,
    authentication: boolean,
    authorization?: string,
    children?:TRoutes[]
}
