import { companyModel } from "../model/companyModel"
import { CompanyEntity } from "../../../../domain/entities"

export const getCompanyDetails = async (id: string): Promise<CompanyEntity | null> => {
    try {
        const company = await companyModel.findById(id)
        if(company){
            return company as CompanyEntity
        } else {
            return null
        }
    } catch (error: any | Error) {
        throw new Error(error)   
    }
}