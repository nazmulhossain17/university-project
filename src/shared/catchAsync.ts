import { NextFunction, Request, Response } from 'express';

const catchAsync = fn => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
