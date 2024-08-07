import { CompanyEntity } from "../../../../domain/entities"
import { companyModel } from "../model/companyModel"


export const addCompany = async (data: CompanyEntity): Promise<CompanyEntity | null> => {
    try {
        let company = await companyModel.findOne({ email: data?.email })
        let res;
        if (company) {
            res = await companyModel.findOneAndUpdate(
                { email: data?.email },
                {
                    $set: { ...data }
                },
                { new: true }
            )
            return res ? res as CompanyEntity : null
        } else {
            res = await companyModel.create(data)
            return res as CompanyEntity
        }
    } catch (error: Error | any) {
        throw new Error(error?.message)
    }
}