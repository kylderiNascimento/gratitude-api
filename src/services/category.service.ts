import { CategoriesRepository } from '@/repositories/categories.repository';
import { CategoryAlreadyExistsError } from './error/categories/category-already-exists-error';
import { CategoryNotFoundError } from './error/categories/category-not-found-error';

interface CreateCategoryRequest {
  description: string
  color: string
}

interface UpdateCategoryRequest {
  id: string;
  description: string;
  color?: string;
}

export class CategoryService {

    constructor(private categoriesRepository: CategoriesRepository) {}

    async getAll() {
        return await this.categoriesRepository.getAll();
    }

    async create({ description, color }: CreateCategoryRequest) {

        const categoryWithSameId = await this.categoriesRepository.findByDescription(description);

        if (categoryWithSameId) {
            throw new CategoryAlreadyExistsError();
        }

        const category = await this.categoriesRepository.create({
            description,
            color,
        });

        return category;
    }

    async update({ id, description, color }: UpdateCategoryRequest) {
        const categoryWithSameId = await this.categoriesRepository.findByDescription(description);

        if (!categoryWithSameId) {
            throw new CategoryNotFoundError();
        }

        if (categoryWithSameId && categoryWithSameId.id !== id) {
            throw new CategoryAlreadyExistsError();
        }

        const category = await this.categoriesRepository.update(id, { description, color });

        return category;
    }

    async delete(id: string): Promise<void> {
        const category = await this.categoriesRepository.findById(id);
        if (!category) {
          throw new CategoryNotFoundError();
        }
    
        await this.categoriesRepository.delete(id);
    }

}