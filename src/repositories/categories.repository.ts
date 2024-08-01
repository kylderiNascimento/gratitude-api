import { Prisma, Category } from '@prisma/client';

export interface CategoriesRepository {
  getAll(): Promise<Category | null>
  findById(id: string): Promise<Category | null>
  findByDescription(description: string): Promise<Category | null>
  create(data: Prisma.CategoryCreateInput): Promise<Category>
  update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category>
  delete(id: string): Promise<void>
}