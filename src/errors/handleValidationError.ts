import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el.path,
        message: el.message,
      };
    },
  );

  const statusCode = 400;
  const message = 'Validation Error';
  const errorResponse: IGenericErrorResponse = {
    statusCode,
    message,
    errorMessages: errors,
  };

  return errorResponse;
};

export default handleValidationError;
