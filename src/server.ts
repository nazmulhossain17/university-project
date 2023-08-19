import app from './app';
import config from './config';
import mongoose from 'mongoose';
import { errorlogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

const connectDB = async () => {
  if (config.dbURL) {
    try {
      await mongoose.connect(config.dbURL);
      logger.info('Database Connected');
      server = app.listen(config.Port, () => {
        logger.info(`Server running on port ${config.Port}`);
      });
    } catch (error) {
      logger.error(error);
    }
  } else {
    logger.info('Database URL is undefined.');
  }
  process.on('unhandledRejection', error => {
    console.log('unhandle rejection detected');
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

connectDB();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
