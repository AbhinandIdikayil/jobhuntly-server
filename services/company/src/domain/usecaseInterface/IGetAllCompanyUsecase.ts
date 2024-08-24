import { CompanyEntity, filterPagination } from "../entities";


export interface IGetAllCompanyUsecasee {
    execute(option?:filterPagination): Promise<CompanyEntity[] | null>
}