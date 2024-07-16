import { CompanyEntity } from "../entities";


export interface IGetCompanyUsecase {
    execute(email: string): Promise<CompanyEntity | null>
}