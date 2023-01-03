/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, Router } from 'express';
import multer, { Multer } from 'multer';
import UploadService from '../services/upload';
import { logger } from '../utils';
// TODO import uploadValidationMiddleware from '../middleware/validation'

const upload: Multer = multer({
  storage: multer.memoryStorage()
});

const controller: Router = Router();

controller.post(
  '/',
  upload.single('file'),
  async (req: Request, res: Response) => {
    try {
      res.json({
        success: true,
        data: await UploadService.uploadMany(req.file?.buffer.toString())
      });
    } catch (error) {
      if (error instanceof multer.MulterError) {
        res.status(400).json({
          success: false,
          message: (error as any).message
        });
      } else {
        res.status(500).json({
          success: false,
          message: (error as any).message
        });
      }
      logger.error((error as any).message);
    }
  }
);

export default controller;
