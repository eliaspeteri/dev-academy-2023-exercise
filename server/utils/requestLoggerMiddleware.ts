import { NextFunction, Request, Response } from 'express';

import { info, table } from './logger';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  info(`Method: ${req.method}`);
  info(`Path: ${req.path}`);
  table(`Body: ${req.body}`);
  table(req.headers);
  table(req.query);
  info('---');
  next();
};

export { requestLogger };
