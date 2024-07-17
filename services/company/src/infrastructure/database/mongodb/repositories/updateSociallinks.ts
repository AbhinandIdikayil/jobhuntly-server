import { CompanyEntity } from "../../../../domain/entities";
import { companyModel } from "../model/companyModel";




export const updateSocialLinks = async (data: CompanyEntity, email: string): Promise<CompanyEntity | null> => {
    try {
        if (data && email) {
            let company = await companyModel.findOneAndUpdate(
                { email },
                {
                    $set: {
                        ...data,
                        profileCompletionStatus:'1%'
                    }
                },
                { new: true }
            )
            if (company) {
                return company as unknown as CompanyEntity
            } else {
                throw new Error('Error while updating')
            }
        } else {
            throw new Error('provice email and data')
        }
    } catch (error: any | Error) {
        throw new Error(error)
    }
}