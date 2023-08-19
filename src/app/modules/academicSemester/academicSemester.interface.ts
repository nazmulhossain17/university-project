import { Model } from 'mongoose';

export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemester = {
  title: 'Autumn' | 'Summer' | 'Fall';
  year: number;
  code: '01' | '02' | '03';
  startMonth: Month;
  endMonth: Month;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
