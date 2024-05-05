import { CourseFaculty, Faculty } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createFaculty = async (data: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({ data }); // Use prisma.faculty instead of prisma.academicFaculty
  return result;
};

const getAllFromDB = async () => {
  const result = await prisma.faculty.findMany();
  return result;
};

const getDataById = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Faculty>
): Promise<Faculty> => {
  const result = await prisma.faculty.update({
    where: {
      id,
    },
    data: payload,
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Faculty> => {
  const result = await prisma.faculty.delete({
    where: {
      id,
    },
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};

const assignCourses = async (
  id: string,
  payload: string[]
): Promise<CourseFaculty[]> => {
  await prisma.courseFaculty.createMany({
    data: payload.map(courseId => ({
      facultyId: id,
      courseId: courseId,
    })),
  });

  const assignCourseData = await prisma.courseFaculty.findMany({
    where: {
      facultyId: id,
    },
    include: {
      course: true,
    },
  });

  return assignCourseData;
};

const removeCourses = async (
  id: string,
  payload: string[]
): Promise<CourseFaculty[] | null> => {
  await prisma.courseFaculty.deleteMany({
    where: {
      facultyId: id,
      courseId: {
        in: payload,
      },
    },
  });

  const assignCourseData = await prisma.courseFaculty.findMany({
    where: {
      facultyId: id,
    },
    include: {
      course: true,
    },
  });

  return assignCourseData;
};

export const FacultyService = {
  createFaculty,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
  assignCourses,
  removeCourses,
};
