import { PrismaCategoriesRepository } from "@/repositories/prisma-orm/prisma.categories.repository";
import { CategoryService } from "../category.service";


export function factoryCategoryService(){
    const categoriesRepository = new PrismaCategoriesRepository();
    const categoryCreateService = new CategoryService(categoriesRepository);

    return categoryCreateService;
}