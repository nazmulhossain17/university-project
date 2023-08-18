import { Request, Response, NextFunction } from 'express';
import config from '../../config';

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  type IGenericErrorMessage = {};
  let statusCode = 500;
  let message = 'Something went wrong !!';
  let errorMessages = [];
  res.status().json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
