export interface IMenu {
    id: number;
    title: string;
    url: string;
    target: string;
    parent:IMenu;
    children:IMenu[];
}
