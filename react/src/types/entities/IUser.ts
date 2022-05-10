export type IAuthorities = {
    authority: string
}

export interface IUser {
    id: number;
    fullName: string;
    username: string;
    status: boolean;
    password?: string;
    createdBy?: number;
    createdAt?: string;
    authorities: IAuthorities[]
}
