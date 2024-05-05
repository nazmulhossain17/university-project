import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RoomController } from './room.controller';
import { RoomValidation } from './room.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(RoomValidation.create),
  RoomController.insertIntoDB
);

router.get('/:id', RoomController.getDataById);
router.get('/', RoomController.getAllFromDB);

export const roomRoutes = router;
