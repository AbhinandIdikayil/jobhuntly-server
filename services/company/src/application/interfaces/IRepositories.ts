import { CompanyEntity } from "../../domain/entities";



export interface IRepositories {
    createCompany(data:CompanyEntity): Promise<CompanyEntity | null>
    getCompany(email:string):Promise<CompanyEntity | null>
    updateProfile(data:CompanyEntity,email: string): Promise<CompanyEntity | null>
    updateSocialLinks(data:CompanyEntity,email: string): Promise<CompanyEntity | null>
    sendRequest(id: string , email: string): Promise<boolean | null>
    updateRequest(id: string,status: string): Promise<{email: string,status: string }| null>
    listRequest(): Promise<CompanyEntity | null>
    getAllCompany(): Promise<CompanyEntity[] | null>
}