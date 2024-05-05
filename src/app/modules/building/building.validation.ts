import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const BuildingValidation = {
  create,
  update,
};
