import userController from "../controller/user.controller";
import express from "express";

const route = express.Router()

route.get('/', userController.index)

export default route;