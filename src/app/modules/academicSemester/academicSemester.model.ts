import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';
import ApiError from '../../../errors/ApiErrors';
import status from 'http-status-codes';

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
  },
);

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester', // Use a unique name here
  AcademicSemesterSchema,
);

export default AcademicSemester;

// handeling same year and same semester
AcademicSemesterSchema.pre('save', async function (next) {
  const isExists = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExists) {
    throw new ApiError(status.CONFLICT, 'Academic Semester is already exists!');
  }
  next();
});
