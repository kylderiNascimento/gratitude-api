import { FastifyInstance } from 'fastify';
import { register } from './controllers/user.controller';
import { list as listCategories } from './controllers/categories/list.controller';
import { create as createCategory } from './controllers/categories/create.controller';
import { update as updateCategory } from './controllers/categories/update.controller';
import { deleteCategory } from './controllers/categories/delete.controller';
import { login } from './controllers/auth.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);

  app.post('/login', login);
  
  app.get('/categories', listCategories);
  app.post('/category', createCategory);
  app.put('/category/:id', updateCategory);
  app.delete('/category/:id', deleteCategory);

}