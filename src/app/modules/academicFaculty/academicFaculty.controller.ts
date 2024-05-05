import { AcademicFaculty } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyService } from './academicFaculty.service';

const insertIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AcademicFacultyService.insertIntoDB(req.body);
    sendResponse<AcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFromDB = async (req: Request, res: Response) => {
  const result = await AcademicFacultyService.getAllFromDB();
  sendResponse<AcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculties data fetched successfully',
    data: result,
  });
};

const getDataById = async (req: Request, res: Response) => {
  const result = await AcademicFacultyService.getDataById(req.params.id);
  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty data fetched successfully',
    data: result,
  });
};

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AcademicFacultyService.updateIntoDB(id, payload);
  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.deleteFromDB(id);
  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty deleted successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
};
