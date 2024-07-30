import { CategoryEntity, CompanyEntity, JobEntity, SectorEntity, UserEntity } from "../../domain/entities";

export interface IRepositories {
    addCategory(data: CategoryEntity): Promise<CategoryEntity | null>
    listCategory(): Promise<CategoryEntity[] | null>
    deleteCategory(id: string): Promise<CategoryEntity | null>
    updateCategory(data: CategoryEntity): Promise<CategoryEntity | null>
    addSector(data: SectorEntity): Promise<SectorEntity | null>
    listSector(): Promise<SectorEntity[] | null>
    postJob(data:JobEntity): Promise<JobEntity | null>
    addCompany(data:CompanyEntity): Promise<CompanyEntity | null>
    addUser(data:UserEntity): Promise<UserEntity | null>
}