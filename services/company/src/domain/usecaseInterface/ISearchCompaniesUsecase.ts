import { CompanyEntity } from "../entities";

export interface ISearchCompaniesUsecase {
    execute(value: string): Promise<CompanyEntity[] | null>
}