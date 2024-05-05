import { AcademicDepartment } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createAcademicDepartment = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  const academicDepartment = await prisma.academicDepartment.create({ data });
  return academicDepartment;
};

const getAllFromDB = async () => {
  const result = await prisma.academicDepartment.findMany();
  return result;
};

const getDataById = async (id: string): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<AcademicDepartment>
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.delete({
    where: {
      id,
    },
  });
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
};
