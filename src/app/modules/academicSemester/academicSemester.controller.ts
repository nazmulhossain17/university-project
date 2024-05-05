import { AcademicSemester } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterFilterAbleFields } from './academicSemester.contants';
import { AcademicSemesterService } from './academicSemester.service';

const insertIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AcademicSemesterService.insertIntoDB(req.body);
    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.query);
  const filters = pick(req.query, AcademicSemesterFilterAbleFields);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortOrder']);
  console.log('filters:', filters);
  console.log('options: ', options);
  const result = await AcademicSemesterService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters data fetched',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters data fetched',
    data: result,
  });
});

export const AcademicSemesterController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
};
