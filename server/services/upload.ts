import JourneyService from './journeys';

const uploadMany = async (fileData: string | undefined) => {
  try {
    const fileDataParsed = fileData
      ?.split('\n')
      .map((row) => row.split(','))
      .splice(1, fileData.length - 1)
      .map((row) => {
        return {
          departureTime: row[0],
          returnTime: row[1],
          departureStationId: parseInt(row[2]),
          departureStationName: row[3],
          returnStationId: parseInt(row[4]),
          returnStationName: row[5],
          distanceCoveredInMeters: parseInt(row[6]),
          durationSeconds: parseInt(row[7])
        };
      })
      .filter((row) => row.departureTime !== '');
    JourneyService.saveMany(fileDataParsed);
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

const UploadService = { uploadMany };

export default UploadService;
