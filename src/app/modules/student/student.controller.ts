import { Student } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StudentService } from './student.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentService.createStudent(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully', // Updated success message
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFromDB = async (req: Request, res: Response) => {
  const result = await StudentService.getAllFromDB();
  sendResponse<Student[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data fetched successfully',
    data: result,
  });
};

const getDataById = async (req: Request, res: Response) => {
  const result = await StudentService.getDataById(req.params.id);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student single data fetched successfully',
    data: result,
  });
};

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await StudentService.updateIntoDB(id, payload);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.deleteFromDB(id);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const StudentController = {
  createStudent,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
};
