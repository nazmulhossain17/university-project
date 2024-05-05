import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(AcademicFacultyValidation.create),
  AcademicFacultyController.insertIntoDB
);
router.get('/', AcademicFacultyController.getAllFromDB);
router.get('/:id', AcademicFacultyController.getDataById);

router.patch(
  '/update/:id',
  validateRequest(AcademicFacultyValidation.update),
  AcademicFacultyController.updateIntoDB
);
router.delete('/delete/:id', AcademicFacultyController.deleteFromDB);

export const AcademicFacultyRoutes = router;
