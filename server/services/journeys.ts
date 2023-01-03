import { Journey } from 'bike-app-common';
import JourneyModel from '../models/journey';

const getAll = async (): Promise<Journey[] | null> => {
  return JourneyModel.find({});
};
const JourneyService = { getAll };

export default JourneyService;
