import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { factoryCategoryService } from '@/services/factories/factory-category-service';
import { CategoryAlreadyExistsError } from '@/services/error/categories/category-already-exists-error';

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateParamsSchema = z.object({
    id: z.string(),
  });

  const updateBodySchema = z.object({
    description: z.string(),
    color: z.string().optional(),
  });

  const { id } = updateParamsSchema.parse(request.params);
  const { description, color } = updateBodySchema.parse(request.body);

  try {
    const categoryService = factoryCategoryService();

    const updatedCategory = await categoryService.update({ id, description, color });

    return reply.status(200).send(updatedCategory);
  } catch (err) {
    if (err instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    return reply.status(500).send(err);
  }
}