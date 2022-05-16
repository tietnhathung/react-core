import {IPermission} from "./IPermission";

export interface IRule {
    id:number
    name:string
    permissions:IPermission[]
}
