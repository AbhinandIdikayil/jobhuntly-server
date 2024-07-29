import { CompanyEntity } from "../entities";


export interface IAddCompanyUsecase {
    execute(data:CompanyEntity): Promise<CompanyEntity | null>
}