import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { factoryCategoryService } from '@/services/factories/factory-category-service';
import { CategoryNotFoundError } from '@/services/error/categories/category-not-found-error';


export async function deleteCategory(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string(),
    });
  
    const { id } = paramsSchema.parse(request.params);
  
    try {
      const categoryService = factoryCategoryService();
  
      await categoryService.delete(id);
  
      return reply.status(204).send(); // No content
    } catch (err) {
        if (err instanceof CategoryNotFoundError) {
        return reply.status(404).send({ message: err.message });
      }
  
      return reply.status(500).send(err);
    }
}