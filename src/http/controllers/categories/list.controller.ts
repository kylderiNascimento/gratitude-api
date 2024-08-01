import { FastifyReply, FastifyRequest } from 'fastify';
import { factoryCategoryService } from '@/services/factories/factory-category-service';


export async function list(request: FastifyRequest, reply: FastifyReply) {
  try {
    const categoriesService = factoryCategoryService();
    
    const categories = await categoriesService.getAll();
    
    return reply.status(200).send(categories);

  } catch (err) {
    return reply.status(500).send(err);
  }
}