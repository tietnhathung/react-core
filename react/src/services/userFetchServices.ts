import {TApiResult} from "../types/TApiResult";
import http from "./axiosClient";
import userConstants from "../constants/userConstants";
import {IUser} from "../types/entities/IUser";

export const getUsers = async (page?:number,perPage?:number): Promise<TApiResult> => {
    let params = {
        page: 0,
        perPage:0
    }
    if (page != null){
        params.page = page
    }
    if (perPage != null){
        params.perPage = perPage
    }
    return await http.get(userConstants.api.get,{params: params});
}

export const createUsers = async (data: IUser): Promise<TApiResult> => {
    return await http.post(userConstants.api.post,data);
}

export const updateUsers = async (id:number,data: any): Promise<TApiResult> => {
    try {
        let apiData = await http.put(userConstants.api.put.replace("{id}",id.toString()),data);
        return {status:true,data: apiData, error: {}};
    } catch (error) {
        return {status:false,data: {}, error: error};
    }
}
export const deleteUsers = async (id:number,data: any): Promise<TApiResult> => {
    try {
        let apiData = await http.delete(userConstants.api.put.replace("{id}",id.toString()));
        return {status:true,data: apiData, error: {}};
    } catch (error) {
        return {status:false,data: {}, error: error};
    }
}
