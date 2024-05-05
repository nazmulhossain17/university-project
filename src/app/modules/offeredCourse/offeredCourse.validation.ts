import { z } from 'zod';

const create = z.object({
  body: z.object({
    academicDepartmentId: z.string({
      required_error: 'academicDepartmentId is required',
    }),
    semesterRegistrationId: z.string({
      required_error: 'semesterRegistrationId is required',
    }),
    courseIds: z.array(
      z.string({
        required_error: 'courseIds is required',
      }),
      {
        required_error: 'Course ids are required',
      }
    ),
  }),
});

export const OfferedCourseValidation = {
  create,
};
