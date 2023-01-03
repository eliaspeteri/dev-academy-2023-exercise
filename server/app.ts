import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';
// TODO import { Config, logger } from './utils'
// TODO import journeyController from './controllers/journey'
// TODO import stationController from './controllers/station'

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO add controllers here

// TODO create MongoDB connection code here and export it

export default app;
