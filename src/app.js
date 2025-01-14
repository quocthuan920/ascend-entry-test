import dotenv from 'dotenv';
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { rateLimit } from 'express-rate-limit'

import api from "./routes/api.js";
import "./dbs/init.mongodb.js";
import passport from 'passport';
import passportConfig from './configs/passport.js';

dotenv.config()
passportConfig(passport);

const app = express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  });
  

//init middleware
app.use(morgan("dev"));
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "http://localhost:3000"],
        connectSrc: ["'self'", "http://localhost:3000"],
        imgSrc: ["'self'", "data:"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  }
));
app.use(compression());

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(limiter);

//init routes
app.use(`/api/${process.env.API_VERSION}`, api);

//Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

export default app;
