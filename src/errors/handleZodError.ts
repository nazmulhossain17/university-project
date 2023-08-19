import { ZodError } from 'zod';

const handleZodError = (error: ZodError) => {
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: error,
  };
};

export default handleZodError;
