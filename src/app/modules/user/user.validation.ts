import { z } from 'zod';
import { UserStatus } from './user.constant';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'password must be  string',
    })
    .max(20, { message: ' Password can not be more than 20 characters' })
    .optional(),

  isDeleted: z.boolean().optional().default(false),
});
const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
export const userValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
