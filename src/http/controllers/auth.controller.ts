import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaUsersRepository } from '@/repositories/prisma-orm/prisma.user.repository';
import { AuthService } from '@/services/auth.service';

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = loginBodySchema.parse(request.body);

  try {

    const usersRepository = new PrismaUsersRepository();
    const authService = new AuthService(usersRepository);

    await authService.execute({
      email,
      password,
    });

  } catch (err) {
     return reply.status(400).send(err);
  }

  return reply.status(200).send();
}