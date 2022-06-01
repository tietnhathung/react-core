import express from 'express';
import cookieParser from 'cookie-parser';
import AppRoutes from "./src/routes/index.route";
import fs from "fs";
import path from "path";
import morgan from "morgan";

const httpLoggerStream = fs.createWriteStream(path.join(__dirname, 'logs/httpLog.log'), { flags: 'a' })

const app = express();
app.use(morgan('combined', {stream: httpLoggerStream}))
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

AppRoutes(app);

export default app
