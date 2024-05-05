import { Course, CourseFaculty } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import {
  ICourseCreateData,
  IPrerequisiteCourseRequest,
} from './course.interface';

const insertIntoDB = async (data: ICourseCreateData): Promise<any> => {
  try {
    const { preRequisiteCourses, ...courseData } = data;
    const newCourse = await prisma.$transaction(async transactionClient => {
      const result = await transactionClient.course.create({
        data: courseData,
      });

      if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Error creating course');
      }

      if (preRequisiteCourses && preRequisiteCourses.length > 0) {
        await asyncForEach(
          preRequisiteCourses,
          async (preRequisiteCourse: IPrerequisiteCourseRequest) => {
            const createPrerequisite =
              await transactionClient.courseToPrerequisite.create({
                data: {
                  courseId: result.id,
                  preRequisiteId: preRequisiteCourse.courseId,
                },
              });
            console.log(createPrerequisite);
          }
        );
      }
      return result;
    });

    if (newCourse) {
      const responseData = await prisma.course.findUnique({
        where: {
          id: newCourse.id,
        },
        include: {
          preRequisite: {
            include: {
              preRequisite: true,
            },
          },
          preRequisiteFor: {
            include: {
              course: true,
            },
          },
        },
      });
      return responseData;
    }
  } catch (error) {
    throw new Error(`Error creating course: ${error}`);
  }
};

const getAllFromDB = async () => {
  const result = await prisma.course.findMany();
  return result;
};

const getDataById = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: ICourseCreateData
): Promise<Course | null> => {
  const { preRequisiteCourses, ...courseData } = payload;
  await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.update({
      where: {
        id,
      },
      data: courseData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'unable to update course');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePrerequisite = preRequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && coursePrerequisite.isDeleted
      );
      console.log(deletePrerequisite);
      const newPrerequisite = preRequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && !coursePrerequisite.isDeleted
      );

      await asyncForEach(
        deletePrerequisite,
        async (deletePreCourse: IPrerequisiteCourseRequest) => {
          await transactionClient.courseToPrerequisite.deleteMany({
            where: {
              AND: [
                {
                  courseId: id,
                },
                {
                  preRequisiteId: deletePreCourse.courseId,
                },
              ],
            },
          });
        }
      );

      await asyncForEach(
        newPrerequisite,
        async (insertPrerequisite: IPrerequisiteCourseRequest) => {
          await transactionClient.courseToPrerequisite.create({
            data: {
              courseId: id,
              preRequisiteId: insertPrerequisite.courseId,
            },
          });
        }
      );
    }
    return result;
  });

  const responseData = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      preRequisite: {
        include: {
          preRequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return responseData;
};

const deleteFromDB = async (id: string): Promise<Course> => {
  const result = await prisma.course.delete({
    where: {
      id,
    },
  });
  return result;
};

const assignFaculties = async (
  id: string,
  payload: string[]
): Promise<CourseFaculty[]> => {
  await prisma.courseFaculty.createMany({
    data: payload.map(facultyId => ({
      courseId: id,
      facultyId: facultyId,
    })),
  });

  const assignFacultiesData = await prisma.courseFaculty.findMany({
    where: {
      courseId: id,
    },
    include: {
      faculty: true,
    },
  });

  return assignFacultiesData;
};

const removeFaculties = async (
  id: string,
  payload: string[]
): Promise<CourseFaculty[] | null> => {
  await prisma.courseFaculty.deleteMany({
    where: {
      courseId: id,
      facultyId: {
        in: payload,
      },
    },
  });

  const assignFacultiesData = await prisma.courseFaculty.findMany({
    where: {
      courseId: id,
    },
    include: {
      faculty: true,
    },
  });

  return assignFacultiesData;
};

export const CourseService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
  assignFaculties,
  removeFaculties,
};
