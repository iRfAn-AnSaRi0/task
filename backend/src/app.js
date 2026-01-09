import express from 'express';
import cors from 'cors';
import cookieparser from "cookie-parser"

import './utils/cronJob.js'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}));

app.use(express.json({ limit: "24kb" }));
app.use(express.urlencoded({ limit: "24kb", extended: true }));
app.use(cookieparser())

import { userroutes } from './routes/userRoute.js';

app.use("/api" , userroutes)

import { investmentroutes } from './routes/investmentRoute.js';
app.use("/api", investmentroutes)


import { getDashboardroutes } from './routes/getDashboardRoute.js';
app.use("/api", getDashboardroutes)

import { getReferralTreeroutes } from './routes/getReferralRoute.js';
app.use("/api", getReferralTreeroutes)



export { app };