import { OfferedCourseSection } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseSectionService } from './offeredCourseSection.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course section created',
    data: result,
  });
});

const getAllFromDB = async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionService.getAllFromDB();
  sendResponse<OfferedCourseSection[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course fetched successfully',
    data: result,
  });
};

const getDataById = async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionService.getDataById(req.params.id);
  sendResponse<OfferedCourseSection>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course data fetched successfully',
    data: result,
  });
};

export const OfferedCourseSectionController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
};
