import { CategoryEntity, SectorEntity } from "../../domain/entities";

export interface IRepositories {
    addCategory(data: CategoryEntity): Promise<CategoryEntity | null>
    listCategory(): Promise<CategoryEntity[] | null>
    deleteCategory(id: string): Promise<CategoryEntity | null>
    updateCategory(data: CategoryEntity): Promise<CategoryEntity | null>
    addSector(data: SectorEntity): Promise<SectorEntity | null>
    listSector(): Promise<SectorEntity[] | null>
}