import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(StudentValidation.create),
  StudentController.createStudent
);
router.get('/', StudentController.getAllFromDB);
router.get('/:id', StudentController.getDataById);
router.patch(
  '/update/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(StudentValidation.update),
  StudentController.updateIntoDB
);

router.delete('/delete/:id', StudentController.deleteFromDB);

export const Student = router;
