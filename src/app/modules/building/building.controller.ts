import { Building } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BuildingFilterableFields } from './building.constant';
import { BuildingService } from './building.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.query);
  const filters = pick(req.query, BuildingFilterableFields);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortOrder']);
  const result = await BuildingService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = async (req: Request, res: Response) => {
  const result = await BuildingService.getDataById(req.params.id);
  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building single data fetched successfully',
    data: result,
  });
};

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await BuildingService.updateIntoDB(id, payload);
  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BuildingService.deleteFromDB(id);
  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building deleted successfully',
    data: result,
  });
});

export const BuildingController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
};
