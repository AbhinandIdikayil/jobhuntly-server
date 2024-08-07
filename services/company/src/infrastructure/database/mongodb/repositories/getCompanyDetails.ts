import { companyModel } from "../model/companyModel"
import { CompanyEntity } from "../../../../domain/entities"

export const getCompanyDetails = async (id: string): Promise<CompanyEntity | null> => {
    try {
        console.log(id);
        
        const company = await companyModel.findById({_id:id})
        if(company){
            return company as CompanyEntity
        } else {
            return null
        }
    } catch (error: any | Error) {
        throw new Error(error)   
    }
}