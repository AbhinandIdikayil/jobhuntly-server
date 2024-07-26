import { CategoryEntity } from "../entities";

export interface IDeleteCategoryUsecase {
    execute(id: string): Promise<CategoryEntity | null>
}