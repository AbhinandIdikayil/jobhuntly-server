import { CategoryEntity } from "../entities";


export interface IListCategory {
    execute(): Promise<CategoryEntity[] | null>
}