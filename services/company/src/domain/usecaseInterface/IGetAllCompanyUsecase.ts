import { CompanyEntity } from "../entities";


export interface IGetAllCompanyUsecasee {
    execute(): Promise<CompanyEntity[] | null>
}