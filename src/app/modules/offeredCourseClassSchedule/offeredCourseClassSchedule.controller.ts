import { OfferedCourseClassSchedule } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseClassScheduleService } from './offeredCourseClassSchedule.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseClassScheduleService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Class Schedule created successfully',
    data: result,
  });
});

const getAllFromDB = async (req: Request, res: Response) => {
  const result = await OfferedCourseClassScheduleService.getAllFromDB();
  sendResponse<OfferedCourseClassSchedule[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course data fetched successfully',
    data: result,
  });
};

export const OfferedCourseClassScheduleController = {
  insertIntoDB,
  getAllFromDB,
};
