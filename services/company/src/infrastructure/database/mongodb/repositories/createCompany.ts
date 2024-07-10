import { CompanyEntity } from "../../../../domain/entities";
import { companyModel } from "../model/companyModel";



export const createCompany = async (data:CompanyEntity): Promise<CompanyEntity | null> => {
    try {
        const company = await companyModel.create(data)
        if(company) {
            return company as unknown as CompanyEntity
        } else {
            throw new Error('error while creating company')
        }
    } catch (error: any | Error) {
        throw new Error(error)
    }
}