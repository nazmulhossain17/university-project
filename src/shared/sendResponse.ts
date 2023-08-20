import { Response } from 'express';

type IAPIResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
};
const sendResponse = (res: Response, data: IAPIResponse<T>): void => {
  const responseData: IAPIResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  };
  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
