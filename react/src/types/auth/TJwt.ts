import {IAuth} from "./IAuth";

type TJwt = {
    accessToken:string,
    refreshToken:string,
    user:IAuth,
}
export default TJwt
