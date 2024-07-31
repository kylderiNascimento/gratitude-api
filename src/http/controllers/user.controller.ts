import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { RegisterService } from '@/services/user.service';
import { PrismaUsersRepository } from '@/repositories/prisma-orm/prisma.user.repository';
import { UserAlreadyExistsError } from '@/services/error/users/user-already-exists-error';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {

    const usersRepository = new PrismaUsersRepository();
    // Inversion Dependency 
    const registerService = new RegisterService(usersRepository);

    await registerService.execute({
      name,
      email,
      password,
    });

  } catch (err) {
     if (err instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: err.message });
     }

     return reply.status(500).send(err);
  }

  return reply.status(201).send();
}