import { prisma } from '@/database/prisma-client';
import { Prisma } from '@prisma/client';

export class PrismaUsersRepository {


    async findById(id: string) {
        const user = await prisma.user.findUnique({
          where: {
            id,
          },
        })

        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        })
    
        return user;
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        });

        return user;
    }
}