import { Model } from 'mongoose';

export type IAcademicSemester = {
  title: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
