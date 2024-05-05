import { Course } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CourseService } from './course.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await CourseService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllFromDB = async (req: Request, res: Response) => {
  const result = await CourseService.getAllFromDB();
  sendResponse<Course[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course data fetched successfully',
    data: result,
  });
};

const getDataById = async (req: Request, res: Response) => {
  const result = await CourseService.getDataById(req.params.id);
  sendResponse<Course>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course single data fetched successfully',
    data: result,
  });
};

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await CourseService.updateIntoDB(id, payload);
  sendResponse<Course>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.deleteFromDB(id);
  sendResponse<Course>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

const assignFaculties = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(req.body);
  const result = await CourseService.assignFaculties(id, req.body.faculties);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course assign successfully',
    data: result,
  });
});

const removeFaculties = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(req.body);
  const result = await CourseService.removeFaculties(id, req.body.faculties);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

export const CourseController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
  assignFaculties,
  removeFaculties,
};
