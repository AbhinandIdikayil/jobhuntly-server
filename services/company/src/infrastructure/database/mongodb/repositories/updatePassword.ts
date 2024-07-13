import { companyModel } from "../model/companyModel"



export const updatePassword = async (email: string , newPassword: string): Promise<boolean> => {
    try {
        if(email && newPassword) {
            let company = await companyModel.findOne({email})
            if(company) {
                company.password = newPassword
                await company.save()
                return true
            } else {
                return false
            }
        } else {
            throw new Error('please provide email and password')
        }
    } catch (error: any | Error) {
        throw new Error(error)
    }
}