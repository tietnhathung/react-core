import {TApiResult} from "../types/TApiResult";
import http from "./axiosClient";
import userConstants from "../constants/userConstants";

export const getUsers = async ( params?: any): Promise<TApiResult> => {
    return await http.get(userConstants.api.get,{params: params});
}
export const createUsers = async (data: any): Promise<TApiResult> => {
    try {
        let apiData = await http.post(userConstants.api.post,data);
        return {status:true,data: apiData, error: {}};
    } catch (error) {
        return {status:false,data: {}, error: error};
    }
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
