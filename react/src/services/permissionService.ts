import {TApiResult} from "../types/TApiResult";
import http from "../instants/axiosClient";
import {IPermission} from "../types/entities/IPermission";
import IPagination from "../types/IPagination";
import permissionConstants from "../constants/permissionConstants";

export const getPermissions = async (page?: number, perPage?: number): Promise<TApiResult<IPagination<IPermission>>> => {
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
    return await http.get<IPagination<IPermission>>(permissionConstants.api.get, {params: params});
}
