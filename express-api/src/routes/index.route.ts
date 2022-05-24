import * as core from "express-serve-static-core";

import homeRoute from "./home.route";
import userRouter from "./user.route";
import authRoute from "./auth.route";
import {jwtAuth} from "../authentication/auth";

const AppRoutes = (app:core.Express) => {
    app.use("/auth",authRoute)
    app.use("/home",jwtAuth,homeRoute)
    app.use("/user",jwtAuth,userRouter)
    app.use("/",homeRoute)
}
export default AppRoutes