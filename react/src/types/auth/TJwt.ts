import {IUser} from "../entities/IUser";

type TJwt = {
    accessToken:string,
    refreshToken:string,
    user:IUser,
}
export default TJwt
