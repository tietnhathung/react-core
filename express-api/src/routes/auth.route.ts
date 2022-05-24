import authController from "../controller/auth.controller";
import express from "express";
import {localAuth} from "../authentication/auth";

const route = express.Router()

route.post('/login', localAuth, authController.login)

export default route;