import { Station } from 'bike-app-common';
import StationModel from '../models/station';

const getAll = async (): Promise<Station[] | null> => {
  return StationModel.find({});
};
const StationService = { getAll };

export default StationService;
