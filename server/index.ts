import { createServer, Server } from 'http';
import app from './app';
import { Config, logger } from './utils';

const server: Server = createServer(app);

try {
  server.listen(Config.PORT, () => {
    logger.info(`Connected successfully, url: ${Config.URL}:${Config.PORT}`);
  });
} catch (error) {
  logger.error(`Error occurred ${(error as any).message}`);
}
