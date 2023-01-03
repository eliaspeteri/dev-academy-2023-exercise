import { Station } from 'bike-app-common';
// TODO import StationModel from '../models/station';

const getAll = async (): Promise<Station[] | null> => {
  return [];
  // TODO StationModel.find({});
};
const StationService = { getAll };

export default StationService;
