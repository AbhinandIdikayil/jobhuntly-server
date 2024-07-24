import { CompanyEntity } from "../../../../domain/entities";
import { companyModel } from "../model/companyModel";



export const getCompany = async (email: string) : Promise<CompanyEntity | null> => {
    try {
        const company = await companyModel.findOne({email}).select('-password')
        console.log(company)
        if(company) {
            return company as unknown as CompanyEntity
        } else {
            throw new Error('cant get details')
        }
    } catch (error: any) {
        throw new Error(error)
    }
}