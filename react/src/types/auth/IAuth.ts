export type IAuthorities = {
    authority: string
}
export interface IAuth {
    id:number,
    username:string,
    fullName:string,
    enabled:boolean,
    authorities:IAuthorities[],
    credentialsNonExpired:boolean,
    accountNonLocked:boolean,
    accountNonExpired:boolean
}
