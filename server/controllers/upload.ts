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
      return res.status(200).json({
        success: true,
        data: await UploadService.uploadOne(req.file?.buffer.toString())
      });
    } catch (error) {
      logger.error((error as any).message);
      if (error instanceof multer.MulterError) {
        return res.status(400).json({
          success: false,
          message: (error as any).message
        });
      } else {
        return res.status(500).json({
          success: false,
          message: (error as any).message
        });
      }
    }
  }
);

export default controller;
