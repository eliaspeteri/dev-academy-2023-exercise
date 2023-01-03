import JourneyBucket from '../models/journeyBucket';

import { logger } from '../utils';

const saveMany = async (fileData: string | undefined) => {
  try {
    const fileDataParsed = fileData
      ?.split('\n')
      .map((row) => row.split(','))
      .splice(1, fileData.length - 1)
      .map((row) => {
        return {
          departureTime: row[0],
          returnTime: row[1],
          departureStationId: row[2],
          departureStationName: row[3],
          returnStationId: row[4],
          returnStationName: row[5],
          distanceCoveredInMeters: parseInt(row[6]),
          durationSeconds: parseInt(row[7])
        };
      })
      .filter((row) => row.departureTime !== '');
    fileDataParsed &&
      fileDataParsed.forEach((row) => {
        const startDate = row.departureTime;
        const endDate = row.returnTime;

        // logger.table({
        //   depId: row.departureStationId,
        //   startDate: startDate.slice(0, 10),
        //   endDate: endDate.slice(0, 10),
        //   retId: row.returnStationId
        // });

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
      });
    return {
      success: true,
      message: 'successful entry'
      /*data: fileDataParsed*/
    };
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { success: false, message: (error as any).message };
  }
};

const UploadService = { saveMany };

export default UploadService;
