import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(FacultyValidation.create),
  FacultyController.createFaculty
);

router.get('/', FacultyController.getAllFromDB);
router.get('/:id', FacultyController.getDataById);
router.patch(
  '/update/:id',
  validateRequest(FacultyValidation.update),
  FacultyController.updateIntoDB
);

router.delete('/delete/:id', FacultyController.deleteFromDB);

router.post(
  '/:id/assign-courses',
  validateRequest(FacultyValidation.assignOrRemoveCourses),
  FacultyController.assignCourses
);
router.delete(
  '/:id/remove-courses',
  validateRequest(FacultyValidation.assignOrRemoveCourses),
  FacultyController.removeCourses
);

export const FacultyRoutes = router;
