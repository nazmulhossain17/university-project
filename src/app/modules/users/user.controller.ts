import { NextFunction, Request, Response } from 'express';
import userService from './user.service';

const createUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body;
    const result = await userService.createUser(user);
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    });
  } catch (err) {
    // res.status(400).json({
    //   error: err,
    // });
    next(err);
  }
};

export default { createUsers };
