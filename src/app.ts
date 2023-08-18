import express, { Request, Response } from 'express';
import cors from 'cors';
import userRouter from './app/modules/users/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserService } from './app/modules/users/user.service';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Running');
});

app.use('/api/v1', userRouter);

app.get('/', async (req: Request, res: Response) => {
  await UserService.createUser({
    id: '999',
    password: '1234',
    role: 'student',
  });
  res.send('Hi');
});

export default app;
