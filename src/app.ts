import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserService } from './app/modules/users/user.service';
import userRouter from './app/routes/index';
import httpStatus from 'http-status-codes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up global error handler before routes
app.use(globalErrorHandler);

// handle not found
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: 'Not Found',
//     errorMessages: [
//       {
//         path: req.originalUrl,
//         message: 'Api not found',
//       },
//     ],
//   });
//   next();
// });

app.use('/api/v1/', userRouter);

// Root route (optional)
app.get('/', async (req: Request, res: Response) => {
  res.send('Hi');
});

// User creation route
app.post('/create-user', async (req: Request, res: Response) => {
  try {
    await UserService.createUser({
      id: '999',
      password: '1234',
      role: 'student',
    });

    res.json({
      success: true,
      message: 'User created successfully',
    });
  } catch (error) {
    // Handle error or let globalErrorHandler handle it
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error.message,
    });
  }
});

export default app;
