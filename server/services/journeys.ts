import { Journey } from 'bike-app-common';
// TODO import JourneyModel from '../models/journey';

const getAll = async (): Promise<Journey[] | null> => {
  return [];
  // TODO JourneyModel.find({});
};
const JourneyService = { getAll };

export default JourneyService;
