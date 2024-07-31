import { FastifyInstance } from 'fastify';
import { register } from './controllers/user.controller';
import { login } from './controllers/auth.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/login', login);
}