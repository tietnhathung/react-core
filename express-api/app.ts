import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import AppRoutes from "./src/routes/index.route";
// import passport from "./src/authentication/auth";

const app = express();
// app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

AppRoutes(app);

export default app
