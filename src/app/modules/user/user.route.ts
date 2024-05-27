import express from 'express';
import { UserController } from './user.controller';

import { studentValidations } from '../student/student.validator';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// will call controller function
router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
