import { OfferedCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { hasTimeConflict } from '../../../shared/utils';

const checkRoomAvailable = async (data: OfferedCourseClassSchedule) => {
  const alreadyBookedOnDay = await prisma.offeredCourseClassSchedule.findMany({
    where: {
      dayOfWeek: data.dayOfWeek,
      room: {
        id: data.roomId,
      },
    },
  });

  const existingSlots = alreadyBookedOnDay.map(schedule => ({
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    dayOfWeek: schedule.dayOfWeek,
  }));

  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
  };

  if (hasTimeConflict(existingSlots, newSlot)) {
    throw new ApiError(httpStatus.CONFLICT, 'Room is booked');
  }
};

const checkFacultyAvailable = async (data: OfferedCourseClassSchedule) => {
  const alreadyFacultyAssigned =
    await prisma.offeredCourseClassSchedule.findMany({
      where: {
        dayOfWeek: data.dayOfWeek,
        faculty: {
          id: data.facultyId,
        },
      },
    });
  console.log(alreadyFacultyAssigned);
  const existingSlots = alreadyFacultyAssigned.map(schedule => ({
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    dayOfWeek: schedule.dayOfWeek,
  }));

  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
  };

  if (hasTimeConflict(existingSlots, newSlot)) {
    throw new ApiError(httpStatus.CONFLICT, 'Faculty is booked');
  }
};

export const offeredCourseClassScheduleUtils = {
  checkRoomAvailable,
  checkFacultyAvailable,
};
