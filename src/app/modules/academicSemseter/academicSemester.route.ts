import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validator';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// will call controller function
router.post(
  '/create-academic-student',
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);
// router.get('/', StudentController.getAllStudents);
// router.get('/:studentId', StudentController.getSingleStudent);
// router.delete('/:studentId', StudentController.deleteStudent);
// router.patch('/:studentId', StudentController.updateSingleStudent);

export const AcademicSemesterRoutes = router;
