import dotenv from 'dotenv'
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

import api from "./routes/api.js";
import "./dbs/init.mongodb.js";
import passport from 'passport';
import passportConfig from './configs/passport.js';

dotenv.config()
passportConfig(passport);

const app = express();

//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//init routes
app.use("/api/v1", api);

//Error handling

export default app;
