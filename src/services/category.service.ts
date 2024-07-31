import { CategoriesRepository } from '@/repositories/categories.repository';
import { CategoryAlreadyExistsError } from './error/categories/category-already-exists-error';

interface CreateCategoryRequest {
  description: string
  color: string
}

export class CategoryService {

    constructor(private categoriesRepository: CategoriesRepository) {}

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


}