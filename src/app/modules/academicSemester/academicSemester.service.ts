import ApiError from '../../../errors/ApiErrors';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(400, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesters = (paginationOptions: IPaginationOptions) => {};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
