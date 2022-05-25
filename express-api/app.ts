import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import AppRoutes from "./src/routes/index.route";

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

AppRoutes(app);

export default app
