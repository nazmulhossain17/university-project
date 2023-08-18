import express, { Request, Response } from 'express';
import cors from 'cors';
import userService from './app/modules/users/user.service';
import userRouter from './app/modules/users/user.route';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Running');
});

app.use('/api/v1', userRouter);

app.get('/', async (req: Request, res: Response) => {
  await userService.createUser({
    id: '999',
    password: '1234',
    role: 'student',
  });
  res.send('Hi');
});

export default app;
