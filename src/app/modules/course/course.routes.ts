import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { courseValidation } from './course.validation';

const router = express.Router();

router.post('/', CourseController.insertIntoDB);
router.get('/', CourseController.getAllFromDB);
router.get('/:id', CourseController.getDataById);
router.patch(
  '/update/:id',
  validateRequest(courseValidation.update),
  CourseController.updateIntoDB
);
router.delete('/delete/:id', CourseController.deleteFromDB);

router.post(
  '/:id/assign-faculites',
  validateRequest(courseValidation.assignOrRemoveFaculties),
  CourseController.assignFaculties
);
router.delete(
  '/:id/remove-faculites',
  validateRequest(courseValidation.assignOrRemoveFaculties),
  CourseController.removeFaculties
);

export const CourseRoutes = router;
