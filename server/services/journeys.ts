import { Journey } from 'bike-app-common';
import JourneyModel from '../models/journey';
import JourneyBucket from '../models/journeyBucket';
import { logger } from '../utils';
import StationService from './stations';

const getAll = async (): Promise<Journey[] | null> => {
  return JourneyModel.find({});
};

const saveMany = async (fileDataParsed: Journey[] | undefined) => {
  fileDataParsed &&
    fileDataParsed.forEach((row: Journey) => {
      const startDate = row.departureTime;
      const endDate = row.returnTime;

      // Find a matching bucket document
      JourneyBucket.findOneAndUpdate(
        {
          startDate: {
            $gte: startDate.slice(0, 10)
          },
          endDate: { $lt: endDate.slice(0, 10) },
          count: { $lt: 1000 }
        },
        {
          startDate: startDate,
          endDate: endDate,
          $push: { journeys: row },
          $inc: { count: 1 }
        },
        { upsert: true },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (error, _result) => {
          if (error) {
            logger.error(error);
          }
        }
      );
      StationService.saveMany([
        {
          stationId: row.departureStationId,
          stationName: row.departureStationName
        },
        { stationId: row.returnStationId, stationName: row.returnStationName }
      ]);
    });
};

const JourneyService = { getAll, saveMany };

export default JourneyService;
