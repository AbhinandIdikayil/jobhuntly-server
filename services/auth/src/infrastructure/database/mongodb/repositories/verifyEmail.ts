import { Email } from "../../../../domain/entities"
import { authModel } from "../models/authModel"
import { OtpModel } from "../models/otpModel"


export const verifyEmail = async (email: string , otp: string) :Promise<Email | null> => {
    try {
        if(email && otp) {
            let existingUser = await authModel.findOne({email})
            if(existingUser) {
                let res = await OtpModel.create({
                    email,
                    otp,
                })
                let otpDoc = await OtpModel.findOne({email})
                if(otpDoc) {
                    otpDoc.extendExpiry(120)
                    await otpDoc.save()
                }
                if(res) {
                    console.log(otp,email)
                    return {email}
                } else {
                    throw new Error('error while creating otp')
                }
            } else {
                throw new Error('User dont exist')
            }
        } else {
            return null
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}