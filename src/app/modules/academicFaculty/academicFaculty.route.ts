import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

// will call controller function
router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createdAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);
router.get('/', AcademicFacultyController.getAllAcademicFaculties);
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updatedAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateSingleAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
