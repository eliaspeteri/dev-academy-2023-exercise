/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response } from 'express';
// TODO import stationValidationMiddleware from '../middleware/validation'
// TODO import StationService from '../services/stations'
import { logger } from '../utils';

const controller: Router = Router();

controller.get('/', async (_req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: {} /* await StationService.getAll()  */
    });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as any).message });
    logger.error((error as any).message);
  }
});

export default controller;
