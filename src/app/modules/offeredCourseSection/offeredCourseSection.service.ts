import { OfferedCourseSection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: any): Promise<OfferedCourseSection> => {
  const isExistOfferedCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: data.offeredCourseId,
    },
  });

  if (!isExistOfferedCourse) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Offered Course doesn't exist");
  }

  data.semesterRegistrationId = isExistOfferedCourse.semesterRegistrationId;
  const result = await prisma.offeredCourseSection.create({ data });
  return result;
};

const getAllFromDB = async () => {
  const result = await prisma.offeredCourseSection.findMany();
  return result;
};

const getDataById = async (
  id: string
): Promise<OfferedCourseSection | null> => {
  const result = await prisma.offeredCourseSection.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const OfferedCourseSectionService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
};
