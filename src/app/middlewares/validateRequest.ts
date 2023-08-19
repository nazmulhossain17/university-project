import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod'; // Make sure you import the correct type from Zod

const validateRequest =
  (schema: AnyZodObject): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
