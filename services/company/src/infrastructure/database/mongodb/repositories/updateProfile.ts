import { CompanyEntity } from "../../../../domain/entities"
import { companyModel } from "../model/companyModel"


export const updateProfile = async (data: CompanyEntity, email: string): Promise<CompanyEntity | null> => {
    try {
        if (data) {
            let company = await companyModel.findOneAndUpdate(
                {
                    email
                },
                {
                    $set:data
                },
                {
                    new: true
                }
            )
            if(company) {
                return company as unknown as CompanyEntity
            } else {
                throw new Error('error while updating')
            }
        } else {
            throw new Error('provide the datas')
        }
    } catch (error: any | Error) {
        throw new Error(error)
    }
}