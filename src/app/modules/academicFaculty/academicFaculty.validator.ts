import { z } from 'zod';

const createdAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be  string',
    }),
  }),
});
const updatedAcademicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic Faculty must be  string',
  }),
});

export const AcademicFacultyValidation = {
  createdAcademicFacultyValidationSchema,
  updatedAcademicFacultyValidationSchema,
};
