import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseValidation } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(OfferedCourseValidation.create),
  OfferedCourseController.insertIntoDB
);

router.get('/', OfferedCourseController.getAllFromDB);

export const offeredCourseRoutes = router;
