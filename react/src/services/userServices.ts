import {TApiResult} from "../types/TApiResult";
import http from "../instants/axiosClient";
import userConstants from "../constants/userConstants";
import {IUser} from "../types/entities/IUser";
import IPagination from "../types/IPagination";


export const getUserById = async (id: string): Promise<TApiResult<IUser>> => {
    return await http.get<IUser>(userConstants.api.getById.replace("{id}", id));
}
export const getUsers = async (page?: number, perPage?: number): Promise<TApiResult<IPagination<IUser>>> => {
    let params = {
        page: 0,
        perPage: 0
    }
    if (page != null) {
        params.page = page
    }
    if (perPage != null) {
        params.perPage = perPage
    }
    return await http.get<IPagination<IUser>>(userConstants.api.get, {params: params});
}

export const createUsers = async (data: IUser): Promise<TApiResult> => {
    return await http.post<IUser>(userConstants.api.post, data);
}

export const updateUsers = async (id: string, data: IUser): Promise<TApiResult<IUser>> => {
    return await http.put<IUser>(userConstants.api.put.replace("{id}", id), data);
}
export const deleteUser = async (id: string): Promise<TApiResult> => {
    return await http.delete(userConstants.api.put.replace("{id}", id));
}
