import { CategoryEntity } from "../entities";



export interface IAddCategoryUsecase {
    execute(data:CategoryEntity): Promise<CategoryEntity | null>
}