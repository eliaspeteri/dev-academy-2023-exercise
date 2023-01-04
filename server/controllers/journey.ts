/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response } from 'express';
// TODO import journeyValidationMiddleware from '../middleware/validation'
import JourneyService from '../services/journeys';
import { logger } from '../utils';

const controller: Router = Router();

controller.get('/', async (req: Request, res: Response) => {
  try {
    const { query } = req;
    if (query.startDate || query.endDate) {
      const data = await JourneyService.getFilteredByDate({
        startDate: new Date(query.startDate as string),
        endDate: new Date(query.endDate as string)
      });
      return res.status(200).json({
        success: true,
        data: data
      });
    }
    return res.status(200).json({
      success: true,
      data: await JourneyService.getAll()
    });
  } catch (error) {
    logger.error((error as any).message);
    return res
      .status(400)
      .json({ success: false, message: (error as any).message });
  }
});

export default controller;
