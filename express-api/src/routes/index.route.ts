import * as core from "express-serve-static-core";

import homeRoute from "./home.route";
import userRouter from "./user.route";

const AppRoutes = (app:core.Express) => {
    app.use("/home",homeRoute)
    app.use("/user",userRouter)
    app.use("/",homeRoute)
}
export default AppRoutes