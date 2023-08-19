import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
    },
    endMonth: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'User',
  AcademicSemesterSchema,
);
export default AcademicSemester;
