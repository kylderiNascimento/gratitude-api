import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AuthInvalidCredentialsError } from '@/services/error/auth/auth-invalid-credentials-error';
import { factoryAuthService } from '@/services/factories/factory-auth-service';

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = loginBodySchema.parse(request.body);

  try {
    const authService = factoryAuthService();

    await authService.execute({ email, password });

  } catch (err) {
    if (err instanceof AuthInvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send();
}