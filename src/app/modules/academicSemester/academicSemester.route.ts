import express from 'express';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';

const urlpath = express.Router();

urlpath.post(
  '/create-semester', // Change the route path to differentiate from the user creation route
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester,
);

// urlpath.get('/hello', (req, res) => {
//   res.send('nice');
// });

urlpath.get('/:id', AcademicSemesterController.getSingleSemester);

urlpath.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = urlpath;
