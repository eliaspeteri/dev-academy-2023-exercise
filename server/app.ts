import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import journeyController from './controllers/journey';
import stationController from './controllers/station';
import uploadController from './controllers/upload';
import { Config, logger } from './utils';
import { requestLogger } from './utils/requestLoggerMiddleware';

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/journeys', journeyController);
app.use('/stations', stationController);
app.use('/upload', uploadController);

export const ConnectToDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(Config.MONGODB_URI);
    logger.info('Connected successfully to MongoDB.');
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logger.error(`Error: ${(error as any).message}`);
  }
};
export default app;
