import { Journey } from 'bike-app-common';
import JourneyBucket from '../models/journeyBucket';
import { logger } from '../utils';
import StationService from './stations';

type Filter = {
  startDate?: Date;
  endDate?: Date;
};

const getAll = async (): Promise<Journey[] | null> => {
  return JourneyBucket.find({});
};

const getFilteredByDate = async (filter: Filter) => {
  logger.info({ filter });
  return JourneyBucket.find({
    startDate: { $gte: filter.startDate },
    endDate: { $lt: filter.endDate }
  });
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

const JourneyService = { getAll, getFilteredByDate, saveMany };

export default JourneyService;
