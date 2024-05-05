import { Room } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Room): Promise<Room> => {
  const result = await prisma.room.create({
    data,
    include: { building: true },
  });
  return result;
};

const getAllFromDB = async () => {
  const result = await prisma.room.findMany();
  return result;
};

const getDataById = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const RoomService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
};
