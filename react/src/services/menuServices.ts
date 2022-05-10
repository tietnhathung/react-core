import {TApiResult} from "../types/TApiResult";
import http from "../instants/axiosClient";
import IPagination from "../types/IPagination";
import {IMenu, IMenuForm} from "../types/entities/IMenu";
import menuConstants from "../constants/menuConstants";

export const getMenus = async (page?: number, perPage?: number): Promise<TApiResult<IPagination<IMenu>>> => {
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
    return await http.get<IPagination<IMenu>>(menuConstants.api.get, {params: params});
}

export const createMenu = async (data: IMenuForm): Promise<TApiResult> => {
    return await http.post<IMenu>(menuConstants.api.post, data);
}

export const getMenusOfUser = async (): Promise<TApiResult<IMenu[]>> => {
    return await http.get<IMenu[]>(menuConstants.api.getByUserId);
}
