import { OfferedCourseClassSchedule } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { offeredCourseClassScheduleUtils } from './offeredCourseClassSchedule.utils';

const insertIntoDB = async (
  data: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  await offeredCourseClassScheduleUtils.checkRoomAvailable(data);
  const result = await prisma.offeredCourseClassSchedule.create({
    data,
    include: {
      semesterRegistration: true,
      offeredCourseSection: true,
      room: true,
      faculty: true,
    },
  });
  return result;
};

const getAllFromDB = async () => {
  const result = await prisma.offeredCourseClassSchedule.findMany();
  return result;
};

export const OfferedCourseClassScheduleService = {
  insertIntoDB,
  getAllFromDB,
};
