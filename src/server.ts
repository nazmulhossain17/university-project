import app from './app';
import config from './config';
import mongoose from 'mongoose';
import { logger } from './shared/logger';

const connectDB = async () => {
  if (config.dbURL) {
    try {
      await mongoose.connect(config.dbURL);
      logger.info('Database Connected');
      app.listen(config.Port, () => {
        logger.info(`Server running on port ${config.Port}`);
      });
    } catch (error) {
      logger.error(error);
    }
  } else {
    logger.info('Database URL is undefined.');
  }
};

connectDB();
