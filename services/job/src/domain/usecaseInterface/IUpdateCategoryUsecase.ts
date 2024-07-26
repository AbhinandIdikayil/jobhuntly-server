import { CategoryEntity } from "../entities";



export interface IUpdateCategoryUsecase {
    execute:(data:CategoryEntity) => Promise<CategoryEntity | null>
}