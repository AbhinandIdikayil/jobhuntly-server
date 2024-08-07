import { CompanyEntity } from "../../../../domain/entities";
import { companyModel } from "../model/companyModel";
import axios from 'axios'



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
                await axios.post(`${process.env.JOB_SERVICE_URL}/add-company`,company)
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