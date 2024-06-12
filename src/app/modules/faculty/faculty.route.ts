import express from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

// will call controller function

router.get('/', auth(), FacultyController.getAllFaculties);
router.get('/:facultyId', FacultyController.getSingleFaculties);
router.delete('/:facultyId', FacultyController.deleteFaculties);
router.patch(
  '/:facultyId',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculties,
);

export const FacultyRoutes = router;
