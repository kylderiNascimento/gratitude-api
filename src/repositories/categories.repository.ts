import { Prisma, Category } from '@prisma/client';

export interface CategoriesRepository {
  findById(id: string): Promise<Category | null>
  findByDescription(description: string): Promise<Category | null>
  create(data: Prisma.CategoryCreateInput): Promise<Category>
}