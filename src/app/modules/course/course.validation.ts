import { z } from 'zod';

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    code: z.string().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z.array(
      z
        .object({
          courseId: z.string().optional(),
        })
        .optional()
    ),
  }),
});

const assignOrRemoveFaculties = z.object({
  body: z.object({
    courses: z.array(z.string(), {
      required_error: 'faculties is required',
    }),
  }),
});

export const courseValidation = {
  update,
  assignOrRemoveFaculties,
};
