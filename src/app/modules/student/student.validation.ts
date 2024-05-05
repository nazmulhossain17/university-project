import { z } from 'zod';

const create = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'studentId is required',
    }),
    firstName: z.string({
      required_error: 'firstName is required',
    }),
    lastName: z.string({
      required_error: 'lastName is required',
    }),
    middleName: z.string({
      required_error: 'middleName is required',
    }),
    profileImage: z.string({
      required_error: 'profileImage is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    contactNo: z.string({
      required_error: 'contactNo is required',
    }),
    gender: z.string({
      required_error: 'gender is required',
    }),
    bloodGroup: z.string({
      required_error: 'bloodGroup is required',
    }),
    academicSemesterId: z.string({
      required_error: 'academicSemesterId is required',
    }),
    academicDepartmentId: z.string({
      required_error: 'academicDepartmentId is required',
    }),
    academicFacultyId: z.string({
      required_error: 'academicFacultyId is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    studentId: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    middleName: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    academicSemesterId: z.string().optional(),
    academicDepartmentId: z.string().optional(),
    academicFacultyId: z.string().optional(),
  }),
});

export const StudentValidation = {
  create,
  update,
};
