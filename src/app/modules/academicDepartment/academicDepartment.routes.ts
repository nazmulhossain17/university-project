import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(AcademicDepartmentValidation.create),
  AcademicDepartmentController.createAcademicDepartment
);
router.get('/', AcademicDepartmentController.getAllFromDB);
router.get('/:id', AcademicDepartmentController.getDataById);
router.patch(
  '/update/:id',
  validateRequest(AcademicDepartmentValidation.update),
  AcademicDepartmentController.updateIntoDB
);
router.delete('/delete/:id', AcademicDepartmentController.deleteFromDB);

export const AcademicDepartmentRoutes = router;
