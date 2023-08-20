import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import userRouter from '../modules/users/user.route';

const router = express.Router();

router.use('/users', userRouter);
router.use('/academic-semester', AcademicSemesterRoutes);

export default router;
