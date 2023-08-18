import User from './user.model';
import { IUser } from './user.interface';
import config from '../../../config/index';
import { generateUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId();

  user.id = id;

  if (!user.password) {
    user.password = config.stuPass as string;
  }

  const createdUser = await User.create(user);
  if (!createUser) {
    throw new Error('Failed to create user!');
  }
  return createdUser;
};

export default {
  createUser,
};
