import { CompanyEntity } from "../../../../domain/entities";
import { companyModel } from "../model/companyModel";


export const getAllCompany = async (): Promise<CompanyEntity[] | null> => {
    try {
        const companies = await companyModel.find()
        if(companies.length > 0){
            return companies as CompanyEntity[]
        } else {
            return []
        }
    } catch (error: Error | any) {
        throw new Error(error)
    }
}