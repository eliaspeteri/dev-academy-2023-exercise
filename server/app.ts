import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
// TODO import mongoose from 'mongoose';
// TODO import { Config, logger } from './utils'
// TODO import journeyController from './controllers/journey'
import stationController from './controllers/station';

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO app.use('/journeys, journeyController)
app.use('/stations', stationController);

// TODO create MongoDB connection code here and export it

export default app;
