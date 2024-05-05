import express from 'express';
import { OfferedCourseSectionController } from './offeredCourseSection.controller';

const router = express.Router();

router.post('/', OfferedCourseSectionController.insertIntoDB);
router.get('/', OfferedCourseSectionController.getAllFromDB);
router.get('/:id', OfferedCourseSectionController.getDataById);

export const offeredCourseSectionRoutes = router;
