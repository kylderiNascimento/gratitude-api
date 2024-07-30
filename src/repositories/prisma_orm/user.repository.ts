import { prisma } from '@/database/prisma-client';
import { Prisma } from '@prisma/client';

export class UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user;
  }
}