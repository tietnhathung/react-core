export interface IMenu {
    id: number;
    title: string;
    url: string;
    icon: string;
    target: string;
    parentId:number;
    children:IMenu[];
}
export type IMenuForm = Omit<IMenu, "children">;
