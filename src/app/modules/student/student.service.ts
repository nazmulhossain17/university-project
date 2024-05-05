import { Student } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createStudent = async (data: Student): Promise<Student> => {
  const student = await prisma.student.create({ data });
  return student;
};

const getAllFromDB = async () => {
  const result = await prisma.student.findMany();
  return result;
};

const getDataById = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Student>
): Promise<Student> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data: payload,
    include: {
      academicSemester: true,
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Student> => {
  const result = await prisma.student.delete({
    where: {
      id,
    },
    include: {
      academicSemester: true,
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};

export const StudentService = {
  createStudent,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
};
