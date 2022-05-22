import homeController from "../controller/home.controller";
import express from "express";
const route = express.Router()

route.use('/', homeController.index)

export default route;