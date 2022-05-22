import userController from "../controller/user.controller";
import express from "express";
const route = express.Router()

route.use('/', userController.index)

export default route;