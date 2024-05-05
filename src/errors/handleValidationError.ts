import { IGenericErrorResponse } from '../interfaces/common';

import { Prisma } from '@prisma/client';

const handleValidationError = (
  error: Prisma.PrismaClientValidationError
): IGenericErrorResponse => {
  const errors = [
    {
      path: '',
      message: error.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
