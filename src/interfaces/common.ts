import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number | string;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
