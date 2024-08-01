import { prisma } from '@/database/prisma-client';
import { Prisma } from '@prisma/client';

export class PrismaCategoriesRepository {

    async getAll() {
        const categories = await prisma.category.findMany();
        return categories;
    }

    async findById(id: string) {
        const category = await prisma.category.findUnique({
          where: {
            id,
          },
        })

        return category;
    }

    async findByDescription(description: string) {
      const category = await prisma.category.findUnique({
        where: {
          description,
        },
      })

      return category;
    }

    async create(data: Prisma.CategoryCreateInput) {
        const category = await prisma.category.create({
            data,
        });

        return category;
    }

    async update(id: string, data: Prisma.CategoryUpdateInput) {
      const category = await prisma.category.update({
          where: { id },
          data,
      });

      return category;
    }

    async delete(id: string): Promise<void> {
      await prisma.category.delete({
        where: {
          id,
        },
      });
    }


}