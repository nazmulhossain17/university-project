import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatusCode from 'http-status-codes';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result =
      await AcademicSemesterService.createSemester(academicSemesterData);

    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Academic semester is created successfully',
      data: result,
    });
    next();
  },
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // };
    const paginationOptions = pick(req.query, paginationFields);
    console.log(paginationOptions);
    const result =
      await AcademicSemesterService.getAllSemesters(paginationOptions);

    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Semester retrived successfully',
      data: result,
    });
    next();
  },
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
};
