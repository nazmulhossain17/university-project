import express, { Request, Response } from 'express';
import cors from 'cors';
import userRouter from './app/modules/users/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserService } from './app/modules/users/user.service';
import ApiErrors from './errors/ApiErrors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up global error handler before routes
app.use(globalErrorHandler);

// Root route (optional)
app.get('/', async (req: Request, res: Response) => {
  Promise.reject(new Error('Unhandle Promise rejection'));
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

// Use the userRouter for user-related routes
app.use('/api/v1', userRouter);

export default app;
