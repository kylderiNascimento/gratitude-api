import { prisma } from '@/database/prisma-client';
import { UsersRepository } from '@/repositories/prisma_orm/user.repository';
import { hash } from 'bcryptjs';

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const prismaUsersRepository = new UsersRepository()

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  })


}