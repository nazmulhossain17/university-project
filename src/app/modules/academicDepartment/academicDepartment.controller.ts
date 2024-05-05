import { AcademicDepartment } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AcademicDepartmentService.createAcademicDepartment(
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFromDB = async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.getAllFromDB();
  sendResponse<AcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department data fetched successfully',
    data: result,
  });
};

const getDataById = async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.getDataById(req.params.id);
  sendResponse<AcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department single data fetched successfully',
    data: result,
  });
};

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AcademicDepartmentService.updateIntoDB(id, payload);
  sendResponse<AcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.deleteFromDB(id);
  sendResponse<AcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department deleted successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
};
