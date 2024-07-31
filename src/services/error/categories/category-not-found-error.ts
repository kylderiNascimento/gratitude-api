export class CategoryNotFoundError extends Error {
    constructor() {
      super('Category does not exist.')
    }
}