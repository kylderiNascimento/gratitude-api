import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { factoryCategoryService } from '@/services/factories/factory-category-service';
import { CategoryAlreadyExistsError } from '@/services/error/categories/category-already-exists-error';


export async function list(request: FastifyRequest, reply: FastifyReply) {
  try {
    const categoriesService = factoryCategoryService();
    
    const categories = await categoriesService.getAll();
    
    return reply.status(200).send(categories);
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    return reply.status(500).send({ message: 'Failed to fetch categories' }); // Retorna erro 500 em caso de falha
  }
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    description: z.string(),
    color: z.string()
  });

  const { description, color } = createBodySchema.parse(request.body);

  try {
    const createService = factoryCategoryService();

    await createService.create({
      description,
      color,
    });

  } catch (err) {
     if (err instanceof CategoryAlreadyExistsError) {
        return reply.status(409).send({ message: err.message });
     }

     return reply.status(500).send(err);
  }

  return reply.status(201).send();
}

