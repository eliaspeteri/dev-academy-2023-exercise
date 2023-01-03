import { Station } from 'bike-app-common';
import StationModel from '../models/station';

const getAll = async (): Promise<Station[] | null> => {
  return StationModel.find({});
};

const saveMany = async (stations: Station[]) => {
  await StationModel.insertMany(stations);
};

const saveOne = async (station: Station) => {
  const existingStation = await StationModel.findOne({
    stationId: station.stationId
  });

  if (!existingStation) {
    const newStation = new StationModel(station);
    await newStation.save();
    return newStation;
  }
  return 'Station already exists.';
};

const StationService = { getAll, saveMany, saveOne };

export default StationService;
