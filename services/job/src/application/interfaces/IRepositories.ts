import { CategoryEntity } from "../../domain/entities";

export interface IRepositories {
    addCategory(data:CategoryEntity): Promise<CategoryEntity | null>
    listCategory(): Promise<CategoryEntity[] | null>
}