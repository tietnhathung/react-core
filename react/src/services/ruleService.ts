import {TApiResult} from "../types/TApiResult";
import IPagination from "../types/IPagination";
import http from "../instants/axiosClient";
import {IRule} from "../types/entities/IRule";
import ruleConstants from "../constants/ruleConstants";

export const getRules = async (page?: number, perPage?: number): Promise<TApiResult<IPagination<IRule>>> => {
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
    return await http.get<IPagination<IRule>>(ruleConstants.api.get, {params: params});
}

export const getRule = async (id: number): Promise<TApiResult<IRule>> => {
    return await http.get<IRule>(ruleConstants.api.getById.replace("{id}",id.toString()))
}

export const createRule = async (data: IRule): Promise<TApiResult<IRule>> => {
    return await http.post<IRule>(ruleConstants.api.post, data);
}

export const updateRule = async (id:number,data: IRule): Promise<TApiResult<IRule>> => {
    return await http.put<IRule>(ruleConstants.api.put.replace("{id}",id.toString()), data);
}

export const deleteRule = async (id:number): Promise<TApiResult<void>> => {
    return await http.delete<void>(ruleConstants.api.delete.replace("{id}",id.toString()));
}
