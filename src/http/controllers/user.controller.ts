import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UserAlreadyExistsError } from '@/services/error/users/user-already-exists-error';
import { factoryUserRegisterService } from '@/services/factories/factory-user-service';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerService = factoryUserRegisterService();

    await registerService.create({
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