import {TApiResult} from "../types/TApiResult";
import http from "../instants/axiosClient";
import IPagination from "../types/IPagination";
import {IMenu} from "../types/entities/IMenu";
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

