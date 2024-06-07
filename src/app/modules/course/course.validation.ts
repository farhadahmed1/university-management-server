import { z } from 'zod';

const createPreRequisiteCoursesSchema = z.object({
  course: z.string(), // assuming course is stored as an ObjectId string
  isDeleted: z.boolean().optional(),
});

// Define the Zod schema for course
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().trim(),
    prefix: z.string().trim(),
    code: z.number().int(),
    credits: z.number().int(),
    preRequisiteCourses: z.array(createPreRequisiteCoursesSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updatePreRequisiteCoursesSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

// update the Zod schema for course
const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().optional(),
    prefix: z.string().trim().optional(),
    code: z.number().int().optional(),
    credits: z.number().int().optional(),
    preRequisiteCourses: z.array(updatePreRequisiteCoursesSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});
//const updateCourseValidationSchema = createCourseValidationSchema.partial();
export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
