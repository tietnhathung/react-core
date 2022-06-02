import {IAuth} from "./IAuth";

type TJwtEncode = {
    sub:string,
    iat:number,
    exp:number,
    userDetails:IAuth
}
export default TJwtEncode
