import {IPermission} from "./IPermission";

export interface IMenu {
    id: number;
    title: string;
    url: string;
    icon: string;
    target: string;
    parentId: number;
    permission?: IPermission;
    children: IMenu[];
}

export type IMenuForm = Omit<IMenu, "children">;
