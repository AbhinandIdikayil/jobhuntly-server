import { CompanyEntity } from "../../domain/entities";



export interface IRepositories {
    createCompany(data:CompanyEntity): Promise<CompanyEntity | null>
}