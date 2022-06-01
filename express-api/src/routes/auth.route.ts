import authController from "../controller/auth.controller";
import express from "express";
import {localAuth} from "../middleware/auth.middleware";
const route = express.Router()

route.post('/login', localAuth, authController.login)

export default route;
