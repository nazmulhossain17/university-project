import { NextFunction, Request, Response, RequestHandler } from 'express'; // Import 'Response' from express
import httpStatusCode from 'http-status-codes';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);

    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'User is created successfully',
      data: result,
    });
    next();
  },
);

export const UserController = {
  createUsers,
};
