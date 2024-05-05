import { SemesterRegistrationStatus } from '@prisma/client';
import { z } from 'zod';

const create = z.object({
  body: z.object({
    startDate: z.string({
      required_error: 'startDate is required',
    }),
    endDate: z.string({
      required_error: 'endDate is required',
    }),
    academicSemesterId: z.string({
      required_error: 'academicSemesterId is required',
    }),
    minCredit: z.number({
      required_error: 'minCredit is required',
    }),
    maxCredit: z.number({
      required_error: 'maxCredit is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    academicSemesterId: z.string().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
    status: z
      .enum(
        [...Object.values(SemesterRegistrationStatus)] as [string, ...string[]],
        {}
      )
      .optional(),
  }),
});

export const SemesterRegistrationValidation = {
  create,
  update,
};
