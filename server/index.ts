import { createServer, Server } from 'http';
import app, { ConnectToDB } from './app';
import { Config, logger } from './utils';

const server: Server = createServer(app);

try {
  server.listen(Config.PORT, () => {
    logger.info(`Connected successfully, url: ${Config.URL}:${Config.PORT}`);
  });
  ConnectToDB();
} catch (error) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logger.error(`Error occurred ${(error as any).message}`);
}
