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
router.get('/', AcademicSemesterController.getAllAcademicSemester);
router.get(
  '/:semesterId',
  AcademicSemesterController.getSingleAcademicSemester,
);
router.patch(
  '/:semesterId',
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
