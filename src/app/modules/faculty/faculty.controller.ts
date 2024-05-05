import { Faculty } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FacultyService } from './faculty.service';

const createFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await FacultyService.createFaculty(req.body);
    sendResponse<Faculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFromDB = async (req: Request, res: Response) => {
  const result = await FacultyService.getAllFromDB();
  sendResponse<Faculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data fetched successfully',
    data: result,
  });
};

const getDataById = async (req: Request, res: Response) => {
  const result = await FacultyService.getDataById(req.params.id);
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty single data fetched successfully',
    data: result,
  });
};

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await FacultyService.updateIntoDB(id, payload);
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.deleteFromDB(id);
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

const assignCourses = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(req.body);
  const result = await FacultyService.assignCourses(id, req.body.courses);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course assign successfully',
    data: result,
  });
});

const removeCourses = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(req.body);
  const result = await FacultyService.removeCourses(id, req.body.courses);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

export const FacultyController = {
  createFaculty,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
  assignCourses,
  removeCourses,
};
