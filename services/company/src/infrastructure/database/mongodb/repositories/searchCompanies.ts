import { CompanyEntity } from "../../../../domain/entities"
import { companyModel } from "../model/companyModel"

export const searchCompanies = async (value: string): Promise<CompanyEntity[] | null> => {
    try {
        const companies = await companyModel.find({
            $or: [{ name: { $regex: value, $options: 'i' } }, {email:value}]
        }).select('-password -locations -techStack')
        if(companies.length > 0) {
            return companies as CompanyEntity[]
        } else {
            return []
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}