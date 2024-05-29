import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validator';

const router = express.Router();

// will call controller function
router.post(
  '/create-academic-department',
  validateRequest(AcademicDepartmentValidation.createdAcademicDepartmentSchema),
  AcademicDepartmentController.createAcademicDepartment,
);
router.get('/', AcademicDepartmentController.getAllAcademicDepartments);
router.get(
  '/:departmentId',
  AcademicDepartmentController.getSingleAcademicDepartment,
);
router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updatedAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
