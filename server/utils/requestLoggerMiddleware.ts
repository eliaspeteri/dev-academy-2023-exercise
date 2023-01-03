import { NextFunction, Request, Response } from 'express';

import { info } from './logger';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  info(`Method: ${req.method}`);
  info(`Path: ${req.path}`);
  info(`Body: ${req.body}`);
  info(`Headers: ${req.headers}`);
  info('---');
  next();
};

export { requestLogger };
