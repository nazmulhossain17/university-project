import { SemesterRegistration } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration created successfully',
    data: result,
  });
});

const getAllFromDB = async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.getAllFromDB();
  sendResponse<SemesterRegistration[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester data fetched successfully',
    data: result,
  });
};

const getDataById = async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.getDataById(req.params.id);
  sendResponse<SemesterRegistration>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester single data fetched successfully',
    data: result,
  });
};

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await SemesterRegistrationService.updateIntoDB(id, payload);
  sendResponse<SemesterRegistration>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.deleteFromDB(id);
  sendResponse<SemesterRegistration>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

const startMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  console.log(user);
  const result = await SemesterRegistrationService.startMyRegistration(
    user.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Student Semester registration started successfully',
  });
});

export const SemesterRegistrationController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
  startMyRegistration,
};
