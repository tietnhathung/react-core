import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {Request, Response} from "express-serve-static-core";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.get("/",(req:Request, res:Response) => {
    console.log("Sss",req.ip)
    res.send("ss");
})

export default app
