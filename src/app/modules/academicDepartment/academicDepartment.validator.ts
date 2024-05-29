import { z } from 'zod';

const createdAcademicDepartmentSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be  string',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty must be  string',
      required_error: 'Faculty must be required',
    }),
  }),
});
const updatedAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be  string',
    }),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Faculty must be  string',
        required_error: 'Faculty must be required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createdAcademicDepartmentSchema,
  updatedAcademicDepartmentValidationSchema,
};
