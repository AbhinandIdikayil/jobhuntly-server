import { UserEntity } from "../../../../domain/entities"
import { generateOTP } from "../../../../utils/common/generateOtp"
import { authModel } from "../models/authModel"
import { OtpModel } from "../models/otpModel"


interface signupResponse {
    email: string,
    name: string,
    password: string,
    otp: string,
}


export const signup = async (data: UserEntity): Promise<signupResponse | null> => {
    try {
        const { email, password, name } = data
        let existingUser = await authModel.findOne({ email })
        if (existingUser) {
            throw new Error('user already exist')
        }
        const otp = generateOTP()
        console.log('OTP IS -----',otp)
        const res = {
            email,
            password,
            name,
            otp
        }
        const otpDB = await OtpModel.create({
            email: res.email,
            otp: res.otp
        })
        if (res && otpDB) {
            return res as signupResponse
        } else {
            throw new Error('signup failed')
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}