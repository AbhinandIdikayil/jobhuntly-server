import { CompanyEntity } from "../entities";


export interface IGetCompanyDetails {
    execute(id: string): Promise<CompanyEntity | null>
}