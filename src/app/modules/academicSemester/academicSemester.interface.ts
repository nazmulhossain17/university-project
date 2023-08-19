import { Model } from 'mongoose';

type IAcademicSemester = {
  title: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
};

type AcademicSemesterModel = Model<IAcademicSemester>;
